import React from "react";
import "./event-timing.css";

const featuredEvent = {
  name: "Points Event #2",
  date: "May 16, 2026",
  location: "Summit Point - Jefferson Circuit",
  status: "Live Now",
  registrationsOpen: false,
  lastUpdated: "Updated 11:42 AM",
};

const latestPosts = [
  {
    id: 1,
    category: "Results",
    title: "Points Event #1 - Final Results Posted",
    date: "April 11, 2026",
    excerpt:
      "Final indexed times, class results, PAX standings, and trophies are now available for review.",
  },
  {
    id: 2,
    category: "Live Timing",
    title: "Points Event #2 - Live Timing Active",
    date: "May 16, 2026",
    excerpt:
      "Drivers can now monitor raw times, best runs, cone penalties, and class positions in real time.",
  },
  {
    id: 3,
    category: "Season Standings",
    title: "2026 Championship Standings Updated",
    date: "May 17, 2026",
    excerpt:
      "Overall season points have been recalculated after the latest event and provisional standings are posted.",
  },
];

const upcomingEvents = [
  "6/20 - Points Event #3",
  "8/1 - Test and Tune #2",
  "9/5 - Points Event #4",
  "10/3 - Points Event #5",
  "11/8 - Points Event #6",
];

const liveClasses = [
  { name: "Novice", runsIn: "Heat 1", leader: "P. Grasso", best: "42.118" },
  { name: "Street", runsIn: "Heat 2", leader: "A. Lee", best: "39.774" },
  { name: "Prepared", runsIn: "Heat 3", leader: "J. Carter", best: "38.902" },
];

const topRawTimes = [
  { pos: 1, driver: "A. Lee", car: "C8 Corvette", time: "39.774" },
  { pos: 2, driver: "J. Carter", car: "GT3", time: "39.992" },
  { pos: 3, driver: "P. Grasso", car: "BMW 328i", time: "40.318" },
  { pos: 4, driver: "M. Young", car: "Civic Type R", time: "40.447" },
  { pos: 5, driver: "S. Patel", car: "Miata", time: "40.611" },
];

function Header() {
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
        <a href="#home">Home</a>
        <a href="#live">Live Timing</a>
        <a href="#results">Results</a>
        <a href="#standings">Standings</a>
        <a href="#schedule">Schedule</a>
        <a href="#register">Register</a>
      </nav>
    </header>
  );
}

function HeroBanner() {
  return (
    <section className="hero-card">
      <div className="hero-copy">
        <span className="pill pill-live">{featuredEvent.status}</span>
        <h2>{featuredEvent.name}</h2>
        <p className="hero-meta">
          {featuredEvent.date} · {featuredEvent.location}
        </p>
        <p>
          Follow runs as they happen, check class leaders, and review results
          once the event closes.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary">Open Live Timing</button>
          <button className="btn btn-secondary">View Class Results</button>
          <button className="btn btn-secondary">Season Standings</button>
        </div>
      </div>

      <div className="hero-side">
        <div className="stat-card">
          <span>Event Status</span>
          <strong>Heat 2 Running</strong>
        </div>
        <div className="stat-card">
          <span>Drivers Checked In</span>
          <strong>87</strong>
        </div>
        <div className="stat-card">
          <span>{featuredEvent.lastUpdated}</span>
          <strong>Timing Feed Healthy</strong>
        </div>
      </div>
    </section>
  );
}

function PostCard({ post }) {
  return (
    <article className="post-card">
      <div className="post-image" />
      <div className="post-content">
        <span className="post-category">{post.category}</span>
        <h3>{post.title}</h3>
        <p className="post-date">{post.date}</p>
        <p>{post.excerpt}</p>
        <a href="/">Read more</a>
      </div>
    </article>
  );
}

function LiveClassTable() {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Live Class Leaders</h3>
        <a href="/">Full timing board</a>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Current Heat</th>
              <th>Leader</th>
              <th>Best Time</th>
            </tr>
          </thead>
          <tbody>
            {liveClasses.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.runsIn}</td>
                <td>{row.leader}</td>
                <td>{row.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RawTimesTable() {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Top Raw Times</h3>
        <a href="/">See all results</a>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th>Car</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {topRawTimes.map((row) => (
              <tr key={row.pos}>
                <td>{row.pos}</td>
                <td>{row.driver}</td>
                <td>{row.car}</td>
                <td>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <section className="sidebar-card">
        <h3>Quick Links</h3>
        <ul className="sidebar-links">
          <li><a href="/">Open live timing</a></li>
          <li><a href="/">Today&apos;s results</a></li>
          <li><a href="/">Season standings</a></li>
          <li><a href="/">Class rules</a></li>
          <li><a href="/">Register for next event</a></li>
        </ul>
      </section>

      <section className="sidebar-card">
        <h3>Upcoming Events</h3>
        <ul className="event-list">
          {upcomingEvents.map((event) => (
            <li key={event}>
              <a href="/">{event}</a>
            </li>
          ))}
        </ul>
      </section>

      <section className="sidebar-card">
        <h3>Live Status</h3>
        <div className="status-item">
          <span>Timing Feed</span>
          <strong className="ok">Online</strong>
        </div>
        <div className="status-item">
          <span>Registration</span>
          <strong className="ok">Closed</strong>
        </div>
        <div className="status-item">
          <span>Worker Assignments</span>
          <strong>Posted</strong>
        </div>
      </section>
    </aside>
  );
}

function SponsorBar() {
  return (
    <section className="sponsor-bar">
      <h3>Partners</h3>
      <div className="sponsor-grid">
        <div className="sponsor-tile">Track Sponsor</div>
        <div className="sponsor-tile">Tire Sponsor</div>
        <div className="sponsor-tile">Club Partner</div>
      </div>
    </section>
  );
}

export default function EventTimingSite() {
  return (
    <div className="site-shell">
      <Header />

      <main className="page">
        <div className="content">
          <HeroBanner />

          <div className="main-grid">
            <section className="primary-column">
              <div className="section-title">
                <h2>Latest Updates</h2>
              </div>

              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}

              <LiveClassTable />
              <RawTimesTable />
            </section>

            <Sidebar />
          </div>
        </div>
      </main>

      <SponsorBar />

      <footer className="site-footer">
        <p>© 2026 Capital Region Event Timing</p>
      </footer>
    </div>
  );
}