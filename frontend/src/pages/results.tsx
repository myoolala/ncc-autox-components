import React, { ChangeEvent, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type EventResultSummary, useAppStore, type YearResultsData } from "../store/appStore";

const getCurrentYear = (): number => new Date().getFullYear();

interface SeasonStandingsSectionProps {
  year: number;
}

function SeasonStandingsSection({
  year,
}: SeasonStandingsSectionProps): JSX.Element {
  return (
    <section className="results-section">
      <div className="results-card">
        <h2>Season Standings - {year}</h2>
        <div className="results-placeholder">
          Season standings table goes here
        </div>
      </div>
    </section>
  );
}

interface EventResultsSectionProps {
  event: EventResultSummary;
  index: number;
}

function EventResultsSection({
  event,
  index,
}: EventResultsSectionProps): JSX.Element {
  return (
    <section className="results-section">
      <div className="results-card">
        <h2>
          Event {index + 1}: {event.name}
        </h2>
        <p className="results-meta">{event.date}</p>
        <div className="results-placeholder">
          Event results table goes here
        </div>
      </div>
    </section>
  );
}

interface ResultsRouteParams {
  year?: string;
}

export default function ResultsPage(): JSX.Element {
  const { year } = useParams();
  const navigate = useNavigate();

  const selectedYear = useAppStore((state) => state.selectedYear);
  const availableYears = useAppStore((state) => state.availableYears);
  const resultsByYear = useAppStore((state) => state.resultsByYear);
  const setSelectedYear = useAppStore((state) => state.setSelectedYear);

  const resolvedYear = useMemo<number>(() => {
    const parsedYear = Number(year);

    if (!year || !Number.isInteger(parsedYear)) {
      return getCurrentYear();
    }

    return parsedYear;
  }, [year]);

  useEffect(() => {
    setSelectedYear(resolvedYear);
  }, [resolvedYear, setSelectedYear]);

  const yearData: YearResultsData = resultsByYear[selectedYear] ?? {
    seasonStandings: null,
    events: [],
  };

  const sortedEvents = [...yearData.events].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const nextYear = Number(event.target.value);
    setSelectedYear(nextYear);
    navigate(`/results/${nextYear}`);
  };

  return (
    <div className="results-page">
      <div className="results-page-inner">
        <section className="results-intro">
          <div>
            <h1>{selectedYear} Results</h1>
            <p>
              View season standings and event-by-event results for the selected
              year.
            </p>
          </div>

          <div className="results-year-picker">
            <label htmlFor="results-year">Year</label>
            <select
              id="results-year"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {availableYears.map((optionYear: number) => (
                <option key={optionYear} value={optionYear}>
                  {optionYear}
                </option>
              ))}
            </select>
          </div>
        </section>

        <div className="results-list">
          <SeasonStandingsSection year={selectedYear} />

          {sortedEvents.map((event, index) => (
            <EventResultsSection
              key={event.id}
              event={event}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}