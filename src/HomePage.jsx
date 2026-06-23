import { useEffect, useState, useRef } from 'react';
import {
  TARGET_YEAR, TARGET_MONTH, TARGET_DAY,
  TARGET_HOUR, TARGET_MINUTE, TARGET_SECOND,
  NAME_LEFT, NAME_RIGHT,
} from './config';
import './HomePage.css';

// ── helpers ────────────────────────────────────────────────

/** Returns the exact configured target Date (does NOT auto-push to tomorrow). */
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

/** Seconds remaining until `target` Date, floored to 0. */
function secondsUntil(target) {
  return Math.max(0, (target - Date.now()) / 1000);
}

/** Format a seconds value as  HH:MM:SS  or  MM:SS  depending on magnitude. */
function formatTime(totalSecs) {
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = Math.floor(totalSecs % 60);

  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');

  if (h > 0) {
    return `${String(h).padStart(2, '0')}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
}

const CIRCUMFERENCE = 2 * Math.PI * 44; // matches SVG r=44

export default function HomePage({ onTimerEnd }) {
  // Compute target once on mount — fixed absolute date, never changes
  const targetRef = useRef(buildTarget());
  const totalSecsRef = useRef(secondsUntil(targetRef.current));

  const [timeLeft, setTimeLeft] = useState(secondsUntil(targetRef.current));
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const tick = () => {
      const remaining = secondsUntil(targetRef.current);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        setFading(true);
        setTimeout(() => onTimerEnd?.(), 850);
      }
    };

    const interval = setInterval(tick, 500); // tick every 500 ms for tight accuracy
    tick(); // run immediately so there's no 500 ms blank

    return () => clearInterval(interval);
  }, [onTimerEnd]);

  const totalSecs = totalSecsRef.current || 1; // avoid ÷0
  const progress = Math.min(1, timeLeft / totalSecs);
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const isUrgent = timeLeft <= 30; // last 30 seconds turn rose

  const display = formatTime(timeLeft);

  return (
    <main className={`homepage${fading ? ' fade-out' : ''}`} aria-label="Splash screen">
      {/* Decorative hearts */}
      <span className="home-deco" aria-hidden="true">♡</span>
      <span className="home-deco" aria-hidden="true">✦</span>
      <span className="home-deco" aria-hidden="true">♡</span>
      <span className="home-deco" aria-hidden="true">✦</span>
      <span className="home-deco" aria-hidden="true">♡</span>

      {/* Names */}
      <div className="home-names">
        <span className="home-name">{NAME_LEFT}</span>
        <span className="home-ampersand">&amp;</span>
        <span className="home-name">{NAME_RIGHT}</span>
      </div>


      {/* Timer */}
      <div className="home-timer-wrap">
        <p className="home-timer-label">A moment begins in</p>

        {/* Digit row flanked by CSS hairlines */}
        <div
          className="home-timer-ring"
          role="timer"
          aria-live="polite"
          aria-label={`${Math.ceil(timeLeft)} seconds remaining`}
        >
          <span className={`home-timer-digits${isUrgent ? ' urgent' : ''}`}>
            {display}
          </span>
        </div>

        {/* Progress fill bar */}
        <div className="home-timer-bar-track" aria-hidden="true">
          <div
            className={`home-timer-bar-fill${isUrgent ? ' urgent' : ''}`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <p className="home-timer-target">
          {String(TARGET_DAY).padStart(2, '0')}/{String(TARGET_MONTH).padStart(2, '0')}/{TARGET_YEAR}
          {' — '}
          {String(TARGET_HOUR).padStart(2, '0')}:{String(TARGET_MINUTE).padStart(2, '0')} {TARGET_HOUR < 12 ? 'AM' : 'PM'}
        </p>
      </div>
    </main>
  );
}
