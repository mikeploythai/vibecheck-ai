import "./App.css";

import { useEffect, useState } from "react";
import getComments from "./lib/getComments";
import getVideoId from "./lib/getVideoId";
import getVibeCheck from "./lib/getVibeCheck";
import reactLogo from "./assets/react.svg";

function App() {
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    getVideoId(setVideoId);
  }, []);

  const {
    isFetching: isFetchingComments,
    data: comments,
    refetch: fetchComments,
  } = getComments(videoId);

  const {
    isFetching: isFetchingVibes,
    data: vibeCheck,
    refetch: fetchVibeCheck,
  } = getVibeCheck(JSON.stringify(comments));

  useEffect(() => {
    if (!!comments?.length) fetchVibeCheck();
  }, [comments]);

  if (!videoId.length) {
    return (
      <div>
        <p>Not a YouTube video.</p>
      </div>
    );
  }

  if (isFetchingComments || isFetchingVibes) {
    return (
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
        <p>
          <em>Generating vibe check...</em>
        </p>
      </div>
    );
  }

  return (
    <div>
      {!vibeCheck?.length ? (
        <button type="button" onClick={() => fetchComments()}>
          Generate a vibe check!
        </button>
      ) : (
        <p>{vibeCheck}</p>
      )}
    </div>
  );
}

export default App;
