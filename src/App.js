import React , {useState, useEffect} from 'react';
import './App.css';
const styles = {
  container: {
    width: 500
  }
}
function App() {
  const [url, setUrl] = useState(null);
  const [download, setDownload] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.tabs.getSelected(null, function(tab){
      setUrl(tab.url)
      if(url && url.match(/fshare/)) {
      // eslint-disable-next-line no-undef
      chrome.tabs.executeScript(tab.id, {code: "document.cookie"}, function(response) {
          const cookie = response[0];
          // fetch("https://www.fshare.vn/download/get", {"credentials":"include","headers":{
            // "accept":"*/*","accept-language":"en-AU,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,en-GB;q=0.6,en-US;q=0.5","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded; charset=UTF-8","pragma":"no-cache","sec-fetch-mode":"cors","sec-fetch-site":"same-origin","x-csrf-token":"1qDx1JB3Z4PnkmFoCuZ-GIK9zbGbKgeDDBzczFUGXNDgmLiD9CIs4LH4BVs_0QpC-oy16O8YNfR4Xa6IHmgFkg==","x-requested-with":"XMLHttpRequest"},"referrer":"https://www.fshare.vn/file/RNQFMLSWYU2FP3W?token=1578715206","referrerPolicy":"no-referrer-when-downgrade","body":"_csrf-app=1qDx1JB3Z4PnkmFoCuZ-GIK9zbGbKgeDDBzczFUGXNDgmLiD9CIs4LH4BVs_0QpC-oy16O8YNfR4Xa6IHmgFkg%3D%3D&linkcode=RNQFMLSWYU2FP3W&withFcode5=0&fcode=","method":"POST","mode":"cors"});

          // eslint-disable-next-line no-undef
          chrome.tabs.executeScript(tab.id, {file: "content.js"}, function(res) {
            const data= res[0]
            const body = `_csrf-app=${encodeURIComponent(data["_csrf-app"])}&linkcode=${data.linkcode}&withFcode5=0&fcode=`;
            console.log("fetch send", body)
            console.log("data", data)
            console.log("cookie", cookie)
            fetch('https://www.fshare.vn/download/get', {
              mode: "no-cors",
              method: 'POST',
              credentials: "include",
              headers: {
                referer: tab.url,
                "x-csrf-token": data["_csrf-app"],
                "content-type":"application/x-www-form-urlencoded; charset=UTF-8",
                cookie,
              },
              body
            })
            .then((response) => {
              console.log(response)
              return response.text();
            })
            .then((myJson) => {
              console.log("response: ",myJson);
              setDownload(JSON.parse(myJson));
            });
          });
      });
    }
  });
   
  }, [url])
  return (
    <div className="App" styles={styles.container}>
      URL: {url}
      <hr/>
      INFO: <br/>
      {download && 
        <textarea rows="10" value={download.url}></textarea>
      }
    </div>
  );
}

export default App;
