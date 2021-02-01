const getSettingsFilename = () => {
  return 'settings.json';
};

const getLinkActiveClass = () => {
  return 'active';
};

var attach = function () {
  // Support for settings links.
  document.querySelectorAll('a[data-settings]').forEach(el => {
    setElementValue(el, getSetting(el.dataset.settings))
    el.addEventListener("click", e => {
      changeSetting(e.target);
    })
  });

  // Support for inputs.
  document.querySelectorAll('input[data-settings]').forEach(el => {
    setElementValue(el, getSetting(el.dataset.settings))
    el.addEventListener("change", e => {
      changeSetting(e.target);
    })
  });

  // Support for selects.

  document.querySelectorAll('select[data-settings]').forEach(el => {
    setElementValue(el, getSetting(el.dataset.settings))
    el.addEventListener("change", e => {
      changeSetting(e.target);
    })
  });
}

var getSetting = function (name) {
  const store = require('data-store')({ path: process.cwd() + '/' + getSettingsFilename() })
  return store.get(name);
}

var setSetting = function (name, value) {
  const store = require('data-store')({ path: process.cwd() + '/' + getSettingsFilename() })
  return store.set(name, value);
}

var setElementValue = function (element, value) {
  if (element.dataset.settings_value) {
    if (element.dataset.settings_value == value) {
      element.classList.add(getLinkActiveClass());
    }
    else {
      element.classList.remove(getLinkActiveClass());
    }
  }
  else {
    switch (element.tagName) {
      case 'INPUT':
        let type = element.getAttribute('type')
        if (type === 'checkbox') {
          element.checked = value
        }
        else {
          element.value = value
        }
        break;
      case 'SELECT':
        element.value = value
        break;
    }
  }
}

var changeSetting = function (element) {
  var value = ''
  var name = element.dataset.settings
  if (element.dataset.settings_value) {
    value = element.dataset.settings_value
    // Update status.
    document.querySelectorAll('[data-settings="' + element.dataset.settings + '"]').forEach(el => {
      setElementValue(el, value)
    })
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
  setSetting(name, value);
}

exports.attach = attach;
