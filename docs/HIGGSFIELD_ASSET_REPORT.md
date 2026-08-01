# RouteBudget EU — Higgsfield Asset Report

Status: **generated, approved, optimized, integrated, and seamless-loop corrected**
Completed: 2026-08-01
Loop revision: 2026-08-01
Generator: <https://higgsfield.ai/>

## Final source

Higgsfield generated one original RouteBudget hero video from the approved prompt. The credit-spending **Generate** action was confirmed manually by the user. No paid plan was purchased and Unlimited mode remained off.

Generation settings:

- preset: General;
- model: Seedance 2.0;
- duration: 8 seconds;
- ratio: 16:9;
- resolution: 1080p;
- bitrate: High;
- prompt audio/enhancement: Off;
- Unlimited mode: Off;
- displayed credit cost: 72.

Source media properties:

- codec: H.264;
- frame size: 1920 × 1080;
- frame rate: 24 fps;
- duration: 8.041667 seconds;
- source size: 36,292,253 bytes (34.6 MB);
- source bitrate: approximately 36.1 Mbps;
- audio: none.

## Generation prompt

> Premium cinematic documentary shot of a realistic European articulated tractor-trailer travelling on a European motorway at blue hour transitioning into night. Three-quarter rear or side view, truck concentrated in the middle-right region, authentic European cab-over truck proportions and road infrastructure, controlled wet-road reflections after light rain, restrained cool blue route-light motif reflected in the asphalt, deep natural blacks, subtle atmospheric haze, elegant slow camera tracking, realistic logistics environment, wide negative space across the left and lower-left for white editorial typography, sophisticated commercial cinematography, no people visible, no text, no logos, no app interface, no American long-nose truck, no fantasy lighting, no cartoon, no game aesthetic, no stock-advertisement cliché. Slow seamless movement suitable for a muted website hero loop.

## Visual approval

Sampled frames near 1.4, 4.2, and 7.2 seconds were inspected before download.

- European cab-over tractor-trailer proportions remain stable.
- Truck stays in the right half of the desktop composition.
- Wet motorway and lamps create clean perspective and controlled reflections.
- Left field remains open for RouteBudget editorial copy.
- No generated text, logos, app interface, people, fantasy lighting, or American long-nose truck appears.
- No visible vehicle deformation, lane drift, or abrupt camera discontinuity appears across sampled frames.
- Motion is restrained enough for a muted background loop.

This video and its derived poster are materially AI-generated visual assets. Authentic Android product screenshots elsewhere on the website remain separate, unaltered product evidence.

## Seamless loop treatment

The original 8.041667-second file ended on a different motion phase from its opening frame, so a direct HTML `loop` produced a visible cut. Shipped videos now use a 16-second forward/reverse sequence:

1. original frames 0–192 play forward;
2. original frames 191–1 play in reverse;
3. duplicated turnaround and loop-end frames are excluded;
4. browser playback returns from original frame 1 to frame 0.

This produces 384 frames at 24 fps. No crossfade is used, so the truck never ghosts or doubles. Mean absolute pixel differences at both joins remain comparable to ordinary adjacent-frame motion:

- normal opening frame step: 1.4699;
- forward-to-reverse turnaround: 2.5052;
- reverse-to-forward browser loop: 1.9338.

Full browser-cycle verification observed uninterrupted playback through the turnaround and the 16-second reset with `paused = false` and `readyState = 4`.

## Shipped outputs

```text
src/assets/hero/routebudget-hero-desktop.mp4
src/assets/hero/routebudget-hero-mobile.mp4
src/assets/hero/routebudget-hero-poster.webp
```

| Asset | Dimensions | Codec / format | Size | Treatment |
|---|---:|---|---:|---|
| Desktop MP4 | 1920 × 1080 | H.264, yuv420p, 24 fps | 2,997,259 bytes | 16-second forward/reverse loop, CRF 24, no audio, fast-start metadata |
| Mobile MP4 | 720 × 1280 | H.264, yuv420p, 24 fps | 1,349,620 bytes | 16-second forward/reverse loop, art-directed 9:16 crop, CRF 25, no audio, fast-start metadata |
| Poster | 1920 × 1080 | WebP | approximately 49 KB | Extracted at 6.5 seconds, quality 82 |

Mobile media is a crop of the same approved Higgsfield source, not a second generation. This preserves vehicle, weather, grade, and motion continuity while avoiding an additional credit spend.

## Integration

`src/components/CinematicHero.tsx` now:

- loads the 720 × 1280 asset through a media-qualified mobile `<source>`;
- loads the 1920 × 1080 asset for wider viewports;
- uses the extracted WebP poster;
- retains muted, looping, inline playback;
- identifies the media as `data-media-status="higgsfield-original"`;
- pauses at frame zero when `prefers-reduced-motion: reduce` is active.

No substitute generator was used. Temporary `hero-night-truck.jpg` is no longer part of the active cinematic hero path.

## Completion checklist

- [x] Manual Higgsfield login complete
- [x] Paid Unlimited dialog dismissed without purchase
- [x] Prompt and settings verified
- [x] User confirmed 72-credit generation
- [x] Output generated successfully
- [x] Desktop motion and composition visually approved
- [x] Original 34.6 MB source downloaded
- [x] Optimized desktop MP4 created
- [x] Mobile-safe derivative created
- [x] WebP poster created
- [x] Responsive media integrated in `CinematicHero`
- [x] Direct-cut loop replaced with endpoint-deduplicated forward/reverse sequence
- [x] Full 16-second browser loop observed without playback pause
- [x] Reduced-motion playback handling added
- [x] Final six-viewport browser QA recorded
