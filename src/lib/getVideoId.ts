async function getVideoId(setVideoId: (videoId: string) => void) {
  const [tab] = await chrome.tabs.query({ active: true });

  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const url = new URL(tab.url);
    const params = new URLSearchParams(url.search);
    const id = params.get("v")!;
    setVideoId(id);
  }
}

export default getVideoId;
