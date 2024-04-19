import { ImageResponse } from "@vercel/og";
import * as fs from "node:fs/promises";
import * as path from "node:path";

export async function loadFonts() {
  const regularFont = fs.readFile(
    path.join(path.resolve(process.cwd(), "public"), "Satoshi-Regular.ttf")
  );

  const boldFont = fs.readFile(
    path.join(path.resolve(process.cwd(), "public"), "Satoshi-Bold.ttf")
  );

  const [regularFontData, boldFontData] = await Promise.all([regularFont, boldFont]);

  return {
    regularFontData,
    boldFontData,
  };
}

export function jsxToImageResponse({
  jsx,
  fonts: { boldFontData, regularFontData },
}: {
  jsx: JSX.Element;
  fonts: Awaited<ReturnType<typeof loadFonts>>;
}) {
  const width = 1000;
  const height = Math.round(width * 1.91);

  return new ImageResponse(jsx, {
    width,
    height,
    fonts: [
      {
        name: "Satoshi",
        data: regularFontData,
        weight: 400,
      },
      {
        name: "Satoshi",
        data: boldFontData,
        weight: 700,
      },
    ],
  });
}
