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
    const back = ctx.searchParams.back;
    const { id } = params;

    return {
      image: imageUrl(
        <div tw="flex flex-col">
          <Heading>{`Review ID ${id}`}</Heading>
        </div>
      ),
      buttons: [
        <Button key={1} action="post" target={`/vote-review/${id}`}>
          👍 Upvote
        </Button>,
        <Button key={2} action="post" target={`/vote-review/${id}`}>
          👎 Downvote
        </Button>,
      ] as [any, any],
    };
  })(req);
};
