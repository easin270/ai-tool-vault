import { advertising } from './ad-config.mjs';

function waitForCreative(slot, mount) {
  let finish;
  const promise = new Promise(resolve => {
    finish = loaded => {
      observer.disconnect();
      clearTimeout(timer);
      if (loaded) slot.classList.add('ad-slot--loaded');
      else slot.hidden = true;
      resolve();
    };
    const populated = () => {
      const content = [...mount.children].filter(child => child.tagName !== 'SCRIPT');
      return content.some(child => child.matches('iframe,img,video,object,a') || child.querySelector('iframe,img,video,object,a'))
        || mount.textContent.trim().length > 0;
    };
    const observer = new MutationObserver(() => { if (populated()) finish(true); });
    observer.observe(mount, { childList: true, subtree: true, characterData: true });
    const timer = setTimeout(() => finish(populated()), advertising.timeoutMs);
    if (populated()) finish(true);
  });
  return { promise, cancel: () => finish(false) };
}

function appendProviderScript(src, target, { native = false, before = null } = {}) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    if (native) script.setAttribute('data-cfasync', 'false');
    script.onload = resolve;
    script.onerror = () => reject(new Error('Approved ad script failed to load.'));
    if (before) target.insertBefore(script, before);
    else target.append(script);
  });
}

async function loadUnit(slot, type) {
  if (type === 'banner728' && !matchMedia('(min-width: 768px)').matches) return;
  if (type === 'banner300' && !matchMedia('(min-width: 340px)').matches) return;
  const unit = advertising.units[type];
  const mount = type === 'native'
    ? document.getElementById(unit.containerId)
    : slot.querySelector('.ad-unit');
  if (!mount) { slot.hidden = true; return; }

  slot.hidden = false;
  const rendered = waitForCreative(slot, mount);
  try {
    if (type === 'native') {
      await appendProviderScript(unit.src, mount.parentElement, { native: true, before: mount });
    } else {
      // Adsterra's two banner snippets read the same global. Assign options
      // immediately before appending and await execution before the next slot.
      window.atOptions = { ...unit.options, params: { ...unit.options.params } };
      await appendProviderScript(unit.src, mount);
    }
  } catch {
    slot.hidden = true;
    rendered.cancel();
  }
  await rendered.promise;
}

export async function loadApprovedAds() {
  if (!advertising.enabled) return;
  // Sequential execution prevents the 300×250 and 728×90 snippets from
  // overwriting each other's global atOptions settings.
  for (const slot of document.querySelectorAll('[data-ad-slot]')) {
    await loadUnit(slot, slot.dataset.adSlot);
  }
}
