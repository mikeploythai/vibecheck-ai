import { GoogleGenerativeAI } from "@google/generative-ai";
import { useQuery } from "@tanstack/react-query";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function getVibeCheck(comments: string) {
  return useQuery({
    queryKey: ["ai"],
    queryFn: async () => {
      const model = ai.getGenerativeModel({ model: "gemini-pro" });
      const completion =
        await model.generateContent(`You will be provided a JSON array delimited by triple quotes that consists of a YouTube video's comments. Based on the comments, provided by the "comment" property of each item in the array, you must summarize the vibes of the YouTube video's comments section in 30 words. For example, "The YouTube comments section thinks this video is good and informative, but desires for their cat to appear more often!"
      
        '''${comments}'''`);

      return completion.response.text();
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });
}

export default getVibeCheck;
