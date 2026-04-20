import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const signOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/");
  }

  return (
    <nav className="header">
        <div>
            <Link aria-label="Navigate to home" to="/">Home</Link>
        </div>
        <div>
            <Link aria-label="Navigate to live timing" to="/live-timing">Live Timing</Link>
            |
            <Link aria-label="Navigate to season standings" to="/season-standings">Season Standings</Link>
            |
            <Link aria-label="Navigate to learn more" to="https://nccautocross.com/">Learn more</Link>
            |
            <Link style={{display: 'none'}} ariga-label="Sign out" to="/sign-out" onClick={signOut}>Sign Out</Link>
        </div>
    </nav>
  );
}
