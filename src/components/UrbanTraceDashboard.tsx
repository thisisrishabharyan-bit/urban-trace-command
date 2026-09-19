import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Camera,
  Check,
  ChevronRight,
  ChevronsRight,
  CircleAlert,
  Clock3,
  ExternalLink,
  Filter,
  LocateFixed,
  MapPin,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  X,
} from "lucide-react";

import aerialMap from "@/assets/urbantrace-aerial-map.jpg";
import cameraFeed from "@/assets/civic-plaza-camera.jpg";
import plateEvidence from "@/assets/plate-evidence.jpg";

type AlertKind = "match" | "review" | "critical";

type AlertItem = {
  id: number;
  plate: string;
  time: string;
  location: string;
  confidence: string;
  kind: AlertKind;
};

const alerts: AlertItem[] = [
  { id: 1, plate: "DL 8C AX 7284", time: "09:14", location: "Civic Plaza", confidence: "94% match", kind: "match" },
  { id: 2, plate: "KA 01 MR 4412", time: "09:08", location: "Riverfront Ave", confidence: "72% · review required", kind: "review" },
  { id: 3, plate: "MH 12 QJ 1830", time: "08:56", location: "North Loop", confidence: "97% match", kind: "match" },
  { id: 4, plate: "DL 3C BD 1109", time: "08:43", location: "East Market", confidence: "96% match", kind: "critical" },
  { id: 5, plate: "UP 16 EN 6821", time: "08:31", location: "Metro Link", confidence: "68% · review required", kind: "review" },
];

const cameras = [
  { id: "12", name: "Civic Plaza", x: 48, y: 44, online: true, selected: true },
  { id: "08", name: "Riverfront Ave", x: 18, y: 58, online: true },
  { id: "19", name: "North Loop", x: 59, y: 19, online: true },
  { id: "03", name: "East Market", x: 74, y: 61, online: true },
  { id: "17", name: "Central District", x: 58, y: 76, online: true },
  { id: "21", name: "Lake Park", x: 79, y: 27, online: false },
  { id: "05", name: "West Bridge", x: 27, y: 36, online: true },
  { id: "10", name: "Metro Link", x: 83, y: 82, online: false },
];

const labels = [
  { name: "RIVERFRONT", x: 15, y: 35 },
  { name: "CENTRAL DISTRICT", x: 46, y: 68 },
  { name: "CIVIC PLAZA", x: 45, y: 31 },
  { name: "NORTH LOOP", x: 57, y: 9 },
  { name: "EAST MARKET", x: 78, y: 49 },
];

function PlateThumb({ critical = false }: { critical?: boolean }) {
  return (
    <div className="plate-thumb" aria-hidden="true">
      <img src={plateEvidence} alt="" width={1152} height={576} />
      {critical && <span className="plate-alert-dot"><ShieldAlert size={10} /></span>}
    </div>
  );
}

function CameraPin({ camera: item, onSelect }: { camera: (typeof cameras)[number]; onSelect: () => void }) {
  return (
    <button
      type="button"
      className={`camera-pin ${item.online ? "camera-pin-online" : "camera-pin-offline"} ${item.selected ? "camera-pin-selected" : ""}`}
      style={{ left: `${item.x}%`, top: `${item.y}%` }}
      aria-label={`${item.online ? "Online" : "Offline"} camera CAM-${item.id}, ${item.name}`}
      onClick={onSelect}
    >
      {item.online && <span className="pin-pulse" />}
      <span className="pin-core"><Camera size={15} strokeWidth={2.2} /></span>
      {(item.selected || !item.online) && <span className="pin-label">CAM-{item.id}</span>}
    </button>
  );
}

function AlertCard({ alert, selected, onSelect }: { alert: AlertItem; selected: boolean; onSelect: () => void }) {
  const needsReview = alert.kind === "review";
  return (
    <button
      type="button"
      className={`alert-card ${selected ? "alert-card-selected" : ""} ${alert.kind === "critical" ? "alert-card-critical" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <PlateThumb critical={alert.kind === "critical"} />
      <span className="alert-card-copy">
        <span className="alert-card-topline">
          <strong>{alert.plate}</strong>
          <time>{alert.time}</time>
        </span>
        <span className="alert-location"><MapPin size={12} />{alert.location}</span>
        {alert.kind === "critical" && <span className="critical-label"><ShieldAlert size={11} /> Blacklist confirmed</span>}
        <span className={`confidence-badge ${needsReview ? "confidence-review" : "confidence-match"}`}>
          {needsReview ? <CircleAlert size={11} /> : <Check size={11} />}{alert.confidence}
        </span>
      </span>
      <ChevronRight className="alert-chevron" size={16} />
    </button>
  );
}

export function UrbanTraceDashboard() {
  const [filter, setFilter] = useState<"All" | "Review" | "Critical">("All");
  const [selectedAlert, setSelectedAlert] = useState(4);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [popupOpen, setPopupOpen] = useState(true);
  const [actionStatus, setActionStatus] = useState<string | null>(null);

  const visibleAlerts = useMemo(() => alerts.filter((alert) => {
    if (filter === "Review") return alert.kind === "review";
    if (filter === "Critical") return alert.kind === "critical";
    return true;
  }), [filter]);

  const chooseAlert = (id: number) => {
    setSelectedAlert(id);
    setDrawerOpen(true);
    setActionStatus(null);
  };

  return (
    <main className="control-room">
      <section className="map-stage" aria-label="Urban vehicle tracking map">
        <img className="map-image" src={aerialMap} alt="Aerial map of the fictional UrbanTrace operating area" width={1536} height={1024} />
        <div className="map-wash" />

        <div className="brand-lockup" aria-label="UrbanTrace AI Operator Control Room">
          <span className="brand-symbol"><LocateFixed size={19} /></span>
          <span><strong>UrbanTrace AI</strong><small>Operator control room</small></span>
        </div>

        <label className="map-search">
          <Search size={19} />
          <input aria-label="Search vehicle plate or location" placeholder="Search vehicle plate or location" />
          <kbd>⌘ K</kbd>
        </label>

        <div className="sample-chip"><span /> Sample operations data</div>

        {labels.map((label) => (
          <span className="map-label" key={label.name} style={{ left: `${label.x}%`, top: `${label.y}%` }}>{label.name}</span>
        ))}

        <svg className="route-layer" viewBox="0 0 1000 900" preserveAspectRatio="none" aria-hidden="true">
          <path className="history-route" d="M90,230 C220,330 290,690 480,744 S755,665 930,825" />
          <path className="history-route history-route-two" d="M170,760 C330,610 400,570 530,590 S790,350 920,300" />
          <path className="active-route-halo" d="M185,523 C285,490 355,430 474,396 S610,430 730,550" />
          <path className="active-route" d="M185,523 C285,490 355,430 474,396 S610,430 730,550" />
          {[
            { x: 185, y: 523, t: "08:41" },
            { x: 338, y: 445, t: "08:47" },
            { x: 474, y: 396, t: "08:53" },
            { x: 730, y: 550, t: "09:01" },
          ].map((point) => (
            <g key={point.t}>
              <circle className="route-dot-ring" cx={point.x} cy={point.y} r="9" />
              <circle className="route-dot" cx={point.x} cy={point.y} r="4" />
              <rect className="route-time-bg" x={point.x - 22} y={point.y + 12} width="44" height="19" rx="8" />
              <text className="route-time" x={point.x} y={point.y + 25}>{point.t}</text>
            </g>
          ))}
        </svg>

        {cameras.map((item) => <CameraPin key={item.id} camera={item} onSelect={() => item.id === "12" && setPopupOpen(true)} />)}

        {popupOpen && (
          <aside className="camera-popup" aria-label="Live camera CAM-12 Civic Plaza">
            <div className="camera-popup-head">
              <span className="status-dot" /><div><strong>CAM-12 · Civic Plaza</strong><span>Live camera</span></div>
              <span className="live-badge">Live</span>
              <button type="button" className="icon-button" aria-label="Close camera preview" onClick={() => setPopupOpen(false)}><X size={16} /></button>
            </div>
            <div className="camera-video">
              <img src={cameraFeed} alt="Live view of the Civic Plaza intersection" width={1088} height={608} />
              <span className="camera-reticle" />
              <span className="camera-time-overlay">09:16:24 IST</span>
            </div>
            <div className="camera-popup-foot">
              <span><span className="status-dot" /> Online · updated now</span>
              <button type="button">Open full feed <ExternalLink size={13} /></button>
            </div>
          </aside>
        )}

        <div className="map-legend">
          <span><i className="legend-camera-online" />Active camera</span>
          <span><i className="legend-camera-offline" />Offline</span>
          <span><i className="legend-route" />Selected route</span>
        </div>
      </section>

      <aside className="alert-feed" aria-label="Live alerts">
        <header className="alert-header">
          <div className="alert-title-row">
            <div><span className="eyebrow"><span className="status-dot" /> Monitoring live</span><h1>Live alerts</h1></div>
            <span className="active-count">12 active</span>
            <button type="button" className="icon-button" aria-label="Alert settings"><SlidersHorizontal size={17} /></button>
          </div>
          <div className="filter-row">
            <div className="segments" aria-label="Alert filter">
              {(["All", "Review", "Critical"] as const).map((item) => (
                <button type="button" key={item} className={filter === item ? "segment-active" : ""} onClick={() => setFilter(item)}>{item}</button>
              ))}
            </div>
            <button type="button" className="collapse-button" aria-label="Collapse alert feed"><ChevronsRight size={17} /></button>
          </div>
        </header>

        <div className="alert-list">
          <div className="list-caption"><span>Newest first</span><span><Filter size={12} /> Auto-prioritised</span></div>
          {visibleAlerts.map((alert) => <AlertCard key={alert.id} alert={alert} selected={selectedAlert === alert.id} onSelect={() => chooseAlert(alert.id)} />)}
        </div>
        <footer className="feed-footer"><Clock3 size={13} /> Synced 4 seconds ago</footer>
      </aside>

      {drawerOpen && (
        <aside className="evidence-drawer" aria-label="Alert review evidence">
          <header className="drawer-header">
            <button type="button" className="icon-button" aria-label="Back to alerts" onClick={() => setDrawerOpen(false)}><ArrowLeft size={18} /></button>
            <div><h2>Alert review</h2><p>Evidence and reviewer decision</p></div>
            <button type="button" className="icon-button" aria-label="Close evidence panel" onClick={() => setDrawerOpen(false)}><X size={18} /></button>
          </header>

          <div className="drawer-scroll">
            <section className="selected-summary">
              <div className="summary-title"><div><span className="critical-kicker"><ShieldAlert size={13} /> Confirmed blacklist alert</span><h3>DL 3C BD 1109</h3></div><span className="confidence-badge confidence-match"><Check size={11} />96% match</span></div>
              <div className="summary-meta"><span><MapPin size={13} />East Market</span><span><Clock3 size={13} />08:43</span></div>
            </section>

            <section className="evidence-section">
              <div className="section-title"><div><span>01</span><h4>Plate evidence</h4></div><span className="quality-label"><Check size={11} /> Good quality</span></div>
              <div className="evidence-image"><img src={plateEvidence} alt="Captured plate DL 3C BD 1109" width={1152} height={576} /><span className="capture-frame" /></div>
              <div className="evidence-caption"><strong>CAM-03 · East Market</strong><span>Captured 08:43:17 IST</span></div>
            </section>

            <section className="evidence-section analysis-section">
              <div className="section-title"><div><span>02</span><h4>Match analysis</h4></div></div>
              <div className="metric-row"><div><span>Embedding similarity</span><strong>0.96</strong></div><span className="analysis-verdict"><Check size={12} /> High similarity</span></div>
              <div className="confidence-meter"><span style={{ width: "96%" }} /></div>
              <p>High visual similarity across 3 camera sightings</p>
            </section>

            <section className="evidence-section">
              <div className="section-title"><div><span>03</span><h4>Route evidence</h4></div><span className="sighting-count">3 sightings</span></div>
              <div className="mini-map">
                <img src={aerialMap} alt="Observed vehicle route from 08:19 to 08:43" width={1536} height={1024} />
                <svg viewBox="0 0 360 110" preserveAspectRatio="none" aria-hidden="true"><path d="M28 78 C90 20, 160 90, 224 48 S315 36, 338 22" />{[[28,78],[146,69],[224,48],[338,22]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />)}</svg>
                <span>CAM-03</span>
              </div>
              <div className="route-caption"><strong>Observed route</strong><span>08:19–08:43 · 6.2 km</span></div>
            </section>

            <section className="evidence-section note-section">
              <div className="section-title"><div><span>04</span><h4>Reviewer note</h4></div><span className="saved-label">Saved</span></div>
              <textarea aria-label="Reviewer note" defaultValue="Plate and vehicle profile verified against watchlist record." />
            </section>
          </div>

          <footer className="drawer-actions">
            {actionStatus && <div className="action-toast"><Check size={14} />{actionStatus}</div>}
            <div className="action-row">
              <button type="button" className="button-primary" onClick={() => setActionStatus("Alert confirmed and logged")}>Confirm</button>
              <button type="button" className="button-escalate" onClick={() => setActionStatus("Alert escalated for priority review")}>Escalate</button>
              <button type="button" className="button-neutral" onClick={() => setActionStatus("Alert dismissed with audit note")}>Dismiss</button>
            </div>
            <p><ShieldAlert size={12} /> Actions are logged to the review audit trail</p>
          </footer>
        </aside>
      )}
    </main>
  );
}