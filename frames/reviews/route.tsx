/* eslint-disable react/jsx-key */
import { frames } from "../frames";
import { Button } from "frames.js/next";
import { Heading } from "@/components/frames/heading";
import { imageUrl } from "@/utils/utils";

export const POST = frames(async (ctx) => {
  console.log("reviewIndex in reviews route:", ctx.state.reviewIndex);

  // const response = await fetch("http://localhost:3001/reviews/recent");

  // if (!response.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // const { reviews } = await response.json();

  const reviews = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 3,
    },
  ];
  console.log("reviews data in reviews route:", reviews);

  return {
    image: imageUrl(
      <div tw="flex flex-col">
        <Heading>{`Upvote/Downvote for this review ${reviews[ctx.state.reviewIndex].id}`}</Heading>
      </div>
    ),
    buttons: [
      <Button action="post" target={`/vote-review/${reviews[ctx.state.reviewIndex].id}`}>
        Upvote 👍
      </Button>,
      <Button action="post" target={`/vote-review/${reviews[ctx.state.reviewIndex].id}`}>
        Downvote 👎
      </Button>,
    ] as [any, any],
  };
});
