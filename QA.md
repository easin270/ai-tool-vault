# Verification report

Checked locally on November 20, 2026. No deployment or external account changes were performed.

## Automated checks

Command: `node --test tests/*.test.mjs` — 9 passing tests.

- Reference scenarios for all six calculators: freelance rate 42.391304…; side hustle surplus 491.25; savings 13 months; budget balance 700; digital product profit 210; effective hourly earnings 18.
- Zero inputs, already-achieved savings goal, zero denominators, missing contribution, negative inputs, NaN, Infinity, oversized numbers, fee limits, negative profit and month rounding.
- Deterministic three-result matching and changed preferences producing a different top match.
- Every advertising switch false.
- All 33 generated route pages have unique titles/descriptions and one H1; every generated local href/src and fragment target resolves.
- Twelve guides, ten tools, and five nonempty template downloads.
- Structured breadcrumbs are absent without an origin; configured data matches visible guide navigation and escapes unsafe text.
- A temporary production test origin generates 32 sitemap entries, canonical tags, breadcrumb schema and an allowing robots policy. The test restores the normal preview build afterward. No test origin remains in the delivered preview output.

## Browser checks performed

- Desktop homepage visually reviewed at 1440 × 1000.
- Mobile homepage and calculator visually reviewed at 390 × 844; tablet guide reviewed at 768 × 1024.
- Discovered decorative orbit overflow on mobile, applied clipping to the illustration container and confirmed document width equals viewport width afterward. The mobile calculator and tablet article also have no horizontal overflow at the tested sizes.
- All six calculator defaults submitted in the browser and matched the expected displayed results. Freelance zero-hour error and reset confirmed.
- Directory empty search, clearing search, category filtering and A–Z sorting confirmed (Design gives Adobe Firefly, then Canva).
- Full six-step quiz exercised with Design / 5 hours / USD 25 / Independent / Beginner / Medium. Digital templates ranked first. Back retained Design; restart returned to question one.
- Idea explorer produced three ideas and reset cleared them.
- Template copy displayed success. Download contents and targets were checked through the filesystem/link tests; browser download-manager behavior was not separately exercised.
- Mobile menu opened; Escape closed it. Visible keyboard focus ring observed. Radio controls, native form controls, semantic labels and skip link are present.
- Browser error log read after the interactive checks contained no captured errors.

## Boundaries

This is not an exhaustive cross-browser or assistive-technology audit. Safari/Firefox, screen-reader output, all intermediate viewport widths, reduced-motion device settings, full keyboard traversal and formal contrast tooling were not independently tested. No Lighthouse/Core Web Vitals score, load test or legal compliance certification is claimed.

The Cloudflare `_headers` file is included, but the simple local server does not apply those headers. Verify deployed CSP and HTTP headers on Cloudflare. Actual CDN behavior, domain/DNS, production 404 status, contact delivery, crawl indexing and third-party product account flows remain unverified until an approved deployment.

The final build intentionally has no `SITE_URL` or contact identity. Configure these, review notices for the actual owner and hosting practices, and rebuild before launch. No external scripts, tracking, ads or placeholder ad areas are included.
