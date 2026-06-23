import { useEffect, useRef, useState, useCallback } from 'react';
import { SONGS, TIMELINE_ENTRIES } from './config';
import './TimelinePage.css';

/* ── Audio player ── */
function useAudioPlayer(songs, unlocked) {
  const audioRef = useRef(null);
  const indexRef = useRef(0);
  const [current, setCurrent] = useState(songs[0]?.title ?? '');

  // Create audio element once
  useEffect(() => {
    if (!songs.length) return;
    const audio = new Audio();
    audio.volume = 0.7;
    audioRef.current = audio;

    const onEnded = () => {
      indexRef.current = (indexRef.current + 1) % songs.length;
      const next = songs[indexRef.current];
      audio.src = next.src;
      setCurrent(next.title);
      audio.play().catch(() => {});
    };
    audio.addEventListener('ended', onEnded);

    // Pre-load first track src so it's ready
    audio.src = songs[0].src;
    setCurrent(songs[0].title);

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audio.src = '';
    };
  }, [songs]);

  // Start playing the moment the user unlocks (taps the overlay)
  useEffect(() => {
    if (!unlocked || !audioRef.current) return;
    audioRef.current.play().catch(() => {});
  }, [unlocked]);

  return current;
}

/* ── Scroll-reveal hook ── */
function useScrollReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

/* ── Timeline Item ── */
function TimelineItem({ entry, side }) {
  const ref = useRef(null);
  useScrollReveal(ref);

  const hasImage = entry.image && entry.image !== '';

  const contentEl = (
    <div className="timeline-content">
      <span className="tl-date">{entry.date}</span>
      <h2 className="tl-title">{entry.title}</h2>
      <p className="tl-synopsis">{entry.synopsis}</p>
    </div>
  );

  const photoEl = (
    <div className="timeline-photo">
      {hasImage ? (
        <img src={entry.image} alt={entry.title} loading="lazy" />
      ) : (
        <div className="timeline-photo-placeholder" aria-label="Memory photo">
          ♡
        </div>
      )}
    </div>
  );

  return (
    <article ref={ref} className={`timeline-item ${side}`} aria-label={entry.title}>
      {side === 'left' ? (
        <>
          {contentEl}
          <div className="timeline-dot" aria-hidden="true" />
          {photoEl}
        </>
      ) : (
        <>
          {photoEl}
          <div className="timeline-dot" aria-hidden="true" />
          {contentEl}
        </>
      )}
    </article>
  );
}

/* ── Entry Overlay ── */
function EntryOverlay({ onUnlock }) {
  const [fading, setFading] = useState(false);

  const handleTap = useCallback(() => {
    setFading(true);
    setTimeout(onUnlock, 600);
  }, [onUnlock]);

  return (
    <div
      className={`entry-overlay${fading ? ' fade-out' : ''}`}
      onClick={handleTap}
      onTouchStart={handleTap}
      role="button"
      aria-label="Tap to begin"
    >
      <div className="entry-overlay-inner">
        <span className="entry-overlay-deco" aria-hidden="true">♡</span>
        <p className="entry-overlay-hint">tap anywhere to begin</p>
        <span className="entry-overlay-pulse" aria-hidden="true" />
      </div>
    </div>
  );
}

/* ── Timeline Page ── */
export default function TimelinePage() {
  const [unlocked, setUnlocked] = useState(false);
  const currentSong = useAudioPlayer(SONGS, unlocked);

  const handleUnlock = useCallback(() => setUnlocked(true), []);

  // Group entries into pairs of 2
  const pairs = [];
  for (let i = 0; i < TIMELINE_ENTRIES.length; i += 2) {
    pairs.push(TIMELINE_ENTRIES.slice(i, i + 2));
  }

  return (
    <div className="timeline-page">

      {/* Full-screen entry overlay — dismissed on first tap, starts music */}
      {!unlocked && <EntryOverlay onUnlock={handleUnlock} />}

      {/* Header */}
      <header className="timeline-header">
        <span className="timeline-header-label">Our Story</span>
        <h1 className="timeline-header-title">
          Moments <em>&amp;</em> Memories
        </h1>
        <div className="timeline-header-divider" aria-hidden="true" />
      </header>

      {/* Now Playing */}
      {SONGS.length > 0 && (
        <div className="now-playing" aria-label={`Now playing: ${currentSong}`}>
          <div className={`now-playing-icon${unlocked ? '' : ' paused'}`} aria-hidden="true">
            <span className="np-bar" />
            <span className="np-bar" />
            <span className="np-bar" />
            <span className="np-bar" />
          </div>
          <span className="now-playing-text">{currentSong}</span>
        </div>
      )}

      {/* Timeline */}
      <section className="timeline" aria-label="Timeline of moments">
        {pairs.map((pair, pairIdx) => (
          <div key={pairIdx}>
            <div className="timeline-pair">
              {pair.map((entry, itemIdx) => {
                const globalIdx = pairIdx * 2 + itemIdx;
                const side = globalIdx % 2 === 0 ? 'left' : 'right';
                return (
                  <TimelineItem
                    key={globalIdx}
                    entry={entry}
                    side={side}
                  />
                );
              })}
            </div>
            {pairIdx < pairs.length - 1 && (
              <div className="pair-separator" aria-hidden="true" />
            )}
          </div>
        ))}
      </section>

      {/* Closing */}
      <footer className="timeline-end">
        <p className="timeline-end-line">
          &ldquo;And so the story continues…&rdquo;
        </p>
        <span className="timeline-end-deco" aria-hidden="true">♡ ✦ ♡</span>
      </footer>

    </div>
  );
}
