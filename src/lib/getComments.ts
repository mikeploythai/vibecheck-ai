import { useQuery } from "@tanstack/react-query";

type Threads = {
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

function getComments(videoId: string) {
  const fetchUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&order=relevance&videoId=${videoId}&prettyPrint=true&key=${
    import.meta.env.VITE_YOUTUBE_API_KEY
  }`;

  return useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await fetch(fetchUrl);
      if (!res.ok) throw new Error("Couldn't fetch the comments!");

      const threads: Threads = await res.json();
      return threads.items.map(
        ({
          snippet: {
            topLevelComment: { id, snippet },
          },
        }) => ({ id, comment: snippet.textOriginal })
      );
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });
}

export default getComments;
