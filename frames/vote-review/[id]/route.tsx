/* eslint-disable react/jsx-key */
import { NextRequest } from "next/server";
import { frames } from "../../frames";
import { Button } from "frames.js/next";
import { Heading } from "@/components/frames/heading";
import { API_URL } from "@/config/constants";

type Props = {
  params: {
    id: number;
  };
};

export const POST = async (req: NextRequest, { params }: Props) => {
  return frames(async (ctx) => {
    console.log("vote review endpoint is called");
    const { id } = params;
    console.log("id:", id);

    console.log("ctx message:", ctx.message);

    const vote = ctx.message?.buttonIndex === 1 ? "Up" : "Down";
    console.log("vote:", vote);

    const votingStatus = vote === "Up" ? "Upvoted" : "Downvoted";
    console.log("votingStatus:", votingStatus);

    const res = await fetch(`${API_URL}/vote-review/farcaster`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviewId: Number(id), vote: vote, payload: ctx.message }),
    });

    console.log("res from vote-review route:", res);

    if (res.ok) {
      console.log("res.ok block is executed");
      return {
        image: (
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
      console.log("else block is executed");
      return {
        image: (
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
