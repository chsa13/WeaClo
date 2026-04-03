import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Wardrobe } from "./pages/Wardrobe";
import { Events } from "./pages/Events";
import { Settings } from "./pages/Settings";
import { Onboarding } from "./pages/Onboarding";

export const router = createBrowserRouter([
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "wardrobe", Component: Wardrobe },
      { path: "events", Component: Events },
      { path: "settings", Component: Settings },
    ],
  },
], {basename: "/WeaClo"});