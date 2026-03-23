import { lazy } from "react";
import type { ISidebarItem } from "@/types";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const AllUserPage = lazy(() => import("@/pages/Admin/AllUserPage"));
const AllAgentPage = lazy(() => import("@/pages/Admin/AllAgentPage"));
const TransactionPage = lazy(() => import("@/pages/TransactionPage"));
const AllTransactionPage = lazy(() => import("@/pages/Admin/AllTransactionPage"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "Profile",
        url: "/admin/me",
        component: ProfilePage,
      },
      {
        title: "All User",
        url: "/admin/user",
        component: AllUserPage,
      },
      {
        title: "All Agent",
        url: "/admin/agent",
        component: AllAgentPage,
      },
      {
        title: "My Transaction",
        url: "/admin/my-transaction",
        component: TransactionPage,
      },
      {
        title: "All Transaction",
        url: "/admin/all-transaction",
        component: AllTransactionPage,
      },
    ],
  },
];