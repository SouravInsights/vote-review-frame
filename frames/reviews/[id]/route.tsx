/* eslint-disable react/jsx-key */
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { frames } from "../../frames";
import { Button } from "frames.js/next";
import { Typography } from "@/components/ui/typography";
import StarsRating from "@/components/stars-rating";
import { formatReviewDate } from "@/utils/formatting";
import { API_URL } from "@/config/constants";

const frameHandler = async (
  req: NextRequest,
  { params: { id: reviewId } }: { params: { id: number } }
) => {
  return await frames(async (ctx) => {
    const response = await fetch(`${API_URL}/reviews/single-review?reviewId=${reviewId}`);
    console.log("response:", response);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const review = await response.json();
    console.log("review:", review);

    const publicDir = path.join(process.cwd(), "public");
    console.log("publicDir:", publicDir);

    const files = fs.readdirSync(publicDir);
    console.log("files:", files);

    const trippyIcons = files.filter((file) => file.match(/^trippy-icon-\d+\.svg$/));
    const baseUrl = process.env.NEXT_PUBLIC_HOST || "";
    console.log("baseUrl:", baseUrl);
    const trippyIconUrl = `${baseUrl}/${trippyIcons[0]}`;
    console.log("trippyIconUrl:", trippyIconUrl);

    return {
      image: (
        <div tw="flex flex-col bg-[#FFFFFF] ">
          <div tw="w-full grid grid-cols-2 gap-5 center-center border-b-4 border-black bg-[#71D4F4]">
            <div tw="w-[auto] items-center justify-center gap-5 self-stretch rounded-tl-lg ">
              <img src={trippyIconUrl} alt="icon" tw="w-[55] w-[48] border-r-4 border-black" />
            </div>
            <div tw="w-[100%] bg-[#FAF5EC]">
              <div tw="flex items-center gap-1 px-4 py-2">
                <Typography as="span" variant="body-mobile-black">
                  {review.userAddress}
                </Typography>
              </div>
            </div>
          </div>
          <div tw="flex flex-col px-6 pb-8 pt-6 w-full">
            <div tw="mb-4 inline flex w-full items-center justify-between">
              <div tw="flex items-center">
                <div tw="flex items-center text-charcoal">
                  <StarsRating rating={review.rating} />
                </div>
                <Typography variant="small" tw="ml-5 inline">
                  {formatReviewDate(review.createdAt)}
                </Typography>
              </div>
            </div>

            <div tw="w-[85%] break-words">{review.description}</div>
          </div>
        </div>
      ),
      buttons: [
        <Button action="post" target={`/vote-review/${reviewId}`}>
          Good review 👍
        </Button>,
        <Button action="post" target={`/vote-review/${reviewId}`}>
          Bad review 👎
        </Button>,
      ] as [any, any],
    };
  })(req);
};

export const GET = frameHandler;
export const POST = frameHandler;
