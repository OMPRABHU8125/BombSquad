export const isPWA = (): boolean => {
  // 1️⃣ Standard display-mode check (Chrome, Android)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }

  // 2️⃣ iOS Safari PWA
  // @ts-ignore
  if (window.navigator.standalone === true) {
    return true;
  }

  // 3️⃣ Launched from installed app (Android intent)
  if (document.referrer.startsWith('android-app://')) {
    return true;
  }

  // 4️⃣ Persisted flag (most reliable)
  if (localStorage.getItem('isPWA') === 'true') {
    return true;
  }

  return false;
};
