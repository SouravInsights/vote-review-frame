import { serializeJsx } from "@/app/renderImage";
import { Scaffold } from "@/components/frames/scaffold";

export function imageUrl(image: JSX.Element) {
  const imageJson = JSON.stringify(serializeJsx(<Scaffold>{image}</Scaffold>));
  const imageUrl = `${new URL(
    "/images",
    vercelURL() || process.env.NEXT_PUBLIC_HOST
  ).toString()}?${new URLSearchParams({ jsx: imageJson }).toString()}`;
  return imageUrl;
}

export function vercelURL() {
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
}
