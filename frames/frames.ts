import { farcasterHubContext } from "frames.js/middleware";
import { createFrames, types } from "frames.js/next";

const reviewsMiddleware: types.FramesMiddleware<any, { reviews: any[] }> = async (ctx, next) => {
  try {
    const response = await fetch("http://localhost:3001/reviews/recent");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return next({ reviews: data.reviews });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};

// This middleware is used to update the currentReviewIndex value in the context and making it accessible across routes.
export const updateReviewIndexMiddleware: types.FramesMiddleware<any, any> = async (ctx, next) => {
  let currentReviewIndex = ctx.currentReviewIndex ?? 0;

  const updatedCtx = {
    ...ctx,
    currentReviewIndex,
  };

  return next(updatedCtx);
};

export const frames = createFrames({
  basePath: "/frames",
  middleware: [reviewsMiddleware, farcasterHubContext(), updateReviewIndexMiddleware],
});
