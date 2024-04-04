/* eslint-disable react/jsx-key */
import { frames } from "../../frames";
import { Button } from "frames.js/next";
import { imageUrl } from "@/utils/utils";
import { Typography } from "@/components/ui/typography";
import StarsRating from "@/components/stars-rating";
import DisplayText from "@/components/display-text";
import { formatReviewDate } from "@/utils/formatting";
import { twMerge } from "tailwind-merge";

const handler = frames(async (ctx) => {
  const lastIndex = ctx.url.pathname.lastIndexOf("/");
  const reviewId = ctx.url.pathname.substring(lastIndex + 1);

  const response = await fetch(`http://localhost:3001/reviews/single-review?reviewId=${reviewId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const review = await response.json();

  // console.log("review:", review);

  return {
    image: imageUrl(
      <div tw="flex flex-col px-6">
        {/* <StarsRating rating={review.rating} /> */}

        <Typography variant="small" tw="inline">
          {formatReviewDate(review.createdAt)}
        </Typography>

        <Typography>{review.description}</Typography>
      </div>
    ),
    buttons: [
      <Button action="post" target={`/vote-review/${reviewId}`}>
        Good review 👍
      </Button>,
      <Button action="post" target={`/vote-review/${reviewId}`}>
        Bad review 👎
      </Button>,
    ] as [any, any],
  };
});

export const GET = handler;
export const POST = handler;
