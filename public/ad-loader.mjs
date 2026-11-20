import { advertising } from './ad-config.mjs';

function waitForCreative(slot, mount, type) {
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
      const frames = [...mount.querySelectorAll('iframe')];
      const frameReady = frames.some(frame => {
        const source = frame.getAttribute('src');
        return Boolean(source && source !== 'about:blank');
      });
      // Adsterra creates an empty about:blank iframe before it has an ad.
      // Do not mistake that placeholder (or transient fallback markup) for
      // a banner; keep atOptions unchanged until a real frame URL is assigned.
      if (type !== 'native') return frameReady;
      const content = [...mount.children].filter(child => child.tagName !== 'SCRIPT');
      return frameReady || content.some(child => child.matches('img,video,object,a') || child.querySelector('img,video,object,a'))
        || mount.textContent.trim().length > 0;
    };
    const observedFrames = new WeakSet();
    const observer = new MutationObserver(() => {
      for (const frame of mount.querySelectorAll('iframe')) {
        if (observedFrames.has(frame)) continue;
        observedFrames.add(frame);
        frame.addEventListener('load', () => { if (populated()) finish(true); });
      }
      if (populated()) finish(true);
    });
    observer.observe(mount, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['src'] });
    const timer = setTimeout(() => finish(populated()), advertising.timeoutMs);
    if (populated()) finish(true);
  });
  return { promise, cancel: () => finish(false) };
}

function appendProviderScript(src, target, { native = false, before = null } = {}) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    // Preserve the supplied snippets' execution modes: Native is async, while
    // classic banner code is blocking and reads atOptions as soon as it runs.
    // Dynamically inserted banner scripts with async=false retain ordered
    // execution while the loader waits for each unit before continuing.
    script.async = native;
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
  const rendered = waitForCreative(slot, mount, type);
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
