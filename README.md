# UrbanSight Control

Create a high-fidelity desktop web dashboard for a smart-city vehicle tracking and traffic-alert platform called:

“UrbanTrace AI — Operator Control Room”

Canvas / base viewport: 1440 × 900 desktop web application.

DESIGN INTENT

Design a sophisticated civic-operations interface that feels calm, trustworthy, modern, and highly usable under pressure. It should feel like a premium Google Maps / Waze-inspired city operations product, not a dark military or surveillance terminal.

The user’s design taste:

- Friendly and approachable, with rounded corners and clean spacing

- High-trust institutional visual language

- Map-first experience with lightweight, elegant overlays

- Strong visual hierarchy and minimal clutter

- Polished SaaS interface quality similar to Google Maps, Linear, Stripe Dashboard, and modern mobility platforms

- Serious enough for public safety operations, but never intimidating, overly technical, neon-heavy, or gloomy

- Use clear human-centered labels instead of cryptic jargon

- Avoid dense tables, excessive borders, sharp corners, tiny text, or “hacker terminal” styling

PRODUCT CONTEXT

UrbanTrace AI helps city operators track vehicles across approved camera locations, identify likely vehicle matches, investigate traffic and policy alerts, and document reviewer decisions.

This screen is the focused “Operator Control Room.” There is no global top navigation in this view.

COLOR SYSTEM

Use these colors consistently:

- Midnight navy app shell / map framing: #101827

- Porcelain detail panels, cards, and evidence surfaces: #F7F8FA

- Signal cyan for active cameras, selected routes, primary actions, and high-confidence AI matches: #23B5D3

- Amber for uncertain AI matches requiring human review: #F4A340

- Red only for confirmed policy-critical events, such as blacklist hits: #D95763

- Muted slate for offline cameras, faded history, secondary information: #718096

- Main dark text on light cards: deep navy / charcoal

- Use soft shadows, subtle cool-gray borders, and restrained gradients

IMPORTANT AI-ETHICS UI RULE

Never show AI confidence in red.

- High confidence: cyan badge, for example “94% match”

- Needs human review: amber badge, for example “72% · review required”

- Red is reserved for confirmed policy-critical alert status only

- All uncertain matches must visibly include evidence and a reviewer action path

TYPOGRAPHY

Use a rounded, friendly sans-serif similar to Google Sans, Product Sans, Nunito Sans, or Manrope.

- Comfortable readable sizes

- Strong but not aggressive headings

- Avoid monospaced typography except perhaps small timestamp metadata

- Use sentence case and plain-language labels

PAGE LAYOUT

- Full-bleed hybrid satellite map dominates approximately 80% of the viewport.

- Right side contains a slim alert feed panel occupying approximately 20% of width.

- Alert feed is in expanded state.

- Add a second evidence drawer panel sliding in from the right over or adjacent to the alert feed, visibly showing the expanded state of one selected alert.

- The UI should remain believable at 1440 × 900 without feeling overcrowded.

- Preserve generous whitespace and clear layering.

MAP BACKGROUND

Create a realistic but fictional urban satellite/hybrid map:

- Slightly desaturated satellite imagery

- Visible roads, blocks, parks, river or rail corridor, and subtle neighborhood labels

- Add restrained map labels such as:

  - Central District

  - Riverfront

  - Civic Plaza

  - North Loop

  - East Market

- Use dark navy framing and a slight map vignette only if subtle

- Do not use default Google Maps controls or generic cluttered map chrome

MAP OVERLAYS

1. Floating search bar:

- Position top-center above the map

- Large rounded porcelain pill with a soft shadow

- Search icon on left

- Placeholder: “Search vehicle plate or location”

- Optional keyboard shortcut label on right, such as “⌘ K”

- It should feel like Google Maps search, but more premium and spacious

2. Camera pins:

- Add 6–8 circular camera pins across the map

- Online / active pins are cyan with a small camera icon

- Offline / inactive pins are muted slate

- Pins should have tiny subtle pulse rings only on active cameras

- Include labels only where necessary; keep map clean

- Example camera names:

  - CAM-12 · Civic Plaza

  - CAM-08 · Riverfront Ave

  - CAM-19 · North Loop

  - CAM-03 · East Market

3. Active vehicle trajectory:

- Draw one highlighted dotted or dashed cyan route connecting 4 camera sighting points

- Route should visibly travel across the map

- Include small timestamp dots at each camera hit

- Example timestamps: 08:41, 08:47, 08:53, 09:01

- Current / selected trajectory uses signal cyan

- Include one or two historical faded trajectories in muted slate for contextual comparison

- The selected vehicle route should feel visually important but not overpower the map

4. Camera video popup:

- Show one camera pin selected with an open floating popup near it

- Porcelain rounded card with clean shadow and small pointer toward selected pin

- Header:

  - small cyan camera-status dot

  - “CAM-12 · Civic Plaza”

  - “Live”

  - close icon top-right

- Body: realistic live-feed placeholder image, showing a city intersection from a traffic camera angle

- Add timestamp and small “Online” status beneath image

- Include a small action link/button: “Open full feed”

- The video popup should look like a refined map overlay, not a modal

RIGHT-SIDE ALERT FEED

Create an expanded fixed alert feed panel with porcelain background and soft visual separation from the map.

Panel header:

- Title: “Live alerts”

- Subtitle or status: “12 active”

- Small filter/settings icon

- Optional compact segmented control: “All / Review / Critical”

- Include a small collapse chevron indicating it can collapse to icons/badges only

Alert list:

- Reverse chronological list, newest first

- Five compact cards with rounded corners and good vertical rhythm

- Each card contains:

  - small plate crop thumbnail

  - vehicle plate number

  - timestamp

  - named location

  - confidence pill

  - optional status indicator

- Use believable Indian smart-city context and plates, while clearly indicating these are sample data

- Example entries:

  1. DL 8C AX 7284 — 09:14 — Civic Plaza — “94% match” cyan

  2. KA 01 MR 4412 — 09:08 — Riverfront Ave — “72% · review required” amber

  3. MH 12 QJ 1830 — 08:56 — North Loop — “97% match” cyan

  4. DL 3C BD 1109 — 08:43 — East Market — “Blacklist confirmed” with red left accent; confidence pill remains cyan such as “96% match”

  5. UP 16 EN 6821 — 08:31 — Metro Link — “68% · review required” amber

ALERT CARD STYLING

- Compact but highly legible

- Use a small vehicle plate crop thumbnail, not a generic avatar

- High-confidence pill: pale cyan background with cyan text/icon

- Needs-review pill: pale amber background with amber text/icon

- Confirmed blacklist alert: red vertical left border / red status icon only

- Do not turn the entire critical card red

- Selected card should have a subtly elevated or highlighted state

OPEN ALERT EVIDENCE PANEL

Show the fourth alert selected and expanded in a right-side evidence drawer.

Drawer styling:

- Porcelain background

- Wider than the regular alert feed, approximately 380–440 px

- Soft shadow and rounded left edge

- Top area includes back arrow, title “Alert review,” and close icon

Selected alert:

- Plate: “DL 3C BD 1109”

- Status: “Confirmed blacklist alert”

- Location: “East Market”

- Time: “08:43”

- Red policy-critical status treatment should be present but controlled and tasteful

Evidence sections:

1. Plate evidence

- Large realistic plate crop image

- Show camera reference: “CAM-03 · East Market”

- Add capture timestamp and image quality label

2. Match analysis

- Label: “Embedding similarity”

- Show a clear value such as “0.96”

- Show a visual confidence meter in cyan, not red

- Supporting microcopy: “High visual similarity across 3 camera sightings”

3. Route evidence

- Small map thumbnail showing matched route and camera points

- Cyan selected route

- Label: “Observed route · 08:19–08:43”

4. Reviewer note

- Small text area or existing note:

  “Plate and vehicle profile verified against watchlist record.”

5. Reviewer actions

- Primary button: “Confirm”

- Secondary button: “Escalate”

- Tertiary neutral button: “Dismiss”

- Make buttons clear and accessible

- Confirm can use cyan; Escalate may use red outline/text only where appropriate; Dismiss should be neutral

- Add a small audit note: “Actions are logged to the review audit trail”

INTERACTION STATES TO VISUALLY DEMONSTRATE

The mockup must visibly communicate:

- Expanded alert feed

- One alert selected

- Evidence drawer open

- One active selected camera

- Live camera popup open

- Active cyan vehicle route

- Faded historical routes

- Online and offline camera pins

- High-confidence, review-required, and confirmed-critical alert states

ACCESSIBILITY AND USABILITY

- Ensure high contrast for all text and status labels

- Never communicate state only through color; pair colors with plain-language labels or icons

- Use large hit targets, especially for map pins and panel actions

- Keep status information calm and readable

- Use clear headings, spacious cards, and predictable action placement

DO NOT INCLUDE

- No top navigation bar

- No military/tactical styling

- No glowing neon grid

- No matrix/hacker visual language

- No overly dense dashboards, charts, or data tables

- No generic stock admin dashboard layout

- No red AI confidence score

- No excessive badges, icons, borders, or map labels

- No facial recognition UI or biometric identification features

FINAL OUTPUT

Generate a single realistic, polished, high-fidelity dashboard screen. It should look presentation-ready for a Smart India Hackathon / civic-tech demo, with a strong product-design sensibility and enough sample data to clearly explain the workflow at a glance.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ab5c8ba6-d137-424b-b57d-0c4c530eec1f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
