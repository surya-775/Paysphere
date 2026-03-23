import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./providers/theme.provider.tsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "./components/ui/sonner.tsx";
import Loading from "./components/ui/Loading.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
