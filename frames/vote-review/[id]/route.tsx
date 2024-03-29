import { NextRequest } from "next/server";
import { frames } from "../../frames";
import { getFrame, getFrameMessage } from "frames.js";
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
    const back = ctx.searchParams.back;
    console.log("ctx.message:", ctx.message);

    const { id } = params;

    const vote = ctx.message.buttonIndex === 1 ? "Up" : "Down";

    const res = await fetch("http://localhost:3001/vote-review/farcaster", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviewId: Number(id), vote: vote, payload: ctx.message }),
    });
    console.log("res ok?", res.ok);

    if (res.ok) {
      return {
        image: imageUrl(
          <div tw="flex flex-col">
            <Heading>{`Voted ${vote} for review ID ${id}`}</Heading>
          </div>
        ),
        buttons: [
          <Button key={1} action="post" target={back}>
            Back
          </Button>,
          <Button key={2} action="post" target={`/reviews/${ctx.reviews[1].id}`}>
            Next review
          </Button>,
        ] as [any, any],
      };
    } else {
      return {
        image: imageUrl(
          <div tw="flex flex-col">
            <Heading>{`Voting failed for review ID ${id}`}</Heading>
          </div>
        ),
        buttons: [
          <Button key={3} action="post" target={back}>
            Back
          </Button>,
          <Button key={4} action="post" target={`/reviews/${ctx.reviews[0].id}`}>
            Try again
          </Button>,
        ] as [any, any],
      };
    }
  })(req);
};
