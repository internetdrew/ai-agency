import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { queryClient } from "@/utils/trpc";
import { QueryClientProvider } from "@tanstack/react-query";
import Home from "./routes/Home.tsx";
import Personas from "./routes/Personas.tsx";
import PersonaDetail from "./routes/PersonaDetail.tsx";
import "./index.css";
import { ActiveClientProvider } from "./contexts/ActiveClient.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <ActiveClientProvider>
          <App />
        </ActiveClientProvider>
      </QueryClientProvider>
    ),
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/personas",
        element: <Personas />,
      },
      {
        path: "/personas/:id",
        element: <PersonaDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
