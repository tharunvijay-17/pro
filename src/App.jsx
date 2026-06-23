import { useState } from 'react';
import {
  TARGET_YEAR, TARGET_MONTH, TARGET_DAY,
  TARGET_HOUR, TARGET_MINUTE, TARGET_SECOND,
} from './config';
import HomePage     from './HomePage';
import TimelinePage from './TimelinePage';
import './App.css';

/** Build the exact target Date from config values (month is 1-based in config). */
function buildTarget() {
  return new Date(
    TARGET_YEAR,
    TARGET_MONTH - 1, // JS months are 0-based
    TARGET_DAY,
    TARGET_HOUR,
    TARGET_MINUTE,
    TARGET_SECOND,
    0
  );
}

/** Has the reveal moment already passed? */
function isRevealed() {
  return Date.now() >= buildTarget().getTime();
}

export default function App() {
  // If the target time has already passed, go straight to timeline.
  // Otherwise start on the homepage with the countdown.
  const [page, setPage] = useState(() => isRevealed() ? 'timeline' : 'home');

  const goToTimeline = () => setPage('timeline');

  if (page === 'timeline') return <TimelinePage />;
  return <HomePage onTimerEnd={goToTimeline} />;
}
