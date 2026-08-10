import type { Metadata } from "next";
import { CartClient } from "@/components/cart/CartClient";

export const metadata: Metadata = {
  title: "Cart — GERMANTEES",
  description: "Review your personalized apparel selections.",
};

export default function CartPage() {
  return <CartClient />;
}
