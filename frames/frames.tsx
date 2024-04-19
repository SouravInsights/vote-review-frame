import { farcasterHubContext } from "frames.js/middleware";
import { createFrames } from "frames.js/next";

export const frames = createFrames({
  baseUrl: `${process.env.NEXT_PUBLIC_HOST}/frames`,
  middleware: [farcasterHubContext()],
});
