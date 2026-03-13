import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, ReferenceLine } from "recharts";

const C = {
  bg: "#F5F2EB",
  card: "#FFFFFF",
  border: "#D6D1C7",
  borderLight: "#E8E4DB",
  dark: "#2C2C2C",
  darkMid: "#444",
  red: "#C0392B",
  green: "#217844",
  text: "#2C2C2C",
  muted: "#777",
  dim: "#999",
  gold: "#A67C00",
  blue: "#2B5EA7",
  purple: "#6B3FA0",
  cyan: "#1A7A7A",
  orange: "#BF5B17",
  headerBg: "#2C2C2C",
  headerText: "#F5F2EB",
};

const FONT = "'IBM Plex Serif', serif";
const MONO = "'IBM Plex Mono', monospace";
const ELECTION_COST = 70;
const TOTAL_BUDGET = 64203;
const ELECTION_PCT = ((ELECTION_COST / TOTAL_BUDGET) * 100).toFixed(2);

const barData = [
  { name: "Political\nAppointees", value: 384, fill: C.red, note: "~2,000 appointees annually — Muizzu promised 700" },
  { name: "Ex-President\nBenefits", value: 115.3, fill: C.gold, note: "Accumulated since 2010" },
  { name: "VIA Terminal\nCeremony", value: 100, fill: C.purple, note: "Fireworks for incomplete terminal" },
  { name: "Ex-MP\nBenefits", value: 35, fill: C.blue, note: "Accumulated allowances" },
  { name: "Inauguration\nCeremony", value: 22.9, fill: C.cyan, note: "Presidential inauguration 2023" },
];

const equivalenceData = [
  { label: "Political Appointee Salaries", value: 384, color: C.red, desc: "Annual cost of ~2,000 political appointees — Muizzu promised to cap at 700" },
  { label: "VIA Terminal Fireworks", value: 100, color: C.purple, desc: "One ceremony for a terminal that wasn't even finished" },
  { label: "Ex-President Benefits", value: 115.3, color: C.gold, desc: "Gayoom alone received MVR 54.4M since 2010" },
  { label: "Annual Budget Deficit", value: 8840, color: C.orange, desc: "The deficit this government is running every single year" },
  { label: "Rasmalé Reclamation", value: 1000, color: C.blue, desc: "Land reclamation mega-project cost" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.[0]) {
    const d = payload[0].payload;
    return (
      <div style={{ background: C.dark, border: "none", padding: "10px 14px", maxWidth: 230 }}>
        <p style={{ color: C.headerText, fontWeight: 700, margin: 0, fontSize: 14, fontFamily: MONO }}>
          MVR {d.value}M
        </p>
        <p style={{ color: "#8BC48E", fontWeight: 600, margin: "3px 0 2px", fontSize: 12, fontFamily: MONO }}>
          = {(d.value / ELECTION_COST).toFixed(1)} elections
        </p>
        <p style={{ color: "#AAA", margin: "2px 0 0", fontSize: 11, lineHeight: 1.4, fontFamily: FONT }}>
          {d.note}
        </p>
      </div>
    );
  }
  return null;
};

const CustomXTick = ({ x, y, payload }) => {
  const lines = payload.value.split("\n");
  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, i) => (
        <text key={i} x={0} y={i * 13} dy={12} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={MONO}>{line}</text>
      ))}
    </g>
  );
};

const ElectionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
    <rect x="1" y="2" width="14" height="12" rx="1" fill="none" stroke={C.green} strokeWidth="1.3" />
    <path d="M5 8l2 2 4-4" stroke={C.green} strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ElectionCostComparison() {
  const [view, setView] = useState("bars");

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: FONT, color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Serif:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Dark header */}
        <div style={{ background: C.headerBg, padding: "28px 32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ fontFamily: FONT, fontStyle: "italic", fontSize: 13, color: "#999", margin: "0 0 6px" }}>
                Hingaa Male' · ހިންގާ މާލެ
              </p>
              <h1 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 26, margin: "0 0 6px", lineHeight: 1.2, color: C.headerText }}>
                Referendum Fact Check
              </h1>
              <p style={{ fontFamily: FONT, fontSize: 14, color: "#CCC", margin: 0, lineHeight: 1.5, maxWidth: 520 }}>
                One election costs <strong style={{ color: C.headerText }}>MVR 60–80 million</strong>.
                Here is what the government spends without blinking.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: MONO, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#888", margin: "0 0 4px" }}>
                April 4, 2026
              </p>
              <p style={{ fontFamily: MONO, fontSize: 12, color: "#AAA", margin: 0 }}>
                #1 · Ahmed Aiham
              </p>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${C.border}` }}>
          {[
            { label: "Cost of One Election", value: "MVR 70M", sub: "MVR 60–80M range", color: C.green, highlight: true },
            { label: "Political Appointees / yr", value: "MVR 384M", sub: "= 5.5 elections every year", color: C.red },
            { label: "2026 Total Budget", value: "MVR 64.2B", sub: `One election = ${ELECTION_PCT}% of this`, color: C.blue },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: "18px 24px",
              background: s.highlight ? "#F0F7F2" : C.card,
              borderRight: i < 2 ? `1px solid ${C.border}` : "none",
              position: "relative",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: s.color }} />
              <p style={{ fontSize: 10, color: C.dim, margin: 0, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, fontFamily: MONO }}>{s.label}</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: s.highlight ? s.color : C.text, margin: "6px 0 2px", fontFamily: MONO, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 12, color: C.muted, margin: 0, fontFamily: FONT, fontStyle: "italic" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Body */}
        <div style={{ padding: "24px 32px" }}>

          {/* Tabs */}
          <div style={{
            display: "flex", gap: 0, marginBottom: 20,
            borderBottom: `1px solid ${C.border}`, width: "fit-content",
          }}>
            {[
              { key: "bars", label: "Spending vs. Elections" },
              { key: "equivalence", label: "What Buys How Many" },
              { key: "budget", label: "Budget Scale" },
            ].map(tab => (
              <button key={tab.key} onClick={() => setView(tab.key)} style={{
                padding: "8px 20px", border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600, fontFamily: MONO,
                textTransform: "uppercase", letterSpacing: "0.04em",
                background: view === tab.key ? C.dark : "transparent",
                color: view === tab.key ? C.headerText : C.muted,
                transition: "all 0.15s",
              }}>{tab.label}</button>
            ))}
          </div>

          {/* Chart panel */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: "24px 24px 20px", marginBottom: 28 }}>

            {view === "bars" && (
              <>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 3px", fontFamily: FONT }}>
                  Each bar vs. the cost of one election
                </h2>
                <p style={{ fontSize: 12, color: C.dim, margin: "0 0 18px", fontFamily: FONT, fontStyle: "italic" }}>
                  The dashed green line marks <strong style={{ color: C.green, fontStyle: "normal" }}>MVR 70M</strong> — approximately what one election costs
                </p>
                <ResponsiveContainer width="100%" height={380}>
                  <BarChart data={barData} margin={{ top: 8, right: 16, left: 8, bottom: 36 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} vertical={false} />
                    <XAxis dataKey="name" tick={<CustomXTick />} axisLine={{ stroke: C.border }} tickLine={false} interval={0} height={44} />
                    <YAxis
                      tick={{ fill: C.dim, fontSize: 11, fontFamily: MONO }}
                      axisLine={false} tickLine={false}
                      tickFormatter={v => `${v}M`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "#2C2C2C08" }} />
                    <ReferenceLine
                      y={ELECTION_COST}
                      stroke={C.green}
                      strokeDasharray="6 4"
                      strokeWidth={1.5}
                      label={{
                        value: "← Cost of ONE election",
                        position: "right",
                        fill: C.green,
                        fontSize: 11,
                        fontWeight: 700,
                        fontFamily: MONO,
                      }}
                    />
                    <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={56}>
                      {barData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p style={{ fontSize: 12, color: C.dim, margin: "10px 0 0", textAlign: "center", fontStyle: "italic" }}>
                  "Remove just 28 political appointees and you save more than one election costs." — Former Min. Fayyaz Ismail
                </p>
              </>
            )}

            {view === "equivalence" && (
              <>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 3px", fontFamily: FONT }}>
                  How many elections could each expenditure fund?
                </h2>
                <p style={{ fontSize: 12, color: C.dim, margin: "0 0 22px", fontFamily: FONT, fontStyle: "italic" }}>
                  Each ballot icon = one full national election (≈ MVR 70M)
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {equivalenceData.map((item, i) => {
                    const count = item.value / ELECTION_COST;
                    const showCount = Math.min(Math.floor(count), 14);
                    const hasMore = count > 14;
                    return (
                      <div key={i} style={{
                        padding: "14px 0",
                        borderBottom: i < equivalenceData.length - 1 ? `1px solid ${C.borderLight}` : "none",
                      }}>
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, marginBottom: 6 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, fontFamily: FONT }}>{item.label}</span>
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <span style={{ fontSize: 20, fontWeight: 700, color: item.color, fontFamily: MONO }}>
                              {count >= 10 ? Math.round(count) : count.toFixed(1)}
                            </span>
                            <span style={{ fontSize: 11, color: C.muted, marginLeft: 4, fontFamily: MONO }}>elections</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 3, alignItems: "center", marginBottom: 4 }}>
                          {Array.from({ length: showCount }).map((_, j) => <ElectionIcon key={j} />)}
                          {hasMore && (
                            <span style={{ fontSize: 11, color: item.color, fontWeight: 700, marginLeft: 4, fontFamily: MONO }}>
                              +{Math.round(count) - showCount} more
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: 12, color: C.dim, margin: 0, fontStyle: "italic" }}>{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <div style={{
                  marginTop: 18, padding: "14px 16px",
                  background: "#F0F7F2", border: `1px solid #B5D4BC`,
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <ElectionIcon />
                  <p style={{ fontSize: 13, color: C.green, margin: 0, fontWeight: 600, lineHeight: 1.5, fontFamily: FONT }}>
                    The referendum proposes to permanently remove one election from the democratic calendar.
                    That's MVR 70M — less than a fireworks show for an unfinished airport.
                  </p>
                </div>
              </>
            )}

            {view === "budget" && (
              <>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 3px", fontFamily: FONT }}>
                  One election inside the national budget
                </h2>
                <p style={{ fontSize: 12, color: C.dim, margin: "0 0 24px", fontFamily: FONT, fontStyle: "italic" }}>
                  MVR 70M in a MVR 64,200M budget — can you even see it?
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 36, flexWrap: "wrap" }}>
                  <div style={{ width: 240, height: 240 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={[{ name: "Budget", value: TOTAL_BUDGET - ELECTION_COST }, { name: "Election", value: ELECTION_COST }]}
                          cx="50%" cy="50%"
                          outerRadius={110} innerRadius={65}
                          dataKey="value"
                          startAngle={90} endAngle={-270}
                          stroke="none"
                        >
                          <Cell fill={C.borderLight} />
                          <Cell fill={C.green} />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 22 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <div style={{ width: 10, height: 10, background: C.green }} />
                        <span style={{ fontSize: 12, color: C.muted, fontFamily: MONO }}>One Election</span>
                      </div>
                      <p style={{ fontSize: 30, fontWeight: 700, color: C.green, margin: "0 0 1px", fontFamily: MONO }}>{ELECTION_PCT}%</p>
                      <p style={{ fontSize: 12, color: C.dim, margin: 0, fontFamily: FONT, fontStyle: "italic" }}>~MVR 70M of MVR 64,200M</p>
                    </div>
                    <div style={{ marginBottom: 22 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <div style={{ width: 10, height: 10, background: C.borderLight }} />
                        <span style={{ fontSize: 12, color: C.muted, fontFamily: MONO }}>Everything Else</span>
                      </div>
                      <p style={{ fontSize: 30, fontWeight: 700, color: C.text, margin: "0 0 1px", fontFamily: MONO }}>{(100 - parseFloat(ELECTION_PCT)).toFixed(2)}%</p>
                      <p style={{ fontSize: 12, color: C.dim, margin: 0, fontFamily: FONT, fontStyle: "italic" }}>Including 2,000 political appointees, fireworks, futsal trips…</p>
                    </div>
                    <div style={{ padding: "10px 14px", background: "#FDF2F1", border: `1px solid #E8B4B0` }}>
                      <p style={{ fontSize: 12, color: C.red, margin: 0, lineHeight: 1.5, fontWeight: 500, fontFamily: FONT }}>
                        A president who spent MVR 100M on fireworks says democracy is too expensive at MVR 70M.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Summary table */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 14px", fontFamily: FONT }}>
              What MVR 70M Looks Like Next to Everything Else
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${C.dark}` }}>
                    {["Expenditure", "Amount (MVR)", "= How Many Elections"].map(h => (
                      <th key={h} style={{
                        textAlign: "left", padding: "8px 10px", color: C.dim,
                        fontWeight: 600, fontSize: 10, textTransform: "uppercase",
                        letterSpacing: "0.08em", fontFamily: MONO,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Political Appointee Salaries (annual)", "384M", "5.5", C.red],
                    ["Rasmalé Land Reclamation", "1,000M+", "14+", C.blue],
                    ["Ex-President Benefits (accum.)", "115.3M", "1.6", C.gold],
                    ["VIA Terminal Inauguration Ceremony", "100M", "1.4", C.purple],
                    ["Annual Budget Deficit (2026)", "8,840M", "126", C.orange],
                    ["Ex-MP Benefits (accum.)", "35M", "0.5", C.cyan],
                    ["Presidential Inauguration", "22.9M", "0.3", C.cyan],
                  ].map(([name, amt, equiv, color], i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                      <td style={{ padding: "9px 10px", color: C.text, fontWeight: 500, fontFamily: FONT }}>
                        <span style={{ display: "inline-block", width: 8, height: 8, background: color, marginRight: 8 }} />
                        {name}
                      </td>
                      <td style={{ padding: "9px 10px", color: C.muted, fontWeight: 600, fontFamily: MONO }}>{amt}</td>
                      <td style={{ padding: "9px 10px", color: C.red, fontWeight: 700, fontFamily: MONO }}>{equiv} elections</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: `2px solid ${C.green}` }}>
                    <td style={{ padding: "10px 10px", color: C.green, fontWeight: 700, fontFamily: FONT }}>✓ One Parliamentary Election</td>
                    <td style={{ padding: "10px 10px", color: C.green, fontWeight: 700, fontFamily: MONO }}>~70M</td>
                    <td style={{ padding: "10px 10px", color: C.green, fontWeight: 700, fontFamily: MONO }}>1 election</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          background: C.headerBg, padding: "16px 32px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 8,
        }}>
          <p style={{ fontFamily: MONO, fontSize: 11, color: "#888", margin: 0 }}>
            hingaamale.com/ledger
          </p>
          <p style={{ fontFamily: FONT, fontSize: 11, fontStyle: "italic", color: "#888", margin: 0 }}>
            Sources: Elections Commission · 2026 Budget Report
          </p>
        </div>
      </div>
    </div>
  );
}
