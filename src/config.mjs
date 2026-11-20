export const site = { name: 'AI Tool Vault', url: process.env.SITE_URL || '', contactEmail: process.env.CONTACT_EMAIL || '' };
// Deliberately inert: no ad loader or vendor code exists in V1.
export const advertising = Object.freeze({ enabled: false, display: false, native: false, socialBar: false, smartlink: false, popunder: false, interstitial: false });
