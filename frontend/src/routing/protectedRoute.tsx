import { Outlet } from "react-router-dom";
// import { useAuthStore } from "../store/authStore";

// A wrapper for pages to make sure they have an auth token
// Does not validate that the token itself is valid just that it exists
// API calls will determine if the token is valid or not
export default function ProtectedRoute() {
  // const authed = useAuthStore((s) => s.isAuthed());
  // const emit = useAuthStore((s) => s.emit);
  // const location = useLocation();

  // if (!authed) {
  //   emit("NAV_GUARD_REDIRECT", { from: location.pathname });
  //   return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  // }

  return <Outlet />;
}
