import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/components/layout/RootLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Work from "@/pages/Work";
import CaseStudy from "@/pages/CaseStudy";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

/**
 * Route table. Nested under a single persistent layout so the
 * background, cursor and navbar never remount between pages.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "work", element: <Work /> },
      { path: "work/:slug", element: <CaseStudy /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
