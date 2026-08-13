import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs');
const reports = [
  'SEO_PIPELINE_AUDIT.md',
  'SEO_IMPLEMENTATION_REPORT.md',
  'SEO_KEYWORD_RESEARCH_IT.md',
  'SEO_SERP_RESEARCH_IT.md',
  'SEO_RESEARCH_ROUND_2_2026-08-12.md',
  'SEO_RESEARCH_ROUND_3_2026-08-13.md',
  'SEO_KEYWORD_MAP_IT.csv',
  'SEO_CONTENT_CLUSTERS_IT.md',
  'SEO_INTERNAL_LINK_MAP.md',
  'SEO_INTERNAL_LINK_REPORT.md',
  'SEO_6_MONTH_ROADMAP_IT.md',
  'SEO_EDITORIAL_WORKFLOW.md',
  'SEO_ARTICLE_TEMPLATE.md',
  'SEO_CONTENT_BRIEF_TEMPLATE.md',
  'SEO_FACT_CHECK_CHECKLIST.md',
  'GOOGLE_SEARCH_CONSOLE_SETUP.md',
  'SEARCH_CONSOLE_OPERATIONS.md',
  'SEO_WEEKLY_REVIEW_TEMPLATE.md',
  'SEO_MONTHLY_REVIEW_TEMPLATE.md',
  'SEO_FINAL_VALIDATION_REPORT.md',
];
for (const report of reports) {
  const value = await readFile(path.join(DOCS, report), 'utf8');
  assert(value.trim().length >= 300, `${report}: report is missing or too short`);
  assert(!/(?:oauth_client_secret|private_key\s*[:=]|access_token\s*[:=])/i.test(value), `${report}: credential-like value detected`);
}
console.log(`SEO report gate passed: ${reports.length} required research, editorial, GSC, and validation artifacts.`);
