import { lazy } from "react";
import type { ISidebarItem } from "@/types";
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const TransactionPage = lazy(() => import("@/pages/TransactionPage"));
const WalletPage = lazy(() => import("@/pages/WalletPage"));

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "My Wallet",
        url: "/agent/wallet",
        component: WalletPage,
      },
      {
        title: "Profile",
        url: "/agent/me",
        component: ProfilePage,
      },
      {
        title: "My Transaction",
        url: "/agent/my-transaction",
        component: TransactionPage,
      },
    ],
  },
];