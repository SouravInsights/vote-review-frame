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
    const back = ctx.searchParams.back;

    // console.log("reviews data in reviews route:", ctx.state.reviews);
    // console.log("reviewIndex in reviews route:", ctx.state.reviewIndex);

    const vote = ctx.message?.buttonIndex === 1 ? "Up" : "Down";

    // const res = await fetch("http://localhost:3001/vote-review/farcaster", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ reviewId: Number(id), vote: vote, payload: ctx.message }),
    // });
    // console.log("res ok?", res.ok);

    return {
      image: imageUrl(
        <div tw="flex flex-col">
          <Heading>{`Voted ${vote} for review ID ${id}`}</Heading>
        </div>
      ),
      buttons: [
        <Button action="post" target={back}>
          Back
        </Button>,
        <Button action="post" target={`/reviews`}>
          Next review
        </Button>,
      ] as [any, any],
      state: { reviewIndex: ctx.state.reviewIndex + 1 },
    };
  })(req);
};
