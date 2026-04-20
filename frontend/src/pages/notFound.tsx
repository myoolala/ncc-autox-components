import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center"}}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 800 }}>404</div>
        <div style={{ opacity: 0.75, marginTop: 8 }}>Page not found</div>
        <div style={{ marginTop: 14 }}>
          <Link to="/" style={{ color: "#7db1ff" }}>
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}
