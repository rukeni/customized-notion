function polling() {
  // console.log("polling");
  setTimeout(polling, 1000 * 30);
}

polling();

function injectedFunction() {
  document.body.style.backgroundColor = 'orange';
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: injectedFunction
  });
});