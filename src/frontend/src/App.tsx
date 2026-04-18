import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { LoadingPage } from "./components/LoadingSpinner";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy-loaded pages
const LandingPage = lazy(() => import("./pages/Landing"));
const SubmitPage = lazy(() => import("./pages/Submit"));
const LoginPage = lazy(() => import("./pages/Login"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Toaster richColors position="top-right" closeButton />
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <LandingPage />,
});

const submitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/submit",
  component: () => <SubmitPage />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => <LoginPage />,
});

export type DashboardSearch = {
  search?: string;
  sort?: "newest" | "oldest";
  status?: "all" | "pending" | "prayed";
};

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  validateSearch: (raw: Record<string, unknown>): DashboardSearch => ({
    search: typeof raw.search === "string" ? raw.search : undefined,
    sort:
      raw.sort === "oldest" || raw.sort === "newest"
        ? (raw.sort as "newest" | "oldest")
        : undefined,
    status:
      raw.status === "pending" ||
      raw.status === "prayed" ||
      raw.status === "all"
        ? (raw.status as "all" | "pending" | "prayed")
        : undefined,
  }),
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  submitRoute,
  loginRoute,
  dashboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
