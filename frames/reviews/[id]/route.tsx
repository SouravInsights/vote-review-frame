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
    const { id } = params;

    console.log("ctx.reviews:", ctx.reviews);

    const response = await fetch(
      `http://localhost:3001/vote-review/farcaster/${ctx.message.requesterVerifiedAddresses[0]}/${id}`
    );

    const { userVoteStatus } = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    console.log("userVoteStatus:", userVoteStatus);

    if (userVoteStatus) {
      return {
        image: imageUrl(
          <div tw="flex flex-col">
            <Heading>{`You have already ${userVoteStatus.status} for this review ${id}`}</Heading>
          </div>
        ),
        buttons: [
          <Button
            key={1}
            action="post"
            target={`/reviews/${ctx.reviews[ctx.reviews.length - 1].id}`}
          >
            Next Review
          </Button>,
        ] as [any],
      };
    } else {
      return {
        image: imageUrl(
          <div tw="flex flex-col">
            <Heading>{`Upvote/Downvote for this review ${id}`}</Heading>
          </div>
        ),
        buttons: [
          <Button key={1} action="post" target={`/vote-review/${id}`}>
            Upvote 👍
          </Button>,
          <Button key={2} action="post" target={`/vote-review/${id}`}>
            Downvote 👎
          </Button>,
        ] as [any, any],
      };
    }
  })(req);
};
