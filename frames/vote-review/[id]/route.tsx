/* eslint-disable react/jsx-key */
import { NextRequest } from "next/server";
import { frames } from "../../frames";
import { Button } from "frames.js/next";
import { Heading } from "@/components/frames/heading";
import { imageUrl } from "@/utils/utils";

type Props = {
  params: {
    id: number;
  };
};

export const POST = async (req: NextRequest, { params }: Props) => {
  return frames(async (ctx) => {
    const { id } = params;

    const vote = ctx.message?.buttonIndex === 1 ? "Up" : "Down";
    const votingStatus = vote === "Up" ? "Upvoted" : "Downvoted";

    const res = await fetch("http://localhost:3001/vote-review/farcaster", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviewId: Number(id), vote: vote, payload: ctx.message }),
    });

    if (res.ok) {
      return {
        image: imageUrl(
          <div tw="flex flex-col">
            <Heading>{`You have successfully ${votingStatus} for the review ID ${id}`}</Heading>
          </div>
        ),
        buttons: [
          <Button action="link" target="https://frenreviews.com/reviews">
            Checkout more reviews
          </Button>,
        ] as [any],
      };
    } else {
      return {
        image: imageUrl(
          <div tw="flex flex-col">
            <Heading>{`Voting for the review ID ${id} is unsuccesful!`}</Heading>
          </div>
        ),
        buttons: [
          <Button action="link" target="https://frenreviews.com/reviews">
            Checkout more reviews
          </Button>,
        ] as [any],
      };
    }
  })(req);
};
