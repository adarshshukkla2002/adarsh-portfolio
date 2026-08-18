import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { router } from "@/router/routes";
import Preloader from "@/components/feedback/Preloader";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <div
        className="transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
        aria-hidden={!ready}
      >
        <RouterProvider router={router} />
      </div>
      <Analytics />
    </>
  );
}
