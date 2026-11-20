# Adsterra integration notes

## Switch and visitor choice

`src/config.mjs` is the single owner-side switch (`advertising.enabled`). When enabled, the generated pages show a non-modal consent panel. The vendor scripts are not requested unless a visitor chooses **Accept ads**. The choice is stored as `ai-tool-vault-ad-consent-v1` in local storage; rejection blocks future loads. The footer's **Ad preferences** control reopens the choice. If the visitor revokes an already active choice, the page reloads so its provider scripts stop running and do not persist into later navigation.

Automated tests inspect configuration and generated markup only. They never import or execute `public/ad-loader.mjs` or request Adsterra endpoints.

## Approved placement map

At the owner's explicit direction, the three supplied codes are reused across selected routes to increase placement coverage. This knowingly differs from Adsterra's published recommendation to request a unique code for each placement. The two classic banner scripts share global `atOptions`, so the loader assigns each unit's options immediately before appending its script and awaits completion before loading another slot. The fixed Native Banner container ID appears once per page; it is never duplicated within a document.

| Unit | Route | Placement |
| --- | --- | --- |
| Native Banner, 32383604 | Homepage, every long guide, AI directory, finder, idea explorer and resources | One per page; spaced between major sections |
| Banner 300×250, 32383605 | Homepage (2), every long guide (2), AI directory, each calculator, finder, idea explorer and resources | Reused on the same page only on the homepage and guides; lower placements follow substantial content |
| Banner 728×90, 32383606 | Homepage, every long guide, AI directory and each calculator | Lower on page; hidden and not requested below 768px |

The homepage has four placements (one Native, two 300×250, one 728×90); long guides have four (one Native, two 300×250, one 728×90); the directory has three; calculators have two; Finder, Idea Explorer and Resources have two each. The 728×90 script is not requested below 768 CSS pixels. The 300×250 script is not requested below 340 CSS pixels. Slots are initially hidden, carry an Advertisement label, and collapse if the provider does not populate them within 12 seconds. There is no auto-refresh, simulated impression, click trigger, popunder, interstitial, Smartlink, redirect or overlay.

Adsterra's published guidance recommends requesting a unique code for each placement; reuse can merge reporting or show the same offers simultaneously. The owner has explicitly chosen reuse for this integration and accepts the related reporting, delivery and provider-policy uncertainty. Its Native Banner guidance also cautions against oversaturation. Placements are spaced, capped at four per page, and excluded from every legal/trust page. Sources: [Adsterra banner placement guidance](https://adsterra.com/blog/how-banner-ads-make-money/), [Adsterra Native Banner guide](https://adsterra.com/blog/turn-a-profit-with-native-banners/), [publisher setup and formats](https://adsterra.com/blog/set-up-publishers-dashboard/).

## CSP and provider boundary

`public/_headers` allows `https://bauval.org` under `script-src`, `frame-src`, `img-src` and `connect-src`, matching the host present in the supplied snippets. Inline `atOptions` blocks are avoided; the local loader assigns the config object instead. No broad `https:` wildcard is added. The exact iframe, tracking and creative hosts used at runtime cannot be inferred from the snippets and were not fetched or executed during tests. A deployed browser may block a creative whose host is outside this allowlist. Inspect Cloudflare CSP reports and obtain Adsterra's current publisher CSP allowlist before adding any further domains. Expanding this policy permits additional third-party code or content and should be limited to verified provider origins.

The provider scripts are privileged third-party JavaScript after a visitor opts in. They can make network requests and may set/read cookies or similar technologies through their ad creatives. The privacy page discloses the potential data shared and visitor choice. The site owner must review the applicable law and the ad network's current terms for the audience and configure the Adsterra account to exclude adult/undesired ad categories. The code snippet cannot enforce creative-category restrictions; this integration does not claim that it can.

## Files and verification

- `src/config.mjs`: approved unit IDs, source URLs, banner options, consent key and master switch.
- `scripts/build.mjs`: creates the shared consent controls, emits the config module and inserts only the three mapped slots.
- `public/app.mjs`: consent and preference UI; dynamically imports the loader only after opt-in.
- `public/ad-loader.mjs`: serialized loading, responsive checks and empty/error collapse.
- `public/ads.css`: labeled reserved slots, mobile rules and consent panel.
- `public/_headers`: narrow CSP additions for the submitted host.
- `tests/site.test.mjs`: configuration, IDs, routes, legal-page exclusions and generated output checks; no provider code runs.

Disabling `advertising.enabled` removes slots, consent controls, config output and ad CSS references on the next build.
