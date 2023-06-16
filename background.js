var blockedDomains = [];
var blockEnabled = false;

function updateBlockedDomains() {
  chrome.storage.sync.get('blockedSites', function (data) {
    blockedDomains = data.blockedSites || [];
  });
}

function updateBlockEnabled() {
  chrome.storage.sync.get('blockEnabled', function (data) {
    blockEnabled = data.blockEnabled || false;
  });
}

function isBlockedURL(url) {
  for (var i = 0; i < blockedDomains.length; i++) {
    if (url.match(blockedDomains[i])) {
      return true;
    }
  }
  return false;
}

function redirectBlockedURL(details) {
  if (isBlockedURL(details.url) && blockEnabled) {
    return { redirectUrl: chrome.extension.getURL("blocked.html") };
  } else {
    return { cancel: false };
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  redirectBlockedURL,
  { urls: ["<all_urls>"] },
  ["blocking"]
);

updateBlockedDomains();
updateBlockEnabled();
chrome.storage.onChanged.addListener(function(changes) {
  if (changes.blockedSites) {
    updateBlockedDomains();
  }
  if (changes.blockEnabled) {
    updateBlockEnabled();
  }
});
