import { Button, FrameDefinition, types } from "frames.js/next";
import { Heading } from "@/components/frames/heading";
import { frames } from "../frames";
import { imageUrl } from "@/utils/utils";

export const POST = frames(async (ctx: FrameDefinition) => {
  if (!ctx.message) {
    throw new Error("No message");
  }

  const back = ctx.searchParams.back;

  console.log("ctx.reviews:", ctx.reviews);

  console.log("currentReviewIndex in begin route:", ctx.currentReviewIndex);
  const startButtonTarget = `/reviews/${ctx.reviews[ctx.currentReviewIndex].id}`;
  console.log("startButtonTarget:", startButtonTarget);

  if (ctx.reviews.length === 0) {
    return {
      image: imageUrl(<div>No recent reviews!</div>),
      buttons: [
        <Button key={ctx.reviews.id} action="post" target="/">
          ← Back
        </Button>,
      ],
    };
  }

  return {
    image: imageUrl(
      <div tw="flex flex-col">
        <Heading>{`We have fetched ${ctx.reviews.length} for you!`}</Heading>
        Let us know your opinion on these reviews!
      </div>
    ),
    buttons: [
      <Button key={1} action="post" target={back}>
        ← Back
      </Button>,

      <Button key={2} action="post" target={startButtonTarget}>
        Begin
      </Button>,
    ] as [any, any],
  };
});
