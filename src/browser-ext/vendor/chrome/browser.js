/*
  ZaDark – Zalo Dark Mode
  Chrome Extension
  Made by NCDAi Studio

  ! This file must use VanillaJS
*/

;(function (window) {
  window.zadark = window.zadark || {}

  window.zadark.browser = {
    name: 'Chrome',

    initClassNames: () => {
      document.body.classList.add('zadark', 'zadark-web', 'zadark-chrome')
    },

    getManifest: () => {
      return chrome.runtime.getManifest()
    },

    getExtensionSettings: () => {
      return new Promise((resolve, reject) => {
        chrome.storage.sync.get({
          themeMode: 'custom',
          customTheme: 'dark',
          isReceiveUpdateNoti: true
        }, (items) => {
          resolve(items)
        })
      })
    },

    saveExtensionSettings: (items) => {
      return chrome.storage.sync.set(items)
    },

    executeScript: (tabId, file) => {
      chrome.scripting.executeScript({
        target: { tabId },
        files: [file]
      })
    },

    getZaloTabs: async () => {
      const tabs = await chrome.tabs.query({
        url: ['*://chat.zalo.me/*'],
        currentWindow: true
      })
      return tabs
    },

    createTab: ({ url }) => {
      chrome.tabs.create({ url })
    },

    getEnabledBlockingRuleIds: async () => {
      const rulesetIds = await chrome.declarativeNetRequest.getEnabledRulesets()
      return rulesetIds
    },

    updateEnabledBlockingRuleIds: ({ enableRuleIds = [], disableRuleIds = [] }) => {
      return chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: enableRuleIds,
        disableRulesetIds: disableRuleIds
      })
    }
  }
})(window)
