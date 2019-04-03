chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({url: 'https://*.spotify.com/*'}, function(tabs) {

    if (tabs.length === 0) {
      chrome.tabs.create({url: 'https://open.spotify.com/'});
    }

    for (var tab of tabs) {
      var code = '';
      switch (command) {
        case 'next':
          code = 'document.querySelector(".spoticon-skip-forward-16").click()';
          break;
        case 'previous':
          code = 'document.querySelector(".spoticon-skip-back-16").click()';
          break;
        case 'play-pause':
          code = '(document.querySelector(".spoticon-pause-16") || document.querySelector(".spoticon-play-16")).click()';
          break;
        case 'save-to-library':
          code = 'document.querySelector(".spoticon-add-16").click()';
          break;
        case 'shuffle':
          code = 'document.querySelector(".spoticon-shuffle-16").click()';
          break;
      }
    }

    if (code.length) {
      chrome.tabs.executeScript(tab.id, {code: code});
    }
  });
});
