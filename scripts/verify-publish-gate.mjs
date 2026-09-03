import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const SCRIPT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.resolve(process.env.ROUTEBUDGET_PUBLISH_GATE_ROOT || SCRIPT_ROOT);
const CONTENT = path.join(ROOT, 'content');
const PUBLISHING = path.join(CONTENT, 'publishing');
const REVIEWS = path.join(PUBLISHING, 'reviews');
const DOCS = path.join(ROOT, 'docs');
const DIST = path.join(ROOT, 'dist');
const SECTIONS = ['guide', 'calcolatori', 'confronti', 'landing'];
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const HASH_PATTERN = /^sha256:[a-f0-9]{64}$/;
const PINNED_BASELINE_REVIEW_ID = 'review:baseline-main-a952269';
const PINNED_BASELINE_COMMIT = 'a952269';
const PINNED_BASELINE_REVIEW_DIGEST = 'sha256:923ac8551fd5fb82c4db59d07e7b7acd042fe89f332f14efdbca072f225497ae';
const PINNED_RELEASE_INTEGRITY_ID = 'review:2026-09-03-release-integrity';
const PINNED_RELEASE_INTEGRITY_DIGEST = 'sha256:417cf6e7989fe71a14cb0f6c0d70745174d6b8334e13572ca455490c4efe303e';
const PINNED_APP_SOURCE_COMMIT = '3ea946e5c988aca4da3c778544a5dd6b8391b750';
const APP_ATTESTATION_FILE = 'app-source-3ea946e5.json';
const APP_ATTESTATION_ID = 'app-source:3ea946e5';
// This digest deliberately lives in executable policy. Editing the attestation
// alone cannot silently turn website copy into product evidence.
const PINNED_APP_ATTESTATION_DIGEST = 'sha256:dca725a9564711d70070b3aa8127109a8fe14ca358ed6ac1546adb6be80bf938';
const INTENT_BLOCK_THRESHOLD = 0.78;
const INTENT_WARN_THRESHOLD = 0.6;
const BODY_BLOCK_THRESHOLD = 0.24;
const LOW_AUTHORITY_HOSTS = new Set([
  'reddit.com',
  'www.reddit.com',
  'suggestqueries.google.com',
  'forumexcel.it',
  'www.forumexcel.it',
]);
const STOP_WORDS = new Set([
  'a', 'al', 'alla', 'alle', 'allo', 'con', 'da', 'dal', 'dalla', 'dalle', 'dei', 'del', 'della',
  'delle', 'di', 'e', 'i', 'il', 'in', 'la', 'le', 'lo', 'o', 'per', 'su', 'tra', 'un', 'una',
]);
const execFileAsync = promisify(execFile);

const config = await readJson(path.join(CONTENT, 'site.json'));
const sourceRegistry = await readJson(path.join(CONTENT, 'sources.json'));
const manifest = await readJson(path.join(PUBLISHING, 'publication-manifest.json'));
const productRegistry = await readJson(path.join(PUBLISHING, 'product-features.json'));
await validateJsonDocument(manifest, path.join(PUBLISHING, 'publication-manifest.schema.json'), 'publication manifest');
await validateJsonDocument(productRegistry, path.join(PUBLISHING, 'product-features.schema.json'), 'product feature registry');
const pages = await loadPublishedPages(manifest.locale);
const pageById = new Map(pages.map((page) => [page.contentId, page]));
const pageByReference = new Map(pages.map((page) => [`${page.locale}:${page.section}:${page.meta.slug}`, page]));
const reviews = await loadReviews();
const evidence = await loadDemandEvidence();
const keywordRows = parseCsv(await readFile(path.join(DOCS, 'SEO_KEYWORD_MAP_IT.csv'), 'utf8'));

validateManifest();
await validateProductRegistry();
validateKeywordMap();
validateUniqueness();

const baseline = reviews.get(manifest.baselineReviewId);
assert(baseline, `publication manifest: baseline review ${manifest.baselineReviewId} missing`);
assert.equal(manifest.baselineReviewId, PINNED_BASELINE_REVIEW_ID, 'publication manifest: baseline review is not the pinned migration snapshot');
assert.equal(baseline.type, 'migration-baseline', 'baseline review must use migration-baseline type');
assert.equal(baseline.decision, 'baseline-snapshot', 'baseline review must be an integrity snapshot');
assert.equal(baseline.reviewMode, 'integrity-snapshot', 'baseline review must not claim an editorial review');
assert.equal(baseline.sourceCommit, PINNED_BASELINE_COMMIT, 'baseline review sourceCommit is not the pinned commit');
assert.equal(
  fingerprintText(await readFile(path.join(REVIEWS, 'baseline-main-a952269.json'), 'utf8')),
  PINNED_BASELINE_REVIEW_DIGEST,
  'baseline review changed without executable policy approval',
);
assert(baseline.pages && typeof baseline.pages === 'object', 'baseline review pages missing');
const baselinePageData = await loadPublishedPagesFromGit(PINNED_BASELINE_COMMIT, manifest.locale);
const verifiedBaselineFingerprints = Object.fromEntries(
  [...baselinePageData.entries()].map(([contentId, page]) => [contentId, fingerprintPage(page.rawMeta, page.body)]),
);
assert.deepEqual(
  baseline.pages,
  verifiedBaselineFingerprints,
  `baseline review does not exactly match published content at git commit ${PINNED_BASELINE_COMMIT}`,
);
assert(baseline.artifacts && typeof baseline.artifacts === 'object', 'baseline review artifact fingerprints missing');
assert.deepEqual(
  Object.keys(baseline.artifacts).sort(),
  Object.keys(baseline.pages).sort(),
  'baseline artifact inventory must cover every baseline page exactly once',
);

const recordByPage = new Map();
const recordIntentOwners = new Map();
for (const record of manifest.records) {
  validateRecordShape(record);
  assert(!recordByPage.has(record.contentId), `${record.contentId}: duplicate publication record`);
  assert(pageById.has(record.contentId), `${record.contentId}: publication record targets no published page`);
  const owner = normalizePhrase(record.intentOwner);
  assert(!recordIntentOwners.has(owner), `${record.contentId}: intentOwner duplicates ${recordIntentOwners.get(owner)}`);
  recordIntentOwners.set(owner, record.contentId);
  recordByPage.set(record.contentId, record);
}

const coverage = new Map();
let baselinePages = 0;
let approvedPages = 0;
for (const page of pages) {
  validateSources(page);
  const fingerprint = fingerprintPage(page.rawMeta, page.body);
  const artifactFingerprint = await fingerprintBuiltRoute(page.meta.canonical);
  if (baseline.pages[page.contentId] === fingerprint) {
    assert(!recordByPage.has(page.contentId), `${page.contentId}: unchanged baseline page must not carry a redundant publication record`);
    if (artifactFingerprint !== baseline.artifacts[page.contentId]) {
      const integrityReview = reviews.get(manifest.releaseIntegrityApprovalId);
      assert.equal(
        integrityReview?.transitiveArtifacts?.[page.contentId],
        artifactFingerprint,
        `${page.contentId}: transitive built artifact drift needs release-integrity approval`,
      );
      coverage.set(page.contentId, { mode: 'baseline-transitive', fingerprint, artifactFingerprint });
    } else {
      coverage.set(page.contentId, { mode: 'baseline', fingerprint, artifactFingerprint });
    }
    baselinePages += 1;
  } else {
    const record = recordByPage.get(page.contentId);
    assert(record, `${page.contentId}: new or changed published page needs a publication record`);
    const derivedScope = deriveChangeScope(page, baselinePageData.get(page.contentId));
    assert.equal(record.changeScope, derivedScope, `${page.contentId}: declared changeScope does not match the source diff`);
    const transitiveArtifact = validateApprovedPublication(page, fingerprint, artifactFingerprint, record);
    coverage.set(page.contentId, { mode: 'approved', fingerprint, artifactFingerprint, record, transitiveArtifact });
    approvedPages += 1;
  }
}

for (const contentId of recordByPage.keys()) {
  assert.equal(coverage.get(contentId)?.mode, 'approved', `${contentId}: publication record is stale or redundant`);
}

await validateRetirements();
await validateReleaseIntegrity();
await validateIndexableInventory();
await validateGeneratedParity();
validateInternalLinks();

console.log(
  `Publish gate passed: ${pages.length} Italian pages (${baselinePages} immutable baseline, ${approvedPages} individually approved), `
  + `${evidence.size} demand records, ${Object.keys(productRegistry.features).length} source-verified product features.`,
);

function validateManifest() {
  assert.equal(manifest.schemaVersion, 1, 'publication manifest schemaVersion mismatch');
  assert.equal(manifest.locale, 'it', 'publication manifest must target Italian content');
  assert.equal(manifest.market, 'IT', 'publication manifest must target the Italian market');
  assert(Array.isArray(manifest.records), 'publication manifest records must be an array');
  assert(Array.isArray(manifest.intentExceptions), 'publication manifest intentExceptions must be an array');
  assert(Array.isArray(manifest.retirements), 'publication manifest retirements must be an array');
  assert(manifest.staticArtifacts && typeof manifest.staticArtifacts === 'object', 'publication manifest staticArtifacts missing');
  assert(/^review:[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.releaseIntegrityApprovalId ?? ''), 'publication manifest releaseIntegrityApprovalId invalid');

  const exceptionKeys = new Set();
  for (const exception of manifest.intentExceptions) {
    assert(Array.isArray(exception.pages) && exception.pages.length === 2, 'intent exception must name exactly two pages');
    const sorted = [...exception.pages].sort();
    assert(sorted.every((contentId) => pageById.has(contentId)), `intent exception references unknown page: ${sorted.join(', ')}`);
    const key = sorted.join('|');
    assert(!exceptionKeys.has(key), `duplicate intent exception: ${key}`);
    assert(typeof exception.rationale === 'string' && exception.rationale.trim().length >= 40, `${key}: intent exception rationale too short`);
    const approval = reviews.get(exception.approvalId);
    assert(approval?.type === 'intent-exception' && approval.decision === 'approved', `${key}: intent exception needs its own approved exception review`);
    assert.deepEqual([...(approval.intentException?.pages ?? [])].sort(), sorted, `${key}: exception review is for different pages`);
    const expectedFingerprints = Object.fromEntries(
      sorted.map((contentId) => {
        const page = pageById.get(contentId);
        return [contentId, fingerprintPage(page.rawMeta, page.body)];
      }),
    );
    assert.deepEqual(approval.intentException?.contentFingerprints, expectedFingerprints, `${key}: exception review fingerprints are stale`);
    assert.equal(
      approval.intentException?.rationaleFingerprint,
      fingerprintText(exception.rationale.trim()),
      `${key}: exception rationale is not the text that was approved`,
    );
    validateOwnerAuthorization(approval, `${key}: intent exception approval`);
    exceptionKeys.add(key);
  }
}

async function validateProductRegistry() {
  assert.equal(productRegistry.schemaVersion, 1, 'product feature registry schemaVersion mismatch');
  assertDate(productRegistry.reviewedAt, 'product feature registry reviewedAt');
  assert(productRegistry.features && typeof productRegistry.features === 'object', 'product feature registry features missing');

  const attestationPath = path.join(PUBLISHING, 'product-evidence', APP_ATTESTATION_FILE);
  const attestationSource = await readFile(attestationPath, 'utf8');
  assert.equal(fingerprintText(attestationSource), PINNED_APP_ATTESTATION_DIGEST, 'app source attestation changed without executable policy approval');
  const attestation = JSON.parse(attestationSource);
  await validateJsonDocument(
    attestation,
    path.join(PUBLISHING, 'product-source-attestation.schema.json'),
    'app source attestation',
  );
  assert.equal(attestation.id, APP_ATTESTATION_ID, 'unexpected app source attestation id');
  assert.equal(attestation.repository.commit, PINNED_APP_SOURCE_COMMIT, 'app source attestation commit is not pinned');
  assert.equal(attestation.repository.remote, null, 'app source attestation must not invent an unverified remote');
  assertDate(attestation.verifiedAt, 'app source attestation verifiedAt');
  for (const listing of attestation.storeListings) {
    assertDate(listing.observedAt, `${listing.id}: store listing observedAt`);
    assert(listing.observedAt <= attestation.verifiedAt, `${listing.id}: store observation follows the attestation`);
  }
  const artifactById = new Map(attestation.artifacts.map((artifact) => [artifact.id, artifact]));
  assert.equal(artifactById.size, attestation.artifacts.length, 'app source attestation has duplicate artifact ids');

  for (const [featureId, feature] of Object.entries(productRegistry.features)) {
    assert.equal(feature.status, 'verified-in-source', `${featureId}: feature status must describe source verification`);
    assert(Array.isArray(feature.implementationPlatforms) && feature.implementationPlatforms.length > 0, `${featureId}: implementationPlatforms missing`);
    assert(feature.implementationPlatforms.every((platform) => ['ios', 'android'].includes(platform)), `${featureId}: unsupported implementation platform`);
    assert(Array.isArray(feature.proof) && feature.proof.length > 0, `${featureId}: repository proof missing`);
    for (const proof of feature.proof) {
      assert.equal(proof.type, 'app-source-attestation', `${featureId}: website/marketing copy cannot prove an app feature`);
      assert.equal(proof.attestationId, APP_ATTESTATION_ID, `${featureId}: proof uses an unpinned app attestation`);
      const artifact = artifactById.get(proof.artifactId);
      assert(artifact, `${featureId}: app source artifact ${proof.artifactId} missing`);
      assert(artifact.supports.includes(featureId), `${featureId}: app artifact ${proof.artifactId} does not attest this feature`);
      assert(HASH_PATTERN.test(artifact.sha256), `${featureId}: app artifact hash invalid`);
      assert(artifact.path.startsWith('src/'), `${featureId}: app artifact must point to app source`);
    }
    for (const distributionId of feature.distributionEvidenceIds ?? []) {
      const listing = attestation.storeListings.find((entry) => entry.id === distributionId);
      assert(listing, `${featureId}: distribution evidence ${distributionId} missing`);
      assert.equal(listing.platform, 'ios', `${featureId}: only the verified iOS listing may be claimed`);
    }
  }

  for (const page of pages) {
    assert(productRegistry.features[page.meta.appFeature], `${page.contentId}: appFeature has no non-circular source proof`);
  }
}

function validateKeywordMap() {
  assert(keywordRows.length > 0, 'Italian keyword map is empty');
  const targetOwners = new Map();
  for (const [index, row] of keywordRows.entries()) {
    const line = index + 2;
    for (const field of ['primary_keyword', 'search_intent', 'target_url', 'serp_evidence', 'volume_note', 'source_urls', 'anti_cannibalization_note']) {
      assert(typeof row[field] === 'string' && row[field].trim(), `keyword map row ${line}: ${field} missing`);
    }
    assert(row.target_url === config.basePath || row.target_url.startsWith(`${config.basePath}/it/`), `keyword map row ${line}: Italian target required`);
    assert(['non disponibile', 'direzionale', 'verificato'].includes(row.volume_note.toLocaleLowerCase('it')), `keyword map row ${line}: invalid volume note`);
    assert(row.source_urls.split(';').map((url) => url.trim()).filter(Boolean).every((url) => /^https:\/\//.test(url)), `keyword map row ${line}: HTTPS evidence URL required`);
    assert(row.anti_cannibalization_note.trim().length >= 30, `keyword map row ${line}: anti-cannibalization decision too short`);
    const key = `${row.target_url}\u0000${normalizePhrase(row.primary_keyword)}`;
    assert(!targetOwners.has(key), `keyword map row ${line}: duplicate canonical/primary owner`);
    targetOwners.set(key, line);
  }

  for (const page of pages) {
    const matches = keywordRows.filter(
      (row) => row.target_url === page.meta.canonical
        && normalizePhrase(row.primary_keyword) === normalizePhrase(page.meta.primaryKeyword),
    );
    assert.equal(matches.length, 1, `${page.contentId}: exactly one Italian keyword-map owner required`);
  }
}

function validateUniqueness() {
  const titles = new Map();
  const descriptions = new Map();
  const keywordOwners = new Map();
  for (const page of pages) {
    addUnique(titles, normalizePhrase(page.meta.title), page.contentId, 'normalized title');
    addUnique(descriptions, normalizePhrase(page.meta.description), page.contentId, 'normalized description');
    for (const [index, keyword] of [page.meta.primaryKeyword, ...page.meta.secondaryKeywords].entries()) {
      const role = index === 0 ? 'primary' : 'secondary';
      const normalized = normalizePhrase(keyword);
      const previous = keywordOwners.get(normalized);
      assert(!previous, `${page.contentId}: ${role} keyword "${keyword}" collides with ${previous?.contentId ?? ''} ${previous?.role ?? ''}`);
      keywordOwners.set(normalized, { contentId: page.contentId, role });
    }
  }

  const allowedPairs = new Set(manifest.intentExceptions.map((exception) => [...exception.pages].sort().join('|')));
  for (let leftIndex = 0; leftIndex < pages.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < pages.length; rightIndex += 1) {
      const left = pages[leftIndex];
      const right = pages[rightIndex];
      const pair = [left.contentId, right.contentId].sort().join('|');
      const intentScore = jaccard(intentTokens(left), intentTokens(right));
      const bodyScore = jaccard(ngrams(left.body, 5), ngrams(right.body, 5));
      if (intentScore >= INTENT_WARN_THRESHOLD && intentScore < INTENT_BLOCK_THRESHOLD) {
        console.warn(`Publish gate warning: ${pair} intent similarity ${intentScore.toFixed(2)}; keep ownership boundary under review.`);
      }
      if (intentScore >= INTENT_BLOCK_THRESHOLD || bodyScore >= BODY_BLOCK_THRESHOLD) {
        assert(
          allowedPairs.has(pair),
          `${pair}: possible cannibalization (intent ${intentScore.toFixed(2)}, body ${bodyScore.toFixed(2)}) needs an approved exception`,
        );
      }
    }
  }
}

function validateRecordShape(record) {
  assert(record && typeof record === 'object', 'publication record must be an object');
  assert(/^(guide|calcolatori|confronti|landing)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.contentId ?? ''), 'publication record contentId invalid');
  assert(/^\/it\/.+\/$/.test(record.canonical ?? ''), `${record.contentId}: Italian canonical required`);
  assert.equal(record.audienceMarket, 'IT', `${record.contentId}: audienceMarket must be IT`);
  assert(['new-content', 'substantive-update', 'metadata-or-links'].includes(record.changeScope), `${record.contentId}: changeScope invalid`);
  assert(typeof record.intentOwner === 'string' && record.intentOwner.trim().length >= 8, `${record.contentId}: intentOwner missing`);
  assert(typeof record.demandEvidenceId === 'string' && record.demandEvidenceId.trim(), `${record.contentId}: demandEvidenceId missing`);
  assert(/^review:[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.approvalId ?? ''), `${record.contentId}: approvalId invalid`);
  assert(Array.isArray(record.productProofIds) && record.productProofIds.length > 0, `${record.contentId}: productProofIds missing`);
  assert.equal(new Set(record.productProofIds).size, record.productProofIds.length, `${record.contentId}: duplicate productProofId`);
  assert(Array.isArray(record.primarySourceUrls), `${record.contentId}: primarySourceUrls missing`);
  if (record.changeScope !== 'metadata-or-links') {
    assert(record.primarySourceUrls.length > 0, `${record.contentId}: substantive content needs a declared primary source`);
  }
  assert.equal(new Set(record.primarySourceUrls).size, record.primarySourceUrls.length, `${record.contentId}: duplicate primarySourceUrl`);
  assert(record.primarySourceUrls.every((url) => /^https:\/\//.test(url)), `${record.contentId}: primary sources must use HTTPS`);
}

function validateApprovedPublication(page, fingerprint, artifactFingerprint, record) {
  assert.equal(record.canonical, page.meta.canonical, `${page.contentId}: publication canonical mismatch`);
  assert.equal(normalizePhrase(record.intentOwner), normalizePhrase(page.meta.primaryKeyword), `${page.contentId}: intentOwner must equal the page primaryKeyword`);
  assert(record.productProofIds.includes(page.meta.appFeature), `${page.contentId}: appFeature ${page.meta.appFeature} lacks record proof`);
  assert(record.productProofIds.every((featureId) => productRegistry.features[featureId]?.status === 'verified-in-source'), `${page.contentId}: record references unverified product proof`);

  const review = reviews.get(record.approvalId);
  assert(review, `${page.contentId}: approval ${record.approvalId} missing`);
  assert.equal(review.type, 'editorial', `${page.contentId}: migration snapshot cannot approve changed content`);
  assert.equal(review.decision, 'approved', `${page.contentId}: publication is not approved`);
  assert.equal(review.contentId, page.contentId, `${page.contentId}: approval content mismatch`);
  assert.equal(review.contentFingerprint, fingerprint, `${page.contentId}: approval fingerprint is stale`);
  const transitiveArtifact = review.artifactFingerprint !== artifactFingerprint;
  if (transitiveArtifact) {
    const integrityReview = reviews.get(manifest.releaseIntegrityApprovalId);
    assert.equal(
      integrityReview?.transitiveArtifacts?.[page.contentId],
      artifactFingerprint,
      `${page.contentId}: built artifact drift needs release-integrity approval`,
    );
  }
  assert.equal(review.reviewMode, 'automated-with-owner-authorization', `${page.contentId}: review mode must disclose automation`);
  assert.equal(review.reviewOperator, 'Codex publication gate', `${page.contentId}: automated review operator mismatch`);
  assertDate(review.reviewedAt, `${page.contentId}: approval reviewedAt`);
  assert(review.reviewedAt >= page.meta.reviewed, `${page.contentId}: approval predates editorial review`);
  assert(review.ownerAuthorization && review.ownerAuthorization.approvedBy === page.meta.reviewer, `${page.contentId}: explicit owner authorization missing`);
  assertDate(review.ownerAuthorization.approvedAt, `${page.contentId}: owner authorization date`);
  assert(review.ownerAuthorization.approvedAt <= review.reviewedAt, `${page.contentId}: owner authorization follows automated review record`);
  assert(typeof review.ownerAuthorization.basis === 'string' && review.ownerAuthorization.basis.trim().length >= 40, `${page.contentId}: owner authorization basis missing`);
  assert(
    review.automatedChecks
      && ['sourceCoverage', 'productClaims', 'italianIntent', 'seoContracts', 'accessibilityContracts']
        .every((check) => review.automatedChecks[check] === true),
    `${page.contentId}: automated checklist incomplete`,
  );
  assert(typeof review.notes === 'string' && review.notes.trim().length >= 20, `${page.contentId}: approval notes too short`);

  const demand = evidence.get(record.demandEvidenceId);
  assert(demand, `${page.contentId}: demand evidence ${record.demandEvidenceId} missing`);
  assert.equal(demand.root.locale, 'it', `${page.contentId}: demand language must be Italian`);
  assert.equal(demand.root.market, 'IT', `${page.contentId}: demand market must be Italy`);
  assert.equal(demand.candidate.canonical, page.meta.canonical, `${page.contentId}: demand canonical mismatch`);
  assert.equal(normalizePhrase(demand.candidate.primaryKeyword), normalizePhrase(page.meta.primaryKeyword), `${page.contentId}: demand keyword mismatch`);
  assert(['publish', 'update'].includes(demand.candidate.decision), `${page.contentId}: demand evidence does not approve publication/update`);
  assert(demand.root.capturedAt <= review.reviewedAt, `${page.contentId}: review predates demand capture`);
  assert(daysBetween(demand.root.capturedAt, review.reviewedAt) <= 120, `${page.contentId}: demand evidence is older than 120 days at approval`);
  for (const field of ['intentBoundary', 'productFit', 'productBoundary']) {
    assert(typeof demand.candidate[field] === 'string' && demand.candidate[field].trim().length >= 20, `${page.contentId}: demand ${field} missing`);
  }
  assert(Array.isArray(demand.candidate.sourceUrls) && demand.candidate.sourceUrls.length > 0, `${page.contentId}: demand evidence URLs missing`);

  const sourceUrls = new Set(page.meta.sources.map((source) => source.url));
  assert(record.primarySourceUrls.every((url) => sourceUrls.has(url)), `${page.contentId}: declared primary source missing from metadata`);
  if (record.changeScope !== 'metadata-or-links') {
    assert(page.meta.sources.length >= 1, `${page.contentId}: substantive content needs an editorial source`);
    assert(demand.candidate.sourceUrls.length >= 1, `${page.contentId}: substantive content needs demand evidence URLs`);
    assert(
      new Set([...sourceUrls, ...demand.candidate.sourceUrls]).size >= 2,
      `${page.contentId}: substantive publication needs at least two distinct editorial/demand evidence URLs in combination`,
    );
    assert(record.primarySourceUrls.some((url) => !LOW_AUTHORITY_HOSTS.has(new URL(url).hostname)), `${page.contentId}: primary sources cannot consist only of Suggest/social/forum evidence`);
  }
  return transitiveArtifact;
}

async function validateRetirements() {
  const retirementById = new Map();
  for (const retirement of manifest.retirements) {
    assert(!retirementById.has(retirement.contentId), `${retirement.contentId}: duplicate retirement record`);
    assert(!pageById.has(retirement.contentId), `${retirement.contentId}: published page cannot also be retired`);
    const baselinePage = baselinePageData.get(retirement.contentId);
    const expectedFingerprint = baseline.pages[retirement.contentId] ?? retirement.previousFingerprint;
    assert(expectedFingerprint, `${retirement.contentId}: retirement has no known prior fingerprint`);
    if (baselinePage) {
      assert.equal(retirement.previousCanonical, baselinePage.rawMeta.canonical, `${retirement.contentId}: retired canonical does not match baseline`);
      assert.equal(retirement.previousFingerprint, baseline.pages[retirement.contentId], `${retirement.contentId}: retired fingerprint does not match baseline`);
    }
    const approval = reviews.get(retirement.approvalId);
    assert(approval?.type === 'retirement' && approval.decision === 'approved', `${retirement.contentId}: retirement needs a dedicated approved review`);
    assert.equal(approval.contentId, retirement.contentId, `${retirement.contentId}: retirement approval content mismatch`);
    assert.equal(approval.canonical, retirement.previousCanonical, `${retirement.contentId}: retirement approval canonical mismatch`);
    assert.equal(approval.contentFingerprint, retirement.previousFingerprint, `${retirement.contentId}: retirement approval fingerprint mismatch`);
    validateOwnerAuthorization(approval, `${retirement.contentId}: retirement approval`);
    retirementById.set(retirement.contentId, retirement);
  }

  const knownPriorIds = new Set(baselinePageData.keys());
  const previousManifest = await loadPreviousPublicationManifest();
  const previousRecordById = new Map((previousManifest?.records ?? []).map((record) => [record.contentId, record]));
  for (const record of previousRecordById.values()) knownPriorIds.add(record.contentId);
  for (const prior of previousManifest?.retirements ?? []) {
    const current = retirementById.get(prior.contentId);
    assert(current, `${prior.contentId}: retirement ledger entries are append-only`);
    assert.deepEqual(current, prior, `${prior.contentId}: prior retirement record was rewritten`);
  }
  for (const contentId of knownPriorIds) {
    if (pageById.has(contentId)) continue;
    const retirement = retirementById.get(contentId);
    assert(retirement, `${contentId}: deleted published content needs an approved retirement record`);
    const previousRecord = previousRecordById.get(contentId);
    if (previousRecord && !baselinePageData.has(contentId)) {
      const previousApproval = reviews.get(previousRecord.approvalId);
      assert(previousApproval?.type === 'editorial', `${contentId}: prior editorial approval must remain in the append-only review ledger`);
      assert.equal(retirement.previousCanonical, previousRecord.canonical, `${contentId}: retirement canonical differs from prior publication record`);
      assert.equal(retirement.previousFingerprint, previousApproval.contentFingerprint, `${contentId}: retirement fingerprint differs from prior editorial approval`);
    }
  }
  for (const contentId of retirementById.keys()) {
    assert(knownPriorIds.has(contentId), `${contentId}: retirement record has no verifiable publication history`);
  }
}

async function validateReleaseIntegrity() {
  const requiredStaticCanonicals = new Set(['/', '/privacy.html', '/terms.html']);
  for (const section of SECTIONS.filter((candidate) => candidate !== 'landing')) {
    if (pages.some((page) => page.section === section)) requiredStaticCanonicals.add(`/it/${section}/`);
  }
  assert.deepEqual(
    Object.keys(manifest.staticArtifacts).sort(),
    [...requiredStaticCanonicals].sort(),
    'static artifact inventory must contain the fixed routes and every active Italian hub exactly once',
  );

  const actualStaticArtifacts = {};
  for (const canonical of [...requiredStaticCanonicals].sort()) {
    actualStaticArtifacts[canonical] = await fingerprintBuiltRoute(canonical);
  }
  assert.deepEqual(manifest.staticArtifacts, actualStaticArtifacts, 'static built artifacts changed without a new integrity approval');

  const dependencyFiles = await collectReleaseDependencies();
  const dependencyFingerprint = fingerprintStableObject(dependencyFiles);
  assert.equal(manifest.releaseIntegrityApprovalId, PINNED_RELEASE_INTEGRITY_ID, 'release integrity approval id is not pinned by executable policy');
  assert.equal(
    fingerprintText(await readFile(path.join(REVIEWS, '2026-09-03-release-integrity.json'), 'utf8')),
    PINNED_RELEASE_INTEGRITY_DIGEST,
    'release integrity review changed without executable policy approval',
  );
  const approval = reviews.get(manifest.releaseIntegrityApprovalId);
  assert(approval?.type === 'release-integrity' && approval.decision === 'approved', 'release integrity needs its own approved review');
  assert.equal(approval.dependencyFingerprint, dependencyFingerprint, 'release dependency approval is stale');
  assert.deepEqual(approval.dependencyFiles, dependencyFiles, 'release dependency file inventory is stale or incomplete');
  assert.deepEqual(approval.staticArtifacts, actualStaticArtifacts, 'release integrity static artifact approval is stale');
  const expectedTransitiveArtifacts = Object.fromEntries(
    [...coverage.entries()]
      .filter(([, value]) => value.mode === 'baseline-transitive' || value.transitiveArtifact === true)
      .map(([contentId, value]) => [contentId, value.artifactFingerprint]),
  );
  assert.deepEqual(approval.transitiveArtifacts ?? {}, expectedTransitiveArtifacts, 'release integrity transitive artifact approval is stale or over-broad');
  assert(
    approval.automatedChecks?.indexableInventory === true
      && approval.automatedChecks?.generatedArtifacts === true
      && approval.automatedChecks?.dependencyClosure === true,
    'release integrity automated checks are incomplete',
  );
  validateOwnerAuthorization(approval, 'release integrity approval');
}

async function validateIndexableInventory() {
  const files = await listFilesRecursively(DIST, (file) => file.endsWith('.html'));
  const actualByCanonical = new Map();
  for (const file of files) {
    const html = await readFile(file, 'utf8');
    const robots = readHtmlTagAttribute(html, 'meta', 'name', 'robots', 'content') ?? '';
    if (robots.toLocaleLowerCase('en').split(/[,\s]+/).includes('noindex')) continue;
    const canonicalUrl = readHtmlTagAttribute(html, 'link', 'rel', 'canonical', 'href');
    assert(canonicalUrl, `${path.relative(ROOT, file)}: every indexable HTML artifact needs a canonical`);
    const parsed = new URL(canonicalUrl);
    assert.equal(parsed.origin, config.origin, `${path.relative(ROOT, file)}: canonical must use ${config.origin}`);
    assert.equal(parsed.search, '', `${path.relative(ROOT, file)}: canonical query strings are forbidden`);
    assert.equal(parsed.hash, '', `${path.relative(ROOT, file)}: canonical fragments are forbidden`);
    const canonical = parsed.pathname;
    assert(!actualByCanonical.has(canonical), `${canonical}: duplicate indexable built artifacts`);
    actualByCanonical.set(canonical, file);
  }

  const expected = new Set([
    ...pages.map((page) => page.meta.canonical),
    ...Object.keys(manifest.staticArtifacts),
  ]);
  assert.deepEqual([...actualByCanonical.keys()].sort(), [...expected].sort(), 'dist indexable inventory differs from approved content and static routes');
  for (const [canonical, file] of actualByCanonical) {
    assert.equal(path.resolve(file), path.resolve(routeToFile(canonical)), `${canonical}: canonical is emitted at an unexpected dist path`);
  }
}

function validateOwnerAuthorization(review, label) {
  assert.equal(review.reviewMode, 'automated-with-owner-authorization', `${label}: review mode must disclose automation`);
  assert.equal(review.reviewOperator, 'Codex publication gate', `${label}: automated review operator mismatch`);
  assertDate(review.reviewedAt, `${label}: reviewedAt`);
  assert(review.ownerAuthorization && typeof review.ownerAuthorization.approvedBy === 'string', `${label}: owner authorization missing`);
  assertDate(review.ownerAuthorization.approvedAt, `${label}: owner authorization date`);
  assert(review.ownerAuthorization.approvedAt <= review.reviewedAt, `${label}: owner authorization follows review`);
  assert(typeof review.ownerAuthorization.basis === 'string' && review.ownerAuthorization.basis.trim().length >= 40, `${label}: owner authorization basis missing`);
}

function validateSources(page) {
  assert(Array.isArray(page.meta.sources), `${page.contentId}: sources must be an array`);
  const urls = new Set();
  for (const source of page.meta.sources) {
    assert(/^https:\/\//.test(source.url ?? ''), `${page.contentId}: source URL must use HTTPS`);
    assert(!urls.has(source.url), `${page.contentId}: duplicate source URL ${source.url}`);
    urls.add(source.url);
    for (const field of ['label', 'publishedOrUpdated', 'geography', 'supports']) {
      assert(typeof source[field] === 'string' && source[field].trim().length >= 3, `${page.contentId}: source ${field} missing`);
    }
    assertDate(source.accessedAt, `${page.contentId}: source accessedAt`);
    assert(source.accessedAt <= page.meta.reviewed, `${page.contentId}: source access follows editorial review`);
  }
}

async function validateGeneratedParity() {
  try {
    await access(DIST);
  } catch {
    assert.fail('dist missing: run npm run seo:build before the publication gate');
  }

  for (const page of pages) {
    const html = await readFile(routeToFile(page.meta.canonical), 'utf8');
    const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert(schemaMatch, `${page.contentId}: JSON-LD missing from built page`);
    const schema = JSON.parse(schemaMatch[1]);
    const graph = Array.isArray(schema['@graph']) ? schema['@graph'] : [];
    const canonical = `${config.origin}${page.meta.canonical}`;
    const language = config.locales[page.locale].languageTag;
    const website = graph.find((entry) => entry['@type'] === 'WebSite');
    const breadcrumb = graph.find((entry) => entry['@type'] === 'BreadcrumbList');
    assert.equal(website?.inLanguage, language, `${page.contentId}: WebSite schema language mismatch`);
    assert.equal(breadcrumb?.itemListElement?.at(-1)?.item, canonical, `${page.contentId}: breadcrumb terminal URL mismatch`);
    assert.equal(breadcrumb?.itemListElement?.at(-1)?.name, page.meta.title, `${page.contentId}: breadcrumb terminal title mismatch`);

    if (['guide', 'confronti'].includes(page.section)) {
      const article = graph.find((entry) => entry['@type'] === 'Article');
      assert(article, `${page.contentId}: Article schema missing`);
      assert.equal(article.headline, page.meta.title, `${page.contentId}: Article headline mismatch`);
      assert.equal(article.description, page.meta.description, `${page.contentId}: Article description mismatch`);
      assert.equal(article.url, canonical, `${page.contentId}: Article URL mismatch`);
      assert.equal(article.mainEntityOfPage, canonical, `${page.contentId}: Article mainEntityOfPage mismatch`);
      assert.equal(article.datePublished, page.meta.published, `${page.contentId}: Article published date mismatch`);
      assert.equal(article.dateModified, page.meta.modified, `${page.contentId}: Article modified date mismatch`);
      assert.equal(article.inLanguage, language, `${page.contentId}: Article language mismatch`);
      assert.equal(article.author?.['@id'], `${config.origin}/#author`, `${page.contentId}: Article author mismatch`);
      assert.equal(article.publisher?.['@id'], `${config.origin}/#organization`, `${page.contentId}: Article publisher mismatch`);
      assert.equal(article.image, `${config.origin}${page.meta.ogImage}`, `${page.contentId}: Article image mismatch`);
      assert.equal(article.keywords, [page.meta.primaryKeyword, ...page.meta.secondaryKeywords].join(', '), `${page.contentId}: Article keywords mismatch`);
      assert.equal(article.wordCount, stripMarkdown(page.body).split(/\s+/).length, `${page.contentId}: Article wordCount mismatch`);
      assert.deepEqual(article.citation, page.meta.sources.map((source) => source.url), `${page.contentId}: Article citations mismatch`);
    } else if (page.section === 'calcolatori') {
      const application = graph.find((entry) => entry['@type'] === 'WebApplication');
      assert(application, `${page.contentId}: WebApplication schema missing`);
      assert.equal(application.name, page.meta.title, `${page.contentId}: calculator schema name mismatch`);
      assert.equal(application.description, page.meta.description, `${page.contentId}: calculator schema description mismatch`);
      assert.equal(application.url, canonical, `${page.contentId}: calculator schema URL mismatch`);
      assert.equal(application.inLanguage, language, `${page.contentId}: calculator schema language mismatch`);
      assert.equal(application.isAccessibleForFree, true, `${page.contentId}: calculator free-access schema mismatch`);
    } else {
      const application = graph.find((entry) => entry['@type'] === 'SoftwareApplication');
      assert(application, `${page.contentId}: SoftwareApplication schema missing`);
      assert.equal(application.name, config.name, `${page.contentId}: app schema name mismatch`);
      assert.equal(application.description, page.meta.description, `${page.contentId}: app schema description mismatch`);
      assert.equal(application.url, canonical, `${page.contentId}: app schema URL mismatch`);
      assert.equal(application.inLanguage, language, `${page.contentId}: app schema language mismatch`);
      assert.equal(application.operatingSystem, 'Android, iOS', `${page.contentId}: app platform schema mismatch`);
    }

    if (coverage.get(page.contentId)?.mode === 'approved') {
      assert(html.includes(config.appStoreUrl), `${page.contentId}: approved page App Store CTA missing`);
      assert(html.includes(config.googlePlayUrl), `${page.contentId}: approved page Google Play CTA missing`);
      assert(html.includes('data-analytics-event="store_outbound"'), `${page.contentId}: approved page conversion contract missing`);
    }
  }
}

function validateInternalLinks() {
  const inbound = new Map(pages.map((page) => [page.contentId, []]));
  for (const source of pages) {
    for (const target of pages) {
      if (source.contentId !== target.contentId && source.body.includes(`](${target.meta.canonical})`)) {
        inbound.get(target.contentId).push(source);
      }
    }
  }

  for (const page of pages) {
    for (const reference of page.meta.related) {
      const target = pageByReference.get(resolveReferenceId(page.locale, reference));
      assert(target, `${page.contentId}: unresolved related page ${reference}`);
    }
    if (coverage.get(page.contentId)?.mode !== 'approved') continue;
    const incoming = inbound.get(page.contentId);
    assert(incoming.length >= 2, `${page.contentId}: approved page needs contextual inbound links from two published pages`);
    const relatedContentIds = new Set(
      page.meta.related
        .map((reference) => pageByReference.get(resolveReferenceId(page.locale, reference))?.contentId)
        .filter(Boolean),
    );
    assert(
      incoming.some((source) => source.meta.cluster === page.meta.cluster || relatedContentIds.has(source.contentId)),
      `${page.contentId}: approved page needs a topically related inbound link`,
    );
    if (page.section !== 'landing') {
      const relatedPages = page.meta.related.map((reference) => pageByReference.get(resolveReferenceId(page.locale, reference)));
      assert(relatedPages.some((target) => target?.meta.cluster === page.meta.cluster), `${page.contentId}: approved page needs a same-cluster related link`);
    }
  }
}

async function loadPublishedPages(locale) {
  const loaded = [];
  for (const section of SECTIONS) {
    const directory = path.join(CONTENT, locale, section);
    let entries = [];
    try {
      entries = await readdir(directory, { withFileTypes: true });
    } catch (error) {
      if (error?.code === 'ENOENT') continue;
      throw error;
    }
    for (const entry of entries.filter((item) => item.isDirectory())) {
      const metaPath = path.join(directory, entry.name, 'meta.json');
      const bodyPath = path.join(directory, entry.name, 'body.md');
      const rawMeta = await readJson(metaPath);
      if (rawMeta.status !== 'published' || rawMeta.noindex !== false) continue;
      const meta = {
        ...rawMeta,
        sources: (rawMeta.sources ?? []).map((source) => ({
          ...(sourceRegistry[source.url] ?? {}),
          ...source,
        })),
      };
      const body = await readFile(bodyPath, 'utf8');
      loaded.push({
        contentId: `${section}/${entry.name}`,
        locale,
        section,
        meta,
        rawMeta,
        body,
      });
    }
  }
  return loaded.sort((left, right) => left.contentId.localeCompare(right.contentId, 'it'));
}

async function loadPublishedPagesFromGit(commit, locale) {
  await execFileAsync('git', ['-C', ROOT, 'cat-file', '-e', `${commit}^{commit}`]);
  const { stdout } = await execFileAsync(
    'git',
    ['-C', ROOT, 'ls-tree', '-r', '--name-only', commit, '--', `content/${locale}`],
    { maxBuffer: 10 * 1024 * 1024 },
  );
  const metaPaths = stdout
    .split(/\r?\n/)
    .filter((file) => new RegExp(`^content/${locale}/(${SECTIONS.join('|')})/[^/]+/meta\\.json$`).test(file))
    .sort();
  const loaded = new Map();
  for (const metaPath of metaPaths) {
    const match = metaPath.match(new RegExp(`^content/${locale}/(${SECTIONS.join('|')})/([^/]+)/meta\\.json$`));
    const [, section, slug] = match;
    const rawMeta = JSON.parse(await gitShow(commit, metaPath));
    if (rawMeta.status !== 'published' || rawMeta.noindex !== false) continue;
    const bodyPath = metaPath.replace(/meta\.json$/, 'body.md');
    const body = await gitShow(commit, bodyPath);
    loaded.set(`${section}/${slug}`, { contentId: `${section}/${slug}`, section, locale, rawMeta, body });
  }
  return loaded;
}

async function loadPreviousPublicationManifest() {
  const current = JSON.stringify(stableValue(manifest));
  const manifestPath = 'content/publishing/publication-manifest.json';
  let revisions = [];
  try {
    const { stdout } = await execFileAsync(
      'git',
      ['-C', ROOT, 'log', '--format=%H', '--', manifestPath],
      { maxBuffer: 2 * 1024 * 1024 },
    );
    revisions = stdout.split(/\r?\n/).filter(Boolean);
  } catch {
    revisions = [];
  }
  for (const revision of revisions) {
    const candidate = JSON.parse(await gitShow(revision, manifestPath));
    if (JSON.stringify(stableValue(candidate)) !== current) return candidate;
  }
  // The gate predates the first ledger commit; the pinned migration baseline
  // remains the publication history floor in that case.
  return null;
}

async function gitShow(revision, file) {
  const { stdout } = await execFileAsync('git', ['-C', ROOT, 'show', `${revision}:${file}`], { maxBuffer: 20 * 1024 * 1024 });
  return stdout;
}

async function loadReviews() {
  const loaded = new Map();
  const entries = await readdir(REVIEWS, { withFileTypes: true });
  for (const entry of entries.filter((item) => item.isFile() && item.name.endsWith('.json'))) {
    const review = await readJson(path.join(REVIEWS, entry.name));
    await validateJsonDocument(review, path.join(PUBLISHING, 'review-record.schema.json'), `review ${entry.name}`);
    assert.equal(review.schemaVersion, 1, `${entry.name}: review schemaVersion mismatch`);
    assert(/^review:[a-z0-9]+(?:-[a-z0-9]+)*$/.test(review.id ?? ''), `${entry.name}: review id invalid`);
    assert(!loaded.has(review.id), `${entry.name}: duplicate review id ${review.id}`);
    assertDate(review.reviewedAt, `${entry.name}: reviewedAt`);
    loaded.set(review.id, review);
  }
  return loaded;
}

async function loadDemandEvidence() {
  const loaded = new Map();
  const entries = await readdir(DOCS, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && /^SEO_DEMAND_EVIDENCE_[A-Z0-9_-]+\.json$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();
  assert(files.length > 0, 'no SEO demand evidence files found');

  for (const file of files) {
    const root = await readJson(path.join(DOCS, file));
    await validateJsonDocument(root, path.join(PUBLISHING, 'demand-evidence.schema.json'), `demand evidence ${file}`);
    assert.equal(root.schemaVersion, 1, `${file}: schemaVersion mismatch`);
    assert.equal(root.locale, 'it', `${file}: locale must be it`);
    assert.equal(root.market, 'IT', `${file}: market must be IT`);
    assertDate(root.capturedAt, `${file}: capturedAt`);
    assert(Array.isArray(root.candidates) && root.candidates.length > 0, `${file}: candidates missing`);
    const providers = [root.provider, ...(root.providers ?? [])].filter(Boolean);
    assert(providers.length > 0, `${file}: evidence provider missing`);

    for (const candidate of root.candidates) {
      assert(/^demand:[a-z0-9]+(?:-[a-z0-9]+)*$/.test(candidate.id ?? ''), `${file}: candidate id missing or invalid`);
      assert(!loaded.has(candidate.id), `${file}: duplicate demand id ${candidate.id}`);
      assert(typeof candidate.primaryKeyword === 'string' && candidate.primaryKeyword.trim().length >= 3, `${candidate.id}: primaryKeyword missing`);
      assert(/^\/it\/.+\/$/.test(candidate.canonical ?? ''), `${candidate.id}: Italian canonical required`);
      assert(typeof candidate.query === 'string' && candidate.query.trim().length >= 3, `${candidate.id}: query missing`);
      assert(typeof candidate.signal === 'string' && candidate.signal.trim(), `${candidate.id}: signal missing`);
      assert(['publish', 'update', 'merge', 'reject'].includes(candidate.decision), `${candidate.id}: decision invalid`);
      if (/directional|suggest/i.test(candidate.signal)) {
        assert.equal(candidate.volume, null, `${candidate.id}: directional evidence cannot claim search volume`);
      }
      if (candidate.requestUrl?.startsWith('https://suggestqueries.google.com/')) {
        const request = new URL(candidate.requestUrl);
        assert.equal(request.searchParams.get('hl'), 'it', `${candidate.id}: Suggest hl must be it`);
        assert.equal(request.searchParams.get('gl'), 'it', `${candidate.id}: Suggest gl must be IT`);
      }
      if (/exact.*suggest|suggest.*exact/i.test(candidate.signal)) {
        assert.equal(candidate.exactSuggestionReturned, true, `${candidate.id}: exact Suggest signal needs an explicit exactSuggestionReturned=true payload`);
        assert(typeof candidate.rawResponse === 'string' && candidate.rawResponse.trim(), `${candidate.id}: exact Suggest signal needs the captured raw response`);
      }
      if (candidate.exactSuggestionReturned === true) {
        assert(Array.isArray(candidate.returnedSuggestions), `${candidate.id}: returned suggestions missing`);
        assert(
          candidate.returnedSuggestions.some((suggestion) => normalizePhrase(suggestion) === normalizePhrase(candidate.query)),
          `${candidate.id}: exact Suggest claim is not present in returnedSuggestions`,
        );
      }
      if (Array.isArray(candidate.sourceUrls)) {
        assert(candidate.sourceUrls.every((url) => /^https:\/\//.test(url)), `${candidate.id}: evidence URLs must use HTTPS`);
      }
      loaded.set(candidate.id, { root, candidate, file });
    }
  }
  return loaded;
}

function fingerprintPage(meta, body) {
  const normalizedBody = body.replace(/\r\n/g, '\n').trim();
  return `sha256:${createHash('sha256').update(`${JSON.stringify(stableValue(meta))}\n${normalizedBody}`).digest('hex')}`;
}

function fingerprintText(value) {
  return `sha256:${createHash('sha256').update(String(value).replace(/\r\n/g, '\n')).digest('hex')}`;
}

function fingerprintStableObject(value) {
  return fingerprintText(JSON.stringify(stableValue(value)));
}

async function fingerprintBuiltRoute(canonical) {
  const file = routeToFile(canonical);
  let html;
  try {
    html = await readFile(file, 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') assert.fail(`${canonical}: built artifact missing at ${path.relative(ROOT, file)}`);
    throw error;
  }
  return fingerprintText(html.trim());
}

function deriveChangeScope(page, previous) {
  if (!previous) return 'new-content';
  const previousBody = previous.body.replace(/\r\n/g, '\n').trim();
  const currentBody = page.body.replace(/\r\n/g, '\n').trim();
  if (previousBody === currentBody) return 'metadata-or-links';
  if (isContextualInternalLinkAppend(previousBody, currentBody)) return 'metadata-or-links';
  return 'substantive-update';
}

function isContextualInternalLinkAppend(previousBody, currentBody) {
  const previousLines = previousBody.split('\n');
  const currentLines = currentBody.split('\n');
  const additions = [];
  let previousIndex = 0;
  for (const line of currentLines) {
    if (line === previousLines[previousIndex]) {
      previousIndex += 1;
    } else {
      additions.push(line);
    }
  }
  if (previousIndex !== previousLines.length) return false;
  const meaningful = additions.map((line) => line.trim()).filter(Boolean);
  if (meaningful.length === 0 || meaningful.join('\n').length > 900) return false;
  return meaningful.every((line) => {
    const links = [...line.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
    return links.length > 0
      && links.every((target) => /^\/it\/(?:guide|calcolatori|confronti|app-per-autotrasportatori)\/.+/.test(target))
      && !/https?:\/\//i.test(line)
      && !/^\s*(?:#{1,6}|[-*+] |>)/.test(line);
  });
}

async function collectReleaseDependencies() {
  const files = new Set([
    'content/site.json',
    'content/sources.json',
    'package.json',
    'package-lock.json',
  ]);
  await collectLocalImports('scripts/build-content.mjs', files);
  const seoDirectory = path.join(ROOT, 'public', 'seo');
  for (const entry of await readdir(seoDirectory, { withFileTypes: true })) {
    if (entry.isFile()) files.add(path.posix.join('public/seo', entry.name));
  }
  const fingerprints = {};
  for (const file of [...files].sort()) {
    fingerprints[file] = fingerprintText(await readFile(path.join(ROOT, file), 'utf8'));
  }
  return fingerprints;
}

async function collectLocalImports(relativeFile, files) {
  if (files.has(relativeFile)) return;
  files.add(relativeFile);
  const source = await readFile(path.join(ROOT, relativeFile), 'utf8');
  const directory = path.posix.dirname(relativeFile);
  for (const match of source.matchAll(/(?:from\s+|import\s*)['"](\.[^'"]+)['"]/g)) {
    const specifier = match[1];
    const unresolved = path.posix.normalize(path.posix.join(directory, specifier));
    const candidates = path.posix.extname(unresolved)
      ? [unresolved]
      : [`${unresolved}.mjs`, `${unresolved}.js`, `${unresolved}.json`, path.posix.join(unresolved, 'index.mjs')];
    let resolved = null;
    for (const candidate of candidates) {
      try {
        await access(path.join(ROOT, candidate));
        resolved = candidate;
        break;
      } catch {
        // Try the next Node-style local-module candidate.
      }
    }
    assert(resolved, `${relativeFile}: unresolved local renderer dependency ${specifier}`);
    await collectLocalImports(resolved, files);
  }
}

async function listFilesRecursively(directory, predicate) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFilesRecursively(file, predicate));
    else if (entry.isFile() && predicate(file)) files.push(file);
  }
  return files.sort();
}

function readHtmlTagAttribute(html, tagName, selectorName, selectorValue, resultName) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) ?? [];
  for (const tag of tags) {
    const attributes = Object.fromEntries(
      [...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)]
        .map((match) => [match[1].toLocaleLowerCase('en'), match[3]]),
    );
    const selector = attributes[selectorName.toLocaleLowerCase('en')] ?? '';
    if (selector.toLocaleLowerCase('en').split(/\s+/).includes(selectorValue.toLocaleLowerCase('en'))) {
      return attributes[resultName.toLocaleLowerCase('en')] ?? null;
    }
  }
  return null;
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]));
  }
  return value;
}

function normalizePhrase(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLocaleLowerCase('it')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

function intentTokens(page) {
  const value = [page.meta.primaryKeyword, page.meta.searchIntent, ...page.meta.secondaryKeywords].join(' ');
  return new Set(normalizePhrase(value).split(/\s+/).filter((token) => token && !STOP_WORDS.has(token)));
}

function ngrams(value, size) {
  const tokens = normalizePhrase(value).split(/\s+/).filter(Boolean);
  const grams = new Set();
  for (let index = 0; index <= tokens.length - size; index += 1) {
    grams.add(tokens.slice(index, index + size).join(' '));
  }
  return grams;
}

function jaccard(left, right) {
  if (left.size === 0 && right.size === 0) return 1;
  let intersection = 0;
  for (const value of left) if (right.has(value)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

function addUnique(map, key, contentId, label) {
  assert(key, `${contentId}: empty ${label}`);
  assert(!map.has(key), `${contentId}: ${label} collides with ${map.get(key) ?? ''}`);
  map.set(key, contentId);
}

function resolveReferenceId(locale, reference) {
  const [section, slug, extra] = String(reference).split(':');
  assert(SECTIONS.includes(section) && slug && !extra, `invalid internal reference: ${reference}`);
  return `${locale}:${section}:${slug}`;
}

function routeToFile(route) {
  const relative = route.slice(config.basePath.length).replace(/^\//, '');
  if (!relative) return path.join(DIST, 'index.html');
  if (relative.endsWith('.html')) return path.join(DIST, relative);
  return path.join(DIST, relative, 'index.html');
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseCsv(value) {
  const lines = value.trim().split(/\r?\n/);
  const headers = parseCsvLine(lines.shift());
  return lines.map((line) => {
    const fields = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, fields[index] ?? '']));
  });
}

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === ',' && !quoted) {
      values.push(current);
      current = '';
    } else {
      current += character;
    }
  }
  values.push(current);
  return values;
}

function assertDate(value, label) {
  assert(DATE_PATTERN.test(value ?? ''), `${label}: YYYY-MM-DD required`);
  const date = new Date(`${value}T00:00:00Z`);
  assert(!Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value, `${label}: invalid calendar date`);
  assert(value <= new Date().toISOString().slice(0, 10), `${label}: future dates cannot prove a completed review or capture`);
}

function daysBetween(earlier, later) {
  return Math.floor((Date.parse(`${later}T00:00:00Z`) - Date.parse(`${earlier}T00:00:00Z`)) / 86_400_000);
}

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

async function validateJsonDocument(document, schemaFile, label) {
  const schemas = new Map();
  await loadSchemaGraph(schemaFile, schemas);
  const errors = [];
  validateSchemaValue(document, schemas.get(path.resolve(schemaFile)), '$', path.resolve(schemaFile), schemas, errors);
  assert.equal(errors.length, 0, `${label}: JSON Schema validation failed\n- ${errors.join('\n- ')}`);
}

async function loadSchemaGraph(schemaFile, schemas) {
  const absolute = path.resolve(schemaFile);
  if (schemas.has(absolute)) return;
  const schema = await readJson(absolute);
  schemas.set(absolute, schema);
  const refs = [];
  walkSchema(schema, (node) => {
    if (typeof node.$ref === 'string' && !node.$ref.startsWith('#')) refs.push(node.$ref);
  });
  for (const ref of refs) {
    const [relative] = ref.split('#');
    await loadSchemaGraph(path.resolve(path.dirname(absolute), relative), schemas);
  }
}

function walkSchema(value, visitor) {
  if (!value || typeof value !== 'object') return;
  visitor(value);
  if (Array.isArray(value)) {
    for (const item of value) walkSchema(item, visitor);
  } else {
    for (const child of Object.values(value)) walkSchema(child, visitor);
  }
}

function validateSchemaValue(value, schema, instancePath, schemaFile, schemas, errors) {
  if (schema === true) return;
  if (schema === false) {
    errors.push(`${instancePath}: forbidden by schema`);
    return;
  }
  const supported = new Set([
    '$schema', '$id', '$ref', 'title', 'description', 'type', 'const', 'enum', 'pattern', 'format',
    'minLength', 'maxLength', 'minimum', 'maximum', 'required', 'properties', 'additionalProperties',
    'minProperties', 'maxProperties', 'items', 'minItems', 'maxItems', 'uniqueItems', 'oneOf', 'allOf',
  ]);
  for (const keyword of Object.keys(schema)) {
    assert(supported.has(keyword), `${path.relative(ROOT, schemaFile)}: unsupported schema keyword ${keyword}; runtime enforcement would be incomplete`);
  }

  if (schema.$ref) {
    assert(!schema.$ref.startsWith('#'), `${path.relative(ROOT, schemaFile)}: local JSON pointers are not supported by the gate validator`);
    const [relative] = schema.$ref.split('#');
    const targetFile = path.resolve(path.dirname(schemaFile), relative);
    const target = schemas.get(targetFile);
    assert(target, `${path.relative(ROOT, schemaFile)}: unresolved schema reference ${schema.$ref}`);
    validateSchemaValue(value, target, instancePath, targetFile, schemas, errors);
  }

  for (const child of schema.allOf ?? []) validateSchemaValue(value, child, instancePath, schemaFile, schemas, errors);
  if (schema.oneOf) {
    let matches = 0;
    const branchErrors = [];
    for (const child of schema.oneOf) {
      const candidateErrors = [];
      validateSchemaValue(value, child, instancePath, schemaFile, schemas, candidateErrors);
      if (candidateErrors.length === 0) matches += 1;
      else branchErrors.push(candidateErrors.join('; '));
    }
    if (matches !== 1) errors.push(`${instancePath}: expected exactly one oneOf branch, matched ${matches}${matches === 0 ? ` (${branchErrors.join(' | ')})` : ''}`);
  }

  const types = schema.type === undefined ? [] : (Array.isArray(schema.type) ? schema.type : [schema.type]);
  if (types.length > 0 && !types.some((type) => matchesJsonType(value, type))) {
    errors.push(`${instancePath}: expected type ${types.join('|')}`);
    return;
  }
  if (schema.const !== undefined && !jsonEqual(value, schema.const)) errors.push(`${instancePath}: must equal ${JSON.stringify(schema.const)}`);
  if (schema.enum && !schema.enum.some((candidate) => jsonEqual(value, candidate))) errors.push(`${instancePath}: must be one of ${schema.enum.map(JSON.stringify).join(', ')}`);

  if (typeof value === 'string') {
    if (schema.minLength !== undefined && value.length < schema.minLength) errors.push(`${instancePath}: shorter than minLength ${schema.minLength}`);
    if (schema.maxLength !== undefined && value.length > schema.maxLength) errors.push(`${instancePath}: longer than maxLength ${schema.maxLength}`);
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) errors.push(`${instancePath}: does not match ${schema.pattern}`);
    if (schema.format === 'date' && !isCalendarDate(value)) errors.push(`${instancePath}: invalid date`);
    if (schema.format === 'uri') {
      try {
        new URL(value);
      } catch {
        errors.push(`${instancePath}: invalid URI`);
      }
    }
  }
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) errors.push(`${instancePath}: below minimum ${schema.minimum}`);
    if (schema.maximum !== undefined && value > schema.maximum) errors.push(`${instancePath}: above maximum ${schema.maximum}`);
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) errors.push(`${instancePath}: fewer than ${schema.minItems} items`);
    if (schema.maxItems !== undefined && value.length > schema.maxItems) errors.push(`${instancePath}: more than ${schema.maxItems} items`);
    if (schema.uniqueItems && new Set(value.map((item) => JSON.stringify(stableValue(item)))).size !== value.length) errors.push(`${instancePath}: items must be unique`);
    if (schema.items) value.forEach((item, index) => validateSchemaValue(item, schema.items, `${instancePath}[${index}]`, schemaFile, schemas, errors));
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const keys = Object.keys(value);
    if (schema.minProperties !== undefined && keys.length < schema.minProperties) errors.push(`${instancePath}: fewer than ${schema.minProperties} properties`);
    if (schema.maxProperties !== undefined && keys.length > schema.maxProperties) errors.push(`${instancePath}: more than ${schema.maxProperties} properties`);
    for (const required of schema.required ?? []) {
      if (!Object.hasOwn(value, required)) errors.push(`${instancePath}: missing required property ${required}`);
    }
    const properties = schema.properties ?? {};
    for (const [key, child] of Object.entries(properties)) {
      if (Object.hasOwn(value, key)) validateSchemaValue(value[key], child, `${instancePath}.${key}`, schemaFile, schemas, errors);
    }
    for (const key of keys.filter((candidate) => !Object.hasOwn(properties, candidate))) {
      if (schema.additionalProperties === false) errors.push(`${instancePath}: additional property ${key} is forbidden`);
      else if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
        validateSchemaValue(value[key], schema.additionalProperties, `${instancePath}.${key}`, schemaFile, schemas, errors);
      }
    }
  }
}

function matchesJsonType(value, type) {
  if (type === 'null') return value === null;
  if (type === 'array') return Array.isArray(value);
  if (type === 'object') return value !== null && typeof value === 'object' && !Array.isArray(value);
  if (type === 'integer') return Number.isInteger(value);
  if (type === 'number') return typeof value === 'number' && Number.isFinite(value);
  return typeof value === type;
}

function jsonEqual(left, right) {
  return JSON.stringify(stableValue(left)) === JSON.stringify(stableValue(right));
}

function isCalendarDate(value) {
  if (!DATE_PATTERN.test(value ?? '')) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}
