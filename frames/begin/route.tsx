import { Button, FrameDefinition, types } from "frames.js/next";
import { Heading } from "@/components/frames/heading";
import { frames } from "../frames";
//import { handleManageImpl } from "../manage/handleManageImpl";
import { imageUrl } from "@/utils/utils";

export const POST = frames(async (ctx: FrameDefinition) => {
  if (!ctx.message) {
    throw new Error("No message");
  }

  //console.log("ctx reviews from begin route:", ctx.reviews[0]);
  //console.log("traget url:", `/reviews/[${ctx.reviews[0].id}]`);

  const back = ctx.searchParams.back;

  const addresses = ctx.message.requesterVerifiedAddresses;
  // console.log("addresses:", addresses);

  if (ctx.reviews.length === 0) {
    return {
      image: imageUrl(<div>No recent reviews!</div>),
      buttons: [
        <Button key={ctx.reviews.id} action="post" target="/">
          ← Back
        </Button>,
      ],
    };
  }

  return {
    image: imageUrl(
      <div tw="flex flex-col">
        <Heading>{`We have fetched ${ctx.reviews.length} for you!`}</Heading>
        Let us know your opinion on these reviews!
      </div>
    ),
    buttons: [
      <Button key={1} action="post" target={back}>
        ← Back
      </Button>,

      <Button key={2} action="post" target={`/reviews/${ctx.reviews[0].id}`}>
        Start
      </Button>,
    ] as [any, any],
  };
});
