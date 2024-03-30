import { NextRequest } from "next/server";
import { frames } from "../../frames";
import { Button } from "frames.js/next";
import { Heading } from "@/components/frames/heading";
import { imageUrl } from "@/utils/utils";
import { updateReviewIndexMiddleware } from "../../frames";

type Props = {
  params: {
    id: number;
  };
};

export const POST = async (req: NextRequest, { params }: Props) => {
  return frames(
    async (ctx) => {
      console.log("currentReviewIndex in reviews route:", ctx.currentReviewIndex);

      const { id } = params;

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
    },
    {
      middlewares: [updateReviewIndexMiddleware],
    }
  )(req);
};
