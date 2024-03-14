<h1 align="center">vibecheck.ai</h1>

<div align="center">
  <img src="https://github.com/mikeploythai/vibe-check/assets/110638329/bc052cae-9e42-4a12-a033-34e3b00f0314" />
</div>

***

This is an extension for Chromium-based browsers that uses Google's Gemini Pro LLM and the YouTube Data API to assess the vibes of a YouTube video based on its comment section. Great for quickly figuring out if the video is worth your time!

All you gotta do is activate the extension while on a video page, press the "Generate a vibe check!" button, and let Gemini assess the vibes for you.

Built using `create-vite-app` (React, TypeScript, SWC).

#### Resources

- [Google Gemini API Quickstart](https://ai.google.dev/tutorials/node_quickstart)
- [YouTube Data API `commentThreads: list` Docs](https://developers.google.com/youtube/v3/docs/commentThreads/list)
- [Google Manifest File Format](https://developer.chrome.com/docs/extensions/reference/manifest)

#### 🚨 NOT PRODUCTION READY CODE

I made this for fun just to play around with an LLM and to learn how to make Chrome extensions. To use this in a production setting, the code must be refactored in order to protect the API keys from leaking to the client. Refer to the `.env.example` file for more details.
