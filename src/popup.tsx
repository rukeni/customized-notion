import { Client } from '@notionhq/client';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Popup = () => {
  const [count, setCount] = useState(0);
  const [checkedBackground, setCheckedBackground] = useState(false);
  const [sidebarBackground, setSidebarBackground] = useState('#fff')
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
            color: '#555555',
          },
          (msg) => {
            console.log('result message:', msg);
          },
        );
      }
    });
    chrome.bookmarks.getTree((data) => {
      console.log('data', data);
    });
  };

  const handleNotion = async () => {
    // chrome.tabs.create({ url: "https://notion.so" });
    // change notion sidebar color
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const notion = new Client({
      auth: 'secret_RrM6VGLjZE2K9kXfbWqtcxRQyVhoutGlZhAQNui7nxL',
    });

    const alertFn = () => {
      console.log('alertFn');
      document.body.style.background = 'orange';
    };

    await chrome.scripting?.executeScript(
      {
        target: { tabId: tab.id },
        func: alertFn,
      },
      () => {
        document.body.style.background = 'blue';
      },
    );
  };

  return (
    <>
      <ul style={{ minWidth: '700px' }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <button
        onClick={() => setCount(count + 1)}
        style={{ marginRight: '5px' }}
      >
        count up
      </button>
      <button onClick={changeBackground}>change background</button>
      <button className='btn' onClick={handleNotion}>
        커스텀 노션
      </button>
      <div className='form-control w-[500px]'>
        <label className='label cursor-pointer'>
          <span className='label-text'>배경색 변경</span>
          <input type='checkbox' className='toggle toggle-primary' checked={checkedBackground} onChange={() => setCheckedBackground(!checkedBackground)} />
        </label>
        {checkedBackground === true && (
            <div className="flex w-full">
            <label className="label">
              <span className="label-text">사이드바 배경색상</span>
            </label>
            <input type="text" placeholder="사이드바 색상입력" className="input input-bordered w-full max-w-xs" value={sidebarBackground} onChange={event => {
              if(event.target.value.indexOf('#') === -1) {
                return setSidebarBackground('#' + event.target.value)
              }
              return setSidebarBackground(event.target.value)
            }} />
            <input type="color" placeholder="사이드바 색상입력" className="input input-bordered w-full max-w-xs" value={sidebarBackground} onChange={event => setSidebarBackground(event.target.value)} />
            <label className="label">
            </label>
          </div>
          )}
      </div>
      <>
        {/* buttons */}
        <div className='m-4'>
          <button className='btn btn-primary'>primary</button>
          <button className='btn btn-secondary'>secondary</button>
          <button className='btn btn-accent'>accent</button>
        </div>
        {/* same buttons with another theme! */}
        <div className='m-4' data-theme='valentine'>
          <button className='btn btn-primary'>primary</button>
          <button className='btn btn-secondary'>secondary</button>
          <button className='btn btn-accent'>accent</button>
        </div>
        {/* tab */}
        <div className='m-4 tabs'>
          <button className='tab tab-lifted'>Tab 1</button>
          <button className='tab tab-lifted tab-active'>Tab 2</button>
          <button className='tab tab-lifted'>Tab 3</button>
        </div>
        {/* toggle */}
        <div className='m-4'>
          <input type='checkbox' className='toggle toggle-primary' />
          <input type='checkbox' className='toggle toggle-secondary' />
          <input type='checkbox' className='toggle toggle-accent' />
        </div>
        {/* card */}
        <div className='card shadow-2xl w-80 m-4'>
          <figure>
            <img src='https://picsum.photos/id/1005/500/250' />
          </figure>
          <div className='card-body'>
            <h2 className='card-title'>DaisyUI Card</h2>
            <p>
              Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.
              Sit sit necessitatibus.
            </p>
          </div>
        </div>
        {/* dropdown */}
        <div className='dropdown m-4'>
          <div tabIndex={0} className='m-1 btn'>
            Dropdown
          </div>
          <ul
            tabIndex={0}
            className='p-2 menu dropdown-content bg-neutral text-neutral-content rounded-box w-52'
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        {/* modal button */}
        <label htmlFor='my-modal' className='btn modal-button'>
          Modal
        </label>
        {/* modal content */}
        <input type='checkbox' id='my-modal' className='modal-toggle' />
        <div className='modal'>
          <div className='modal-box'>
            <p>
              Enim dolorem dolorum omnis atque necessitatibus. Consequatur aut
              adipisci qui iusto illo eaque. Consequatur repudiandae et. Nulla
              ea quasi eligendi. Saepe velit autem minima.
            </p>
            <div className='modal-action'>
              <label htmlFor='my-modal' className='btn'>
                Close
              </label>
            </div>
          </div>
        </div>
        {/* steps */}
        <ul className='steps my-4 w-full'>
          <li className='step step-primary'>Register</li>
          <li className='step step-primary'>Choose plan</li>
          <li className='step'>Purchase</li>
          <li className='step'>Receive Product</li>
        </ul>
        {/* avatar */}
        <div className='avatar online m-10'>
          <div className='rounded-full w-24 h-24'>
            <img src='http://daisyui.com/tailwind-css-component-profile-1@94w.png' />
          </div>
        </div>
        <div className='avatar offline m-10'>
          <div className='rounded-full w-24 h-24'>
            <img src='http://daisyui.com/tailwind-css-component-profile-2@94w.png' />
          </div>
        </div>
        {/* see all components: https://daisyui.com/components/button */}
      </>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root'),
);
