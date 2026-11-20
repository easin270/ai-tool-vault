# Future advertising integration — disabled in V1

The single configuration is `advertising` in `src/config.mjs`. Its master switch and all format switches are false. The object is frozen, is not shipped as a loader, and no template emits an ad container. There are no vendor scripts, account IDs, dummy placements, tracking requests, affiliate links, redirects or empty boxes.

Supported future configuration names: `display`, `native`, `socialBar`, `smartlink`, `popunder`, `interstitial`. These are reserved switches, not an implemented vendor integration. No credentials belong in source or browser code.

After explicit owner approval and vendor approval, an implementer should:

1. Confirm the approved placement formats and obtain actual vendor-provided code from the owner's account. Do not guess IDs or script URLs.
2. Add an isolated adapter module and import it only when the master switch and a specific format are enabled. Preserve false defaults. Restrict any new CSP origins to those actually required by reviewed vendor code.
3. Create containers only for enabled, approved placements. Use an unmistakable “Advertisement” label. Never make an ad look like a calculator result, navigation or a required quiz step. Keep placement dimensions stable when enabled, and remove failed/empty placements without leaving blank gaps.
4. Review privacy disclosures, provider data practices and any applicable consent requirements before requests can be sent. Do not describe the site as ad-free after activation; update the shared footer and policy pages.
5. Keep Smartlink strictly optional and explicitly labeled as advertising. Never auto-navigate, substitute content links or require ad clicks to access resources. Keep popunder and interstitial false by default; do not wire them to general page clicks or necessary actions.
6. Test disabled mode for zero requests and zero containers, and enabled mode for keyboard access, layout shifts, mobile usability and vendor failures. Content and navigation must work if the adapter is blocked or throws.
7. Provide a single master kill switch that removes loading entirely on the next build. Document rollout and rollback before enabling.

No part of this document authorizes activation, deployment or vendor account changes. The user explicitly reserved those decisions.
