import type { Metadata } from "next";
import { CustomizerClient } from "@/components/customizer/CustomizerClient";

export const metadata: Metadata = {
  title: "Create Your T-Shirt — GERMANTEES",
  description:
    "Design your own personalized T-shirt. Upload photos, add names, choose colours and fonts. Premium quality, made for you.",
};

export default function CustomizePage() {
  return <CustomizerClient />;
}
