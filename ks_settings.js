const getSettingsFilename = () => {
  return 'settings.json';
};

var attach = function () {
  // Support for settings links.
  document.querySelectorAll('a[data-settings]').forEach(el => el.addEventListener("click", e => {
    changeSetting(e.target);
  }));

  // Support for inputs.
  document.querySelectorAll('input[data-settings]').forEach(el => el.addEventListener("change", e => {
    changeSetting(e.target);
  }));

  // Support for selects.
  document.querySelectorAll('select[data-settings]').forEach(el => el.addEventListener("change", e => {
    changeSetting(e.target);
  }));
}

var changeSetting = function (element) {
  var value = ''
  var name = element.dataset.settings
  if (element.dataset.settings_value) {
    value = element.dataset.settings_value
  }
  else {
    switch (element.tagName) {
      case 'INPUT':
        let type = element.getAttribute('type')
        if (type === 'checkbox') {
          value = element.checked
        }
        else {
          value = element.value
        }
        break;
      case 'SELECT':
        value = element.options[element.selectedIndex].value
        break;
    }
  }
  const store = require('data-store')({ path: process.cwd() + '/' + getSettingsFilename() })
  store.set(name, value);
}

exports.attach = attach;
