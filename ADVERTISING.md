# Adsterra integration notes

## Automatic loading and master switch

`src/config.mjs` controls advertising with `advertising.enabled`. Approved placements load automatically when a content page opens. There is no Accept ads prompt, preference control or consent storage. The loader skips narrow-screen banner formats and loads classic banners sequentially. Automated tests inspect generated files without executing provider code.

## Approved placement map

The supplied three unit codes are each placed at most once per page and reused across routes. Adsterra recommends generating a separate unit for each distinct on-page placement. The two classic banner scripts share global `atOptions`, so the loader assigns each unit's options immediately before appending its script and awaits completion before loading another slot. The fixed Native Banner container ID appears once per page; it is never duplicated within a document.

| Unit | Route | Placement |
| --- | --- | --- |
| Native Banner, 32383604 | Homepage, every long guide, AI directory, finder, idea explorer and resources | One per page; spaced between major sections |
| Banner 300×250, 32383605 | Homepage, every long guide, AI directory, each calculator, finder, idea explorer and resources | At most once per page; lower placements follow substantial content |
| Banner 728×90, 32383606 | Homepage, every long guide, AI directory and each calculator | Lower on page; hidden and not requested below 768px |

The homepage and long guides each have three placements (one per supplied unit); the directory has three; calculators have two; Finder, Idea Explorer and Resources have two each. The 728×90 script is not requested below 768 CSS pixels. The 300×250 script is not requested below 340 CSS pixels. Slots are initially hidden, carry an Advertisement label, and collapse if the provider does not populate them within 12 seconds. There is no auto-refresh, simulated impression, click trigger, popunder, interstitial, Smartlink, redirect or overlay.

Adsterra's published guidance recommends a separate code for each on-page placement. Each supplied code is currently used once per page and reused across routes; add new dashboard-generated codes before creating additional placements on a page. Its Native Banner guidance also cautions against oversaturation. Placements are spaced, capped at three per page on home and guides, and excluded from every legal/trust page. Sources: [Adsterra banner placement guidance](https://adsterra.com/blog/how-banner-ads-make-money/), [Adsterra Native Banner guide](https://adsterra.com/blog/turn-a-profit-with-native-banners/), [publisher setup and formats](https://adsterra.com/blog/set-up-publishers-dashboard/).

## CSP and provider boundary

`public/_headers` allows `https://bauval.org` under `script-src`, `frame-src`, `img-src` and `connect-src`, matching the host present in the supplied snippets. The live Native Banner response referenced images from `https://cdn.storageimagedisplay.com`, so that exact observed image host is also allowed under `img-src`. Inline `atOptions` blocks are avoided; the local loader assigns the config object instead. No broad `https:` wildcard is added. The exact iframe, tracking and creative hosts used at runtime cannot be inferred from the snippets and were not fetched or executed during tests. A deployed browser may block a creative whose host is outside this allowlist. Inspect Cloudflare CSP reports and obtain Adsterra's current publisher CSP allowlist before adding any further domains. Expanding this policy permits additional third-party code or content and should be limited to verified provider origins.

The provider scripts are privileged third-party JavaScript when advertising pages load. They can make network requests and may set/read cookies or similar technologies through their ad creatives. The privacy page discloses the potential data shared and automatic loading. The site owner must review the applicable law and the ad network's current terms for the audience and configure the Adsterra account to exclude adult/undesired ad categories. The code snippet cannot enforce creative-category restrictions; this integration does not claim that it can.

## Files and verification

- `src/config.mjs`: approved unit IDs, source URLs, banner options, master switch.
- `scripts/build.mjs`: emits the config module and inserts the mapped slots.
- `public/app.mjs`: dynamically imports the loader automatically on pages with ad slots.
- `public/ad-loader.mjs`: serialized loading, responsive checks and empty/error collapse.
- `public/ads.css`: labeled reserved slots, mobile rules.
- `public/_headers`: narrow CSP additions for the submitted host.
- `tests/site.test.mjs`: configuration, IDs, routes, legal-page exclusions and generated output checks; no provider code runs.

Disabling `advertising.enabled` removes slots, config output and ad CSS references on the next build.
