import type { Metadata } from "next";
import { DesignStudioClient } from "@/components/design-studio/DesignStudioClient";

export const metadata: Metadata = {
  title: "Design Studio — GERMANTEES",
  description:
    "Upload your graphic designs, preview them on T-shirts in every colour and size, and see how they look on you with our virtual try-on.",
};

export default function DesignStudioPage() {
  return <DesignStudioClient />;
}
