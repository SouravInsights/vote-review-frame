import { farcasterHubContext } from "frames.js/middleware";
import { createFrames, types } from "frames.js/next";

export const frames = createFrames({
  basePath: "/frames",
  middleware: [farcasterHubContext()],
});
