export const site = { name: 'AI Tool Vault', url: process.env.SITE_URL || '', contactEmail: process.env.CONTACT_EMAIL || '' };
// Approved units. Each unit is placed once per page; the vendor's iframe
// units share a global atOptions and are loaded sequentially.
// The fixed Native Banner container is limited to one instance per page.
export const advertising = Object.freeze({
  enabled: true,
  timeoutMs: 12000,
  units: Object.freeze({
    native: Object.freeze({ src: 'https://bauval.org/21/64b65d6d0319ac6838047615c5ff2c35', containerId: 'container-64b65d6d0319ac6838047615c5ff2c35' }),
    banner300: Object.freeze({ src: 'https://bauval.org/22/53aca722bf5f1e1998b9e321a465dc78', options: Object.freeze({ key: '53aca722bf5f1e1998b9e321a465dc78', format: 'iframe', height: 250, width: 300, params: Object.freeze({}) }) }),
    banner728: Object.freeze({ src: 'https://bauval.org/22/35b882ceb77fce88e64c3838111a1309', options: Object.freeze({ key: '35b882ceb77fce88e64c3838111a1309', format: 'iframe', height: 90, width: 728, params: Object.freeze({}) }) }),
  }),
});
