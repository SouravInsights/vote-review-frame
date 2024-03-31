/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { Heading } from "@/components/frames/heading";
import { frames } from "../frames";
import { imageUrl } from "@/utils/utils";

export const POST = frames(async (ctx) => {
  if (!ctx.message) {
    throw new Error("No message");
  }

  const back = ctx.searchParams.back;

  console.log("reviewIndex in begin route:", ctx.state.reviewIndex);

  // if (reviews.length === 0) {
  //   return {
  //     image: imageUrl(<div>No recent reviews!</div>),
  //     buttons: [
  //       <Button action="post" target="/">
  //         ← Back
  //       </Button>,
  //     ],
  //   };
  // }

  return {
    image: imageUrl(
      <div tw="flex flex-col">
        <Heading>{`We have fetched some recent reviews for you!`}</Heading>
        Let us know your opinion on these reviews!
      </div>
    ),
    buttons: [
      <Button action="post" target={back}>
        ← Back
      </Button>,

      <Button action="post" target={`/reviews`}>
        Begin
      </Button>,
    ] as [any, any],
  };
});
