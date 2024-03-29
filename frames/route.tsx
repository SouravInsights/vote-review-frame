import { Button } from "frames.js/next";
import { imageUrl } from "@/utils/utils";
import { frames } from "./frames";
import { Heading } from "@/components/frames/heading";

const handler = frames(async (ctx) => {
  //console.log("frames:", frames);
  //console.log("ctx.reviews from main route:", ctx.reviews);
  return {
    image: imageUrl(
      <div tw="flex flex-col">
        <Heading>FrenReviews Vote Review</Heading>
        <div tw="flex">Your opinion matters to us. Upvote/downvote these recent reviews!</div>
      </div>
    ),
    buttons: [
      <Button key="1" action="post" target="/begin">
        {`Let's begin`}
      </Button>,
    ],
  };
});

export const GET = handler;
export const POST = handler;
