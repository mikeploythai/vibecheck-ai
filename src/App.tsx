import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const getVideoId = async () => {
      const [tab] = await chrome.tabs.query({ active: true });

      if (tab.url && tab.url.includes("youtube.com/watch")) {
        const url = new URL(tab.url);
        const params = new URLSearchParams(url.search);
        const id = params.get("v")!;
        setVideoId(id);
      }
    };

    getVideoId();
  }, []);

  return <div>{!!videoId.length ? videoId : "Not a YouTube video."}</div>;
}

export default App;
