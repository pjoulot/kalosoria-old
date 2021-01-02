// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  document.querySelectorAll('.js-quit').forEach(el => el.addEventListener("click", e => {
    window.close();
  }));


  // Attach options.
  const ksSettings = require('./ks_settings')
  ksSettings.attach()

})
