import { fetchMetadata } from "frames.js/next";
import { vercelURL } from "@/utils/utils";

export async function generateMetadata() {
  const frameMetadata = await fetchMetadata(
    new URL("/frames", (vercelURL() || process.env.NEXT_PUBLIC_HOST)!)
  );

  return {
    title: "ENS Frame",
    description: "ENS Frame",
    other: frameMetadata,
  };
}

export default function Initial() {
  return <div>Manage ENS names</div>;
}
