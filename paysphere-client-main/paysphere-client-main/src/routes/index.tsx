import { lazy } from "react";
import App from "@/App";
import { createBrowserRouter, Navigate } from "react-router";
import { withAuth } from "@/utils/withAuth";
import type { TRole } from "@/types/auth";
import { role } from "@/constants/role";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const Features = lazy(() => import("@/components/modules/Home/Features"));
const Pricing = lazy(() => import("@/components/modules/Home/Pricing"));
const Contact = lazy(() => import("@/components/modules/Home/Contact"));
const Faq = lazy(() => import("@/components/modules/Home/Faq"));
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const DashboardLayout = lazy(() => import("@/components/layout/DashboardLayout"));



export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        index: true,
        Component: HomePage,
        path: "/",
      },
      {
        Component: AboutPage,
        path: "about",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Pricing,
        path: "pricing",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: Faq,
        path: "faq",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.agent as TRole),
    path: "/agent",
    children: [
      { index: true, element: <Navigate to="/agent/wallet" /> },
      ...generateRoutes(agentSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/wallet" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: LoginPage,
    path: "login",
  },
  {
    Component: RegisterPage,
    path: "/register/:role",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  {
    Component: NotFound,
    path: "*"
  }
]);
