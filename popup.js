// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
let script = document.getElementById("script");
const input = document.getElementById('sidebar-color');
chrome.storage.sync.get(['color'], function(result) {
  if(result.color) {
    input.textContent = result.color;
  }
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor2,
    args: [result.color]
  });
});
// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

script.addEventListener("click", async (event) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const color = document.querySelector('.sidebar-color').value;
  console.log('color', color);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor2,
    args: [color]
  });
})

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

function setPageBackgroundColor2(color) {
  chrome.storage.sync.set({'color': color}, function() {
    console.log('Value is set to ' + color);
  });
  chrome.storage.sync.get(['color'], function(result) {
    console.log('Value currently is ' + JSON.stringify(result));
    
    document.querySelector('.notion-sidebar').style.backgroundColor = '#' + result.color;
    document.querySelector('.notion-sidebar').style.color = '#fff' 

    document.querySelector('.notion-sidebar').style.fontFamily = 'd2coding';
  });
}