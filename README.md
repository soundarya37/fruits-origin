# fruits-origin
All about fruits
The Fruit Almanac

A browsable, story-driven almanac of fruits from Tamil Nadu and Mexico — where each one comes from, when it's at its best, and a short tale about how it got here. Pick a fruit and it becomes your cursor while you read.

Description

The Fruit Almanac is a single-page React app that treats fruit facts as narrative rather than data. Instead of a plain lookup table, each fruit is a "crate" you can pick up: doing so reveals its origin story, a circular month-wheel showing its peak season, and a short piece of folklore-style writing about how it traveled to where it's eaten today.

Features

20 fruits spanning South Indian (Tamil Nadu) and Mexican produce, plus a few shared across both
A circular month-wheel per fruit highlighting its peak eating season
Origin and migration history written in a consistent storytelling voice
A custom cursor: selecting a fruit replaces your pointer with that fruit's emoji for as long as you're browsing
Region filter (Tamil Nadu / Mexico / Both)
Visuals

The app opens on a botanical-dark "market crate" grid. Selecting a fruit opens a paper-toned detail panel with the month-wheel on the left and the origin story on the right. Run it as a React artifact/component to see it live — no static screenshots are included in this repo yet.

Installation

This is a single self-contained React component (fruit-almanac.jsx) with no required external state or backend.

Requirements

React 18+
A build setup that supports JSX (Vite, Create React App, Next.js, or an artifact/sandbox environment)
Internet access at runtime to load the Google Fonts used (Fraunces, Space Mono)

To drop it into an existing React + Vite project:

bash
npm install
cp fruit-almanac.jsx src/FruitAlmanac.jsx

Then import and render it:

jsx
import FruitAlmanac from "./FruitAlmanac";

function App() {
  return <FruitAlmanac />;
}
Usage
jsx
import FruitAlmanac from "./FruitAlmanac";

export default function App() {
  return <FruitAlmanac />;
}
Click any fruit crate to open its story and season wheel.
Use the filter bar (All / Tamil Nadu / Mexico / Both) to narrow the grid by region.
While a fruit is selected, your cursor becomes that fruit's emoji — move around the page to see it follow you.
Roadmap
 "Tasted" log to mark fruits you've actually eaten, persisted across sessions
 "In season near me" filter based on location and current month
 Deeper regional voice: distinct Tamil folklore vs. Mexican market storytelling tones
 Optional data source citations for origin/season claims
Contributing

This is currently a personal/portfolio project, not open for outside contributions. If you spot an inaccuracy in a fruit's origin or season data, feel free to flag it — corrections are welcome.

Authors and acknowledgment

Built by Soundarya, with fruit data and storytelling drafted collaboratively with Claude.

License

Not yet licensed. All rights reserved until a license is chosen — see choosealicense.com for options if you plan to open-source it.

Project status

Active — first version complete, roadmap items above are the next planned iteration
