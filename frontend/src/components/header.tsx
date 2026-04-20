import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const signOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/");
  }

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="brand">
          <div className="brand-mark">ET</div>
          <div>
            <h1>Capital Region Event Timing</h1>
            <p>Live timing, class results, and season standings</p>
          </div>
        </div>
      </div>

      <nav className="main-nav">
        <Link aria-label="Navigate to home" to="/">Home</Link>
        <Link aria-label="Navigate to live timing" to="/live">Live timing</Link>
        <Link aria-label="Navigate to results" to="/results">Results</Link>
        <Link aria-label="Navigate to register for the next event" to="https://nccautocross.com/">Register</Link>
        <Link style={{display: 'none'}} ariga-label="Sign out" to="/sign-out" onClick={signOut}>Sign Out</Link>
      </nav>
    </header>
  );
}
