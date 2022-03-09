import { Client } from "@notionhq/client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();

  useEffect(() => {
    chrome.action.setBadgeText({ text: count.toString() });
  }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: "#555555",
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
    chrome.bookmarks.getTree(data => {
      console.log('data', data)
    })
  };

  const handleNotion = async () => {
    // chrome.tabs.create({ url: "https://notion.so" });
    // change notion sidebar color
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const notion = new Client({
      auth: 'secret_RrM6VGLjZE2K9kXfbWqtcxRQyVhoutGlZhAQNui7nxL',
    });

    const alertFn = () => {
      console.log('alertFn')
      document.body.style.background = 'orange';
    }

    await chrome.scripting?.executeScript({
      target: {tabId : tab.id},
      func: alertFn
    }, () => {
      document.body.style.background = 'blue';
    })
  }

  return (
    <>
      <ul style={{ minWidth: "700px" }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <button
        onClick={() => setCount(count + 1)}
        style={{ marginRight: "5px" }}
      >
        count up
      </button>
      <button onClick={changeBackground}>change background</button>
      <button className='btn' onClick={handleNotion}>커스텀 노션</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
