import * as huggingsiteParams from '@params';

const browserLocalStorageKey = huggingsiteParams.browserLocalStorageKey;
const toggleTheme = () => {
   const html = document.documentElement;
   const preferred = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
   const opposite = preferred === "dark" ? "light" : "dark";
   const isAuto = html.dataset.themeAuto === "true";
   const current = html.dataset.theme;
   console.log("Toggle");
   let nextScheme;
   let nextAuto;

   if (isAuto) {
      // state 1 → 2
      nextScheme = opposite;
      nextAuto = false;
   } else if (current === opposite) {
      // state 2 → 3
      nextScheme = preferred;
      nextAuto = false;
   } else {
      // state 3 → 1
      nextScheme = preferred;
      nextAuto = true;
   }

   if (nextAuto) {
      window.localStorage?.removeItem(browserLocalStorageKey);
   } else {
      window.localStorage?.setItem(browserLocalStorageKey, nextScheme);
   }


   html.dataset.theme = nextScheme;
   html.dataset.themeAuto = String(nextAuto);
   nextAuto && (nextScheme === preferred) ? window.localStorage?.removeItem(browserLocalStorageKey) : window.localStorage?.setItem(browserLocalStorageKey, nextScheme);
};
document.getElementById("theme-toggle")?.addEventListener("click", (e) => {
   e.preventDefault();
   toggleTheme();
}, false);

// react to browser based changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
   const html = document.documentElement;
   if (html.dataset.themeAuto !== "true") return;
   const preferred = e.matches ? "dark" : "light";
   html.dataset.theme = preferred;
   html.style.colorScheme = preferred;
});
