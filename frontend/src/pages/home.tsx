import React from "react";

export default function Home() {
  return (
    <div className="home-page">

      <section className="home-info-grid">
        <div className="info-card">
          <h2>Live Timing</h2>
          <p>
            Follow events as they happen. See run-by-run updates, best times,
            cone penalties, and current class leaders in real time.
          </p>
          <ul>
            <li>Instant run updates</li>
            <li>Class leaderboards</li>
            <li>Raw and indexed times</li>
            <li>Mobile-friendly live view</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>Event Results</h2>
          <p>
            Access complete results for every event. Final standings, times,
            rankings, and historical performance are all available.
          </p>
          <ul>
            <li>Final class results</li>
            <li>Overall rankings</li>
            <li>Driver performance tracking</li>
            <li>Downloadable result sheets</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>Season Standings</h2>
          <p>
            Track championship progress throughout the season. Standings update
            automatically after each event.
          </p>
          <ul>
            <li>Points-based rankings</li>
            <li>Class and overall standings</li>
            <li>Event participation tracking</li>
            <li>Championship projections</li>
          </ul>
        </div>
      </section>

      <section className="home-highlight">
        <div className="highlight-card">
          <h2>Built for Drivers, Spectators, and Organizers</h2>
          <p>
            Whether you're competing, working the course, or watching from the
            sidelines, this platform gives you immediate access to the data that
            matters most.
          </p>

          <div className="highlight-grid">
            <div>
              <h4>Drivers</h4>
              <p>
                Monitor your runs, compare against competitors, and track your
                position in real time.
              </p>
            </div>

            <div>
              <h4>Spectators</h4>
              <p>
                Stay engaged with live updates and follow the action without
                needing access to timing equipment.
              </p>
            </div>

            <div>
              <h4>Organizers</h4>
              <p>
                Share results instantly and provide a centralized hub for event
                data and standings.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}