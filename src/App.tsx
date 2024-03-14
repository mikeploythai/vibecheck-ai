import { useEffect, useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

type CommentThreads = {
  items: {
    snippet: {
      topLevelComment: {
        id: string;
        snippet: {
          textOriginal: string;
        };
      };
    };
  }[];
};

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

  const fetchUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100&order=relevance&videoId=${videoId}&prettyPrint=true&key=${
    import.meta.env.VITE_YOUTUBE_API_KEY
  }`;

  const { isFetching, isError, data, error, refetch } =
    useQuery<CommentThreads>({
      queryKey: ["comments"],
      queryFn: async () => {
        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error("Couldn't fetch the comments!");
        return res.json();
      },
      refetchOnWindowFocus: false,
      enabled: false,
    });

  if (isError) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {!!videoId.length ? (
        !data ? (
          <button type="button" onClick={() => refetch()}>
            Generate the vibe check!
          </button>
        ) : (
          <ul>
            {data.items.map(
              ({
                snippet: {
                  topLevelComment: { id, snippet },
                },
              }) => (
                <li key={id}>{snippet.textOriginal}</li>
              )
            )}
          </ul>
        )
      ) : (
        "Not a YouTube video."
      )}
    </div>
  );
}

export default App;
