/** Record outcomes only; player-entered letters and words stay in the browser. */
export function trackToolEvent(name: string, values: Record<string, number | string> = {}) {
  const client = window as Window & {
    gtag?: (command: string, name: string, params: Record<string, number | string>) => void;
  };
  client.gtag?.("event", name, values);
}

const sessionMemory = new Map<string, string>();

export function rememberFirst(key: string, value: string) {
  const storageKey = "wordlehint.tools." + key;
  let previous = sessionMemory.get(storageKey);
  try {
    previous = sessionStorage.getItem(storageKey) ?? previous;
    if (!previous) sessionStorage.setItem(storageKey, value);
  } catch {
    /* Private browsing can disable session storage. */
  }
  sessionMemory.set(storageKey, previous ?? value);
  return previous;
}

export function trackToolOnce(name: string) {
  if (!rememberFirst(name, "1")) trackToolEvent(name);
}
