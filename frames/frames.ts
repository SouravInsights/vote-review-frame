import { farcasterHubContext } from "frames.js/middleware";
import { createFrames, types } from "frames.js/next";

const reviewsMiddleware: types.FramesMiddleware<any, { reviews: any[] }> = async (ctx, next) => {
  const response = await fetch("http://localhost:3001/reviews/recent");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return next({ reviews: data.reviews });
};

type State = {
  reviewIndex: number;
};

export const frames = createFrames<State>({
  basePath: "/frames",
  initialState: {
    reviewIndex: 0,
  },
  middleware: [reviewsMiddleware, farcasterHubContext()],
});
