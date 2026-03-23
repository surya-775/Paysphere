import { lazy } from "react";
import type { ISidebarItem } from "@/types";
const WalletPage = lazy(() => import("@/pages/WalletPage"));
const TransactionPage = lazy(() => import("@/pages/TransactionPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "My Wallet",
        url: "/user/wallet",
        component: WalletPage,
      },
      {
        title: "Profile",
        url: "/user/me",
        component: ProfilePage,
      },
      {
        title: "My Transaction",
        url: "/user/my-transaction",
        component: TransactionPage,
      },
    ],
  },
];