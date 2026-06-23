// ============================================================
//  EASY CONFIGURATION — change values here
// ============================================================
import june22 from './assets/June22.png';
import june18 from './assets/June18.jpg';
import june8 from './assets/June8.jpeg';
import june13 from './assets/June13.jpg';
import may30 from './assets/may30.jpg';
import may29 from './assets/may29.png';
import may28 from './assets/May28.png';

import may23 from './assets/may23.png';
import may22 from './assets/may22.jpg';
import may18 from './assets/May18.jpg';
import may2 from './assets/May2.png';
import april9 from './assets/Apr9.jpg';
// import april4 from './assets/april4.jpg';
import march30 from './assets/Mar30.jpg';
import march24 from './assets/Mar24.png';
import mar6 from './assets/Mar6.jpg';
import march6 from './assets/March6.png';
import march7 from './assets/Mar7.png';
// import march6 from './assets/march6.jpg';
import february14 from './assets/february14.jpg';
import feb12 from './assets/feb12.png';
// ── Target reveal date & time ────────────────────────────
// Before this moment  → homepage + countdown timer is shown.
// After  this moment  → timeline is shown immediately, always.
//
// Month is 1–12 (January = 1, June = 6, etc.)
export const TARGET_YEAR = 2026; // ← year
export const TARGET_MONTH = 6;    // ← month  (1–12)
export const TARGET_DAY = 23;   // ← day
export const TARGET_HOUR = 3;    // ← hour   (24 h, 3 = 3 AM)
export const TARGET_MINUTE = 3;    // ← minute
export const TARGET_SECOND = 0;    // ← second

// The names displayed on the homepage
export const NAME_LEFT = "Lavanya";
export const NAME_RIGHT = "Tharun";

// Songs list — add/remove/reorder freely.
// Each song needs a `title` (displayed on screen) and a `src`
// (path relative to /public, e.g. "/songs/song1.mp3").
// Audio files should be placed in public/songs/
export const SONGS = [
  { title: "Un Vizhigalil", src: "/songs/Un Vizhigalil.mp3" },
  { title: "🤍", src: "/songs/Oorum blood Orchestral.mp3" },
  // { title: "Thinking Out Loud", src: "/songs/thinking_out_loud.mp3" },
  // { title: "A Thousand Years", src: "/songs/a_thousand_years.mp3" },
  // { title: "All of Me", src: "/songs/all_of_me.mp3" },
];

// Timeline entries — add/remove/reorder freely.
// Each entry needs: date, title, synopsis, image (path from /public)
// Images should be placed in public/timeline/
export const TIMELINE_ENTRIES = [
  {
    date: "February 12, 2026",
    title: "The First Confession",
    synopsis: "The day it started.. my confession on how I felt about you.😇",
    image: feb12,
  },
  {
    date: "February 14, 2026",
    title: "Will You Marry Me?",
    synopsis: "My love proposal, \"Will you marry me?\" 💕",
    image: february14,
  },
  {
    date: "March 6, 2026",
    title: "Our First Temple Visit",
    synopsis: "Our first ever temple visit together.🙏",
    image: mar6,
  },
  {
    date: "March 7, 2026",
    title: "That White Dress",
    synopsis: "Saw you in that white dress I bought you 🤍",
    image: march7,
  },
  {
    date: "March 24, 2026",
    title: "Our First Time Night Call",
    synopsis: "Our first ever nighttime phone call.🥰",
    image: march24,
  },
  {
    date: "March 30, 2026",
    title: "Our First Picnic",
    synopsis: "Our first picnic together.💃🕺",
    image: march30,
  },
  {
    date: "April 4, 2026",
    title: "Temple Visit Together",
    synopsis: "A solo temple visit Together✨",
    image: march6,
  },
  {
    date: "April 9, 2026",
    title: "Lunch, Packed With Love",
    synopsis: "The day you packed lunch for me.🫶",
    image: april9,
  },
  {
    date: "May 2, 2026",
    title: "Our First Night Meet",
    synopsis: "Our very first nighttime meet.😍",
    image: may2,
  },
  {
    date: "May 18, 2026",
    title: "First Drive Together",
    synopsis: "Smooched your cheeks for the first time, on our first car drive together🤌",
    image: may18,
  },
  {
    date: "May 22, 2026",
    title: "Our First Ever Late Night Call",
    synopsis: "Our first ever late night phone call, but one sided 😅",
    image: may22,
  },
  {
    date: "May 23, 2026",
    title: "\"I Love You Tharun\"",
    synopsis: "The day you echoed back your love for me. \"I LOVE YOU THARUN 💖✨\"",
    image: may23,
  },
  {
    date: "May 28, 2026",
    title: "Our Remote First Night",
    synopsis: "Our remote first night 🫣",
    image: may28,
  },
  {
    date: "May 29, 2026",
    title: "Our First Ever Kiss",
    synopsis: "Our first ever kiss.😘",
    image: may29,
  },
  {
    date: "May 30, 2026",
    title: "Hugged, Kissed, Cuddled, Shared",
    synopsis: "I straight away hugged, kissed, consoled, carried you, made you laugh, and cuddled with you.💓",
    image: may30,
  },
  {
    date: "June 8, 2026",
    title: "Our First Bike Ride",
    synopsis: "Our very first bike ride.🤗",
    image: june8,
  },
  {
    date: "June 13, 2026",
    title: "Touched Your Feet",
    synopsis: "The day I touched your feet.😇",
    image: june13,
  },
  {
    date: "June 18, 2026",
    title: "Curiosity Left, Comfort Stayed",
    synopsis: "The day curiosity left the room and comfort accompanied both of us.💖",
    image: june18,
  },
  {
    date: "June 22, 2026",
    title: "A Special Hug",
    synopsis: "A special hug during our bike ride🫂",
    image: june22,
  },
];