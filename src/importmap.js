function isLocalNetwork(hostname = window.location.hostname) {
  return (
    ["localhost", "127.0.0.1", "", "::1"].includes(hostname) ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.0.") ||
    hostname.endsWith(".local")
  );
}

const importMap = {
  imports: {
    "vue": isLocalNetwork()
      ? "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
      : "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js",
    "vue-i18n": isLocalNetwork()
      ? "https://unpkg.com/vue-i18n@9/dist/vue-i18n.esm-browser.js"
      : "https://unpkg.com/vue-i18n@9/dist/vue-i18n.esm-browser.prod.js",
  },
};

const im = document.createElement("script");
im.type = "importmap";
im.textContent = JSON.stringify(importMap);
document.currentScript.after(im);
