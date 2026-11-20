# Verification report

Checked locally on November 20, 2026. No deployment or external account changes were performed.

## Automated checks

Production build: `SITE_URL=https://ai-tool-vault.pages.dev CONTACT_EMAIL=ri776179@gmail.com node scripts/build.mjs` — built 33 pages successfully.

Automated test command: `node --test tests/*.test.mjs` — 11 passing tests. The global `npm test` launcher was unavailable because its installation failed to find an internal `validate-engines.js` module; direct Node test execution succeeded.

- Reference scenarios for all six calculators: freelance rate 42.391304…; side hustle surplus 491.25; savings 13 months; budget balance 700; digital product profit 210; effective hourly earnings 18.
- Zero inputs, already-achieved savings goal, zero denominators, missing contribution, negative inputs, NaN, Infinity, oversized numbers, fee limits, negative profit and month rounding.
- Deterministic three-result matching and changed preferences producing a different top match.
- All three approved advertising unit configurations, unique vendor URLs, responsive placements and repeated banner placement limits.
- Generated HTML has unique IDs, no direct third-party script tags, zero ad slots on legal/trust pages, and no more than four slots on content pages. Fixed Native container appears at most once per page.
- Calculator page ad slots appear after the form, result and explanatory note. Tests inspect markup only; they never load vendor scripts or make provider requests.
- All 33 generated route pages have unique titles/descriptions and one H1; every generated local href/src and fragment target resolves.
- Twelve guides, ten tools, and five nonempty template downloads.
- Structured breadcrumbs are absent without an origin; configured data matches visible guide navigation and escapes unsafe text.
- A temporary production test origin generates 32 sitemap entries, canonical tags, breadcrumb schema and an allowing robots policy. The test then restores the caller's configured `SITE_URL` and `CONTACT_EMAIL` build output.

## Browser checks performed before ad integration

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

## Ad integration browser checks

- Reviewed the rebuilt homepage at the default desktop viewport and at a 390 × 844 mobile viewport. The consent panel is in normal document flow and does not cover the hero actions; mobile document width did not exceed its viewport width.
- At mobile width, all ad slots remained hidden because the visitor had not opted in. No `bauval.org` script element was present in the page.
- No live provider script was accepted or executed; real creative rendering, provider delivery, fill rate, iframe sizing and runtime CSP behavior remain unverified.

## Boundaries

This is not an exhaustive cross-browser or assistive-technology audit. Safari/Firefox, screen-reader output, all intermediate viewport widths, reduced-motion device settings, full keyboard traversal and formal contrast tooling were not independently tested. No Lighthouse/Core Web Vitals score, load test or legal compliance certification is claimed. The browser check did not opt in, so responsive behavior of actual third-party creatives was not observed.

The Cloudflare `_headers` file is included, but the simple local server does not apply those headers. Verify deployed CSP and HTTP headers on Cloudflare. Actual CDN behavior, domain/DNS, production 404 status, contact delivery, crawl indexing and third-party product account flows remain unverified until an approved deployment.

Review the notices for the actual owner and hosting practices before launch. The CSP allows only the supplied `bauval.org` host; other verified creative hosts may need specific allowlist entries. Repeated use of a banner code follows the owner's explicit preference, though Adsterra's published guidance recommends distinct codes for placements and warns reuse can affect reporting or delivery. Configure the Adsterra account to exclude adult and unwanted categories; the snippets cannot enforce that setting.
