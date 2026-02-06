import { Navigate, Outlet, useLocation } from "react-router-dom";

const QUICK_SCAN_ROUTES = ["/scan", "/result"];

const AuthGuard = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true;

  // ✅ PWA → full access
  if (isStandalone) {
    return <Outlet />;
  }

  // ✅ Public routes
  const publicRoutes = ["/", "/login", "/auth/callback"];
  if (publicRoutes.includes(location.pathname)) {
    return <Outlet />;
  }

  // ✅ Quick Scan routes (unauthenticated)
  if (QUICK_SCAN_ROUTES.some((r) => location.pathname.startsWith(r))) {
    return <Outlet />;
  }

  // ❌ Web + protected + not logged in
  if (!token) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
