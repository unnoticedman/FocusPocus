document.addEventListener('DOMContentLoaded', function () {
    var blockedSitesForm = document.getElementById('blocked-sites-form');
    var siteInput = document.getElementById('site-input');
    var siteList = document.getElementById('site-list');
    var toggleBlockButton = document.getElementById('toggle-block-button');
  
    // Cargar sitios web bloqueados desde almacenamiento
    chrome.storage.sync.get('blockedSites', function (data) {
      if (data.blockedSites) {
        data.blockedSites.forEach(function (site) {
          addBlockedSiteToList(site);
        });
      }
    });
  
    blockedSitesForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var site = siteInput.value.trim();
      if (site) {
        chrome.storage.sync.get('blockedSites', function (data) {
          var blockedSites = data.blockedSites || [];
          if (!blockedSites.includes(site)) {
            blockedSites.push(site);
            chrome.storage.sync.set({ blockedSites: blockedSites }, function () {
              addBlockedSiteToList(site);
              siteInput.value = '';
            });
          } else {
            alert('El sitio ya está bloqueado.');
          }
        });
      }
    });
  
    siteList.addEventListener('click', function (e) {
      if (e.target.classList.contains('delete-button')) {
        var li = e.target.closest('li');
        var site = li.querySelector('.site-name').textContent;
        chrome.storage.sync.get('blockedSites', function (data) {
          var blockedSites = data.blockedSites || [];
          var index = blockedSites.indexOf(site);
          if (index !== -1) {
            blockedSites.splice(index, 1);
            chrome.storage.sync.set({ blockedSites: blockedSites }, function () {
              li.remove();
            });
          }
        });
      }
    });
  
    toggleBlockButton.addEventListener('click', function () {
      chrome.storage.sync.get('blockEnabled', function (data) {
        var blockEnabled = data.blockEnabled || false;
        blockEnabled = !blockEnabled;
        chrome.storage.sync.set({ blockEnabled: blockEnabled }, function () {
          updateToggleButtonText(blockEnabled);
        });
      });
    });
  
    function addBlockedSiteToList(site) {
      var li = document.createElement('li');
      li.innerHTML = `
        <span class="site-name">${site}</span>
        <button class="delete-button">Eliminar</button>
      `;
      siteList.appendChild(li);
    }
  
    function updateToggleButtonText(blockEnabled) {
      toggleBlockButton.textContent = blockEnabled ? 'Desactivar bloqueo' : 'Activar bloqueo';
    }
  
    chrome.storage.sync.get('blockEnabled', function (data) {
      var blockEnabled = data.blockEnabled || false;
      updateToggleButtonText(blockEnabled);
    });
  });
  