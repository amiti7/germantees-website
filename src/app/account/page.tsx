import type { Metadata } from "next";
import { AccountClient } from "@/components/account/AccountClient";

export const metadata: Metadata = {
  title: "My Account — GERMANTEES",
  description: "Manage your orders, saved designs, addresses and profile.",
};

export default function AccountPage() {
  return <AccountClient />;
}
