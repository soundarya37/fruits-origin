import { useState, useEffect, useRef } from "react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Space+Mono:wght@400;700&display=swap');`;

const INK = "#1F2E22";
const PANEL = "#28392A";
const PANEL_SOFT = "#324434";
const PAPER = "#E8DFC8";
const PAPER_SOFT = "#F1E9D2";
const TEXT_LIGHT = "#F4ECD8";
const TEXT_MUTED = "#B9C4AE";
const GOLD = "#C9A24B";

const FRUITS = [
  { id: "mango", name: "Mango", emoji: "\u{1F96D}", region: "Both", accent: "#E08A2C",
    origin: "First grew wild in the foothills between India and Myanmar over 4,000 years ago, then followed monks, traders, and colonizers to East Africa, Brazil, and eventually Mexico.",
    peak: [3,4,5,6],
    story: "Before it was a smoothie, the mango was a gift fit for kings — Mughal emperors planted orchards of a hundred thousand trees. It crossed the Arabian Sea on merchant dhows before it ever saw a Veracruz orchard." },
  { id: "jackfruit", name: "Jackfruit", emoji: "\u{1FAD8}", region: "Tamil Nadu", accent: "#7FA33B",
    origin: "Native to the rainforests of the Western Ghats in southern India, where it still grows wild.",
    peak: [4,5,6,7],
    story: "The largest tree-borne fruit in the world hides a hundred separate fruits under one spiky shell. In Tamil villages a single tree was once considered enough to feed a family through the lean months." },
  { id: "guava", name: "Guava", emoji: "\u{1F535}", region: "Both", accent: "#C9556B",
    origin: "Originated in southern Mexico and Central America, carried across the Pacific by Spanish and Portuguese traders to India in the 17th century.",
    peak: [10,11,12,1],
    story: "It left Mexico as a stowaway on colonial ships and came back centuries later as an entirely different fruit — sweeter, pinker, sold in spiced wedges on Tamil Nadu roadsides." },
  { id: "custard-apple", name: "Custard Apple", emoji: "\u{1F34F}", region: "Tamil Nadu", accent: "#9B8B5B",
    origin: "A South American native, likely from the Caribbean and Central America, that reached India with Portuguese traders around the 16th century.",
    peak: [9,10,11],
    story: "Its bumpy green skin hides something closer to custard than fruit — locals call it sitaphal, 'Sita's fruit,' after the goddess of the Ramayana." },
  { id: "sapota", name: "Sapota (Chikoo)", emoji: "\u{1F330}", region: "Tamil Nadu", accent: "#8B5E3C",
    origin: "Native to Mexico, Belize, and Guatemala — the same tree that gives us chicle, the original chewing gum base.",
    peak: [1,2,3,12],
    story: "Long before it was a South Indian breakfast staple, its sap was harvested by Maya chewers and, later, the Wrigley company. The fruit only came along for the ride." },
  { id: "pomegranate", name: "Pomegranate", emoji: "\u{1F49A}", region: "Both", accent: "#A82D3B",
    origin: "Originated in the region stretching from Iran to northern India, cultivated for over 4,000 years.",
    peak: [9,10,11,2],
    story: "Persian gardens grew it as a symbol of abundance long before it reached Tamil Nadu's dry interior, where it thrives on very little water and gives back jewel-red seeds by the hundred." },
  { id: "banana", name: "Banana", emoji: "\u{1F34C}", region: "Both", accent: "#E8C547",
    origin: "Domesticated in Southeast Asia and New Guinea over 7,000 years ago, spread west through India and later to the Americas by Portuguese traders.",
    peak: [1,2,3,4,5,6,7,8,9,10,11,12],
    story: "One of the only fruits with no real off-season — it fruits year-round in both Tamil Nadu and Mexico, which is why it ended up as the everyday fruit of two very different kitchens." },
  { id: "amla", name: "Gooseberry (Amla)", emoji: "\u{1F7E2}", region: "Tamil Nadu", accent: "#8FA35E",
    origin: "Native to the Indian subcontinent, referenced in Ayurvedic texts more than 2,000 years old.",
    peak: [11,12,1,2],
    story: "Too sour to eat plain, too revered to skip — Ayurveda calls it one of the great rejuvenators, and Tamil households still pickle it the moment it appears in the winter markets." },
  { id: "papaya", name: "Papaya", emoji: "\u{1F349}", region: "Both", accent: "#E8892C",
    origin: "Native to southern Mexico and Central America, one of the first American fruits to be carried across the world by Spanish sailors.",
    peak: [1,2,3,4,5,6,7,8,9,10,11,12],
    story: "It grows almost carelessly fast — a seed can become a fruiting tree in under a year, which is exactly why Spanish galleons found it so easy to spread from Mexico to every port they touched." },
  { id: "tamarind", name: "Tamarind", emoji: "\u{1F330}", region: "Both", accent: "#6B4226",
    origin: "Native to tropical Africa, but has grown in India for so long — over a thousand years — that it's often mistaken as native there.",
    peak: [1,2,3],
    story: "Its name comes from Arabic tamr hindi, 'date of India' — a fruit so thoroughly adopted by Tamil kitchens that most people never learn it began its journey in Sudan." },
  { id: "dragon-fruit", name: "Dragon Fruit", emoji: "\u{1F409}", region: "Mexico", accent: "#D6316B",
    origin: "Native to southern Mexico and Central America, where it grows wild on a climbing cactus.",
    peak: [6,7,8,9],
    story: "Long before it became an Instagram staple in Asia, it was a modest cactus fruit called pitahaya, gathered from vines climbing dry forest trees in Oaxaca and Chiapas." },
  { id: "mamey", name: "Mamey Sapote", emoji: "\u{1F360}", region: "Mexico", accent: "#B5502A",
    origin: "Native to southern Mexico and Central America, cultivated by the Maya and Aztec long before European contact.",
    peak: [4,5,6,7],
    story: "Its pumpkin-colored flesh tastes like a cross between sweet potato and cherry — the Aztecs valued it enough to trade it across the empire on foot, centuries before refrigeration existed." },
  { id: "soursop", name: "Soursop (Guanabana)", emoji: "\u{1F49A}", region: "Mexico", accent: "#5C8A3A",
    origin: "Native to the Caribbean and Central America, spread through the tropics by early Spanish and Portuguese trade routes.",
    peak: [8,9,10,11],
    story: "Spiky on the outside, custardy and tart within — it became a staple aguas frescas flavor in Mexico long before scientists got curious about its leaves." },
  { id: "tuna", name: "Tuna (Prickly Pear)", emoji: "\u{1F335}", region: "Mexico", accent: "#C23B5A",
    origin: "Native to the arid highlands of central Mexico, where the nopal cactus that bears it is a national symbol.",
    peak: [7,8,9,10],
    story: "It sits at the center of Mexico's founding myth — an eagle on a cactus eating a serpent — and centuries later still ripens on the same rugged cactus paddles across the high desert." },
  { id: "zapote-negro", name: "Black Zapote", emoji: "\u{2B1B}", region: "Mexico", accent: "#4A3B2A",
    origin: "Native to eastern Mexico and Central America, cultivated since before the Spanish arrived.",
    peak: [11,12,1,2],
    story: "Nicknamed the 'chocolate pudding fruit' for its dark, custardy flesh — Aztec markets sold it centuries before cacao and this fruit ever ended up compared to one another." },
  { id: "lime", name: "Mexican Lime", emoji: "\u{1F34B}", region: "Mexico", accent: "#8FBF3F",
    origin: "Originated in Southeast Asia, carried west through the Middle East and North Africa, and brought to Mexico by Spanish colonizers in the 1500s.",
    peak: [5,6,7,8],
    story: "It took the long way home — Southeast Asia to Persia to Spain to Mexico — before becoming the fruit no taco stand can be without." },
  { id: "avocado", name: "Avocado", emoji: "\u{1F951}", region: "Mexico", accent: "#5B7A3A",
    origin: "Native to south-central Mexico, domesticated by Mesoamerican cultures as far back as 5,000 BCE.",
    peak: [1,2,3,10,11,12],
    story: "The Aztecs called it ahuacatl and considered it an aphrodisiac; the word eventually softened into 'avocado' as it traveled — but the tree never really left home." },
  { id: "jicama", name: "Jicama", emoji: "\u{1F950}", region: "Mexico", accent: "#D8C79A",
    origin: "Native to Mexico and Central America, cultivated by Indigenous peoples long before European contact.",
    peak: [11,12,1,2],
    story: "Technically a root, eaten like a fruit — crisp, sweet, and traditionally served raw with lime and chile, exactly as it has been for centuries at Mexican markets." },
  { id: "nopal", name: "Nopal (Cactus Paddle)", emoji: "\u{1F335}", region: "Mexico", accent: "#3E7A3E",
    origin: "Native to Mexico, harvested from the same prickly pear cactus that produces tuna fruit.",
    peak: [3,4,5,6],
    story: "Eaten as a vegetable but botanically a fruit-bearing pad — it fed Mesoamerican civilizations through droughts that would have starved less resourceful crops." },
  { id: "star-fruit", name: "Star Fruit", emoji: "\u{2B50}", region: "Both", accent: "#D9C43A",
    origin: "Native to Sri Lanka and Indonesia, spread through South and Southeast Asia before reaching the Americas in the 20th century.",
    peak: [9,10,11,12],
    story: "Sliced crosswise it reveals a perfect five-point star — a party trick of a fruit that made its way from Southeast Asian home gardens to both Tamil Nadu backyards and Mexican fruit stands." },
];

const MONTH_LABELS = ["J","F","M","A","M","J","J","A","S","O","N","D"];

function MonthWheel({ peak, accent, size = 200 }) {
  const r = size / 2 - 26;
  const cx = size / 2;
  const cy = size / 2;
  return (
    <svg width={size} height={size} style={{ overflow: "visible" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={PANEL_SOFT} strokeWidth="1.5" />
      {MONTH_LABELS.map((label, i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const isPeak = peak.includes(i + 1);
        return (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={isPeak ? 12 : 7}
              fill={isPeak ? accent : PANEL_SOFT}
              stroke={isPeak ? PAPER : "none"}
              strokeWidth={isPeak ? 1.5 : 0}
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'Space Mono', monospace"
              fontSize={isPeak ? 10 : 9}
              fontWeight={isPeak ? 700 : 400}
              fill={isPeak ? INK : TEXT_MUTED}
            >
              {label}
            </text>
          </g>
        );
      })}
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fontFamily="'Space Mono', monospace"
        fontSize="9"
        letterSpacing="1.5"
        fill={TEXT_MUTED}
      >
        PEAK
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fontFamily="'Space Mono', monospace"
        fontSize="9"
        letterSpacing="1.5"
        fill={TEXT_MUTED}
      >
        SEASON
      </text>
    </svg>
  );
}

export default function FruitAlmanac() {
  const [selected, setSelected] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [filter, setFilter] = useState("All");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const node = containerRef.current;
    if (node) node.addEventListener("mousemove", handleMove);
    return () => {
      if (node) node.removeEventListener("mousemove", handleMove);
    };
  }, []);

  const activeFruit = FRUITS.find((f) => f.id === selected);
  const regions = ["All", "Tamil Nadu", "Mexico", "Both"];
  const visibleFruits =
    filter === "All" ? FRUITS : FRUITS.filter((f) => f.region === filter || f.region === "Both");

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: "'Space Mono', monospace",
        background: INK,
        minHeight: "100vh",
        color: TEXT_LIGHT,
        cursor: selected ? "none" : "default",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        ${FONT_IMPORT}
        .fraunces { font-family: 'Fraunces', serif; }
        .crate-tile { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .crate-tile:hover { transform: translateY(-3px); }
        ::selection { background: ${GOLD}; color: ${INK}; }
      `}</style>

      {selected && (
        <div
          style={{
            position: "absolute",
            left: cursorPos.x,
            top: cursorPos.y,
            transform: "translate(-50%, -50%)",
            fontSize: "34px",
            pointerEvents: "none",
            zIndex: 999,
            filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))",
          }}
        >
          {activeFruit?.emoji}
        </div>
      )}

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "56px 24px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: 44 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 3,
              color: GOLD,
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            Guadalajara &middot; Coimbatore &middot; A Seasonal Ledger
          </div>
          <h1
            className="fraunces"
            style={{
              fontSize: "clamp(38px, 6vw, 64px)",
              fontWeight: 600,
              lineHeight: 1.05,
              margin: 0,
              color: PAPER_SOFT,
            }}
          >
            The Fruit Almanac
          </h1>
          <p
            className="fraunces"
            style={{
              fontStyle: "italic",
              fontSize: 18,
              color: TEXT_MUTED,
              marginTop: 14,
              maxWidth: 560,
              lineHeight: 1.5,
            }}
          >
            Every fruit has traveled further than you'd think. Pick one up — it becomes
            your cursor while you read where it's been.
          </p>
        </div>

        {/* Filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                letterSpacing: 1,
                textTransform: "uppercase",
                padding: "8px 14px",
                borderRadius: 3,
                border: `1px solid ${filter === r ? GOLD : PANEL_SOFT}`,
                background: filter === r ? GOLD : "transparent",
                color: filter === r ? INK : TEXT_MUTED,
                cursor: selected ? "none" : "pointer",
                fontWeight: filter === r ? 700 : 400,
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 14,
            marginBottom: 40,
          }}
        >
          {visibleFruits.map((f) => (
            <div
              key={f.id}
              className="crate-tile"
              onClick={() => setSelected(f.id)}
              style={{
                background: selected === f.id ? f.accent : PANEL,
                border: `1px solid ${selected === f.id ? f.accent : PANEL_SOFT}`,
                borderRadius: 4,
                padding: "18px 12px",
                textAlign: "center",
                cursor: selected ? "none" : "pointer",
                boxShadow: selected === f.id ? `0 0 0 2px ${PAPER} inset` : "none",
              }}
            >
              <div style={{ fontSize: 30, marginBottom: 8 }}>{f.emoji}</div>
              <div
                className="fraunces"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: selected === f.id ? INK : PAPER_SOFT,
                  lineHeight: 1.2,
                }}
              >
                {f.name}
              </div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginTop: 6,
                  color: selected === f.id ? INK : TEXT_MUTED,
                  opacity: selected === f.id ? 0.75 : 1,
                }}
              >
                {f.region}
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {activeFruit && (
          <div
            style={{
              background: PAPER,
              borderRadius: 6,
              padding: "36px 32px",
              color: INK,
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: 32,
              alignItems: "start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <MonthWheel peak={activeFruit.peak} accent={activeFruit.accent} />
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "#6B6248",
                  textAlign: "center",
                }}
              >
                Best eaten now
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "inline-block",
                  fontSize: 10,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  background: activeFruit.accent,
                  color: PAPER,
                  padding: "4px 10px",
                  borderRadius: 2,
                  marginBottom: 12,
                }}
              >
                {activeFruit.region}
              </div>
              <h2
                className="fraunces"
                style={{ fontSize: 34, fontWeight: 600, margin: "0 0 16px", color: INK }}
              >
                {activeFruit.name}
              </h2>

              <div style={{ marginBottom: 18 }}>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    color: "#6B6248",
                    marginBottom: 6,
                  }}
                >
                  Origin
                </div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>{activeFruit.origin}</p>
              </div>

              <div>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    color: "#6B6248",
                    marginBottom: 6,
                  }}
                >
                  The Story
                </div>
                <p
                  className="fraunces"
                  style={{ fontStyle: "italic", margin: 0, fontSize: 17, lineHeight: 1.65 }}
                >
                  {activeFruit.story}
                </p>
              </div>
            </div>
          </div>
        )}

        {!activeFruit && (
          <div
            style={{
              border: `1px dashed ${PANEL_SOFT}`,
              borderRadius: 6,
              padding: "40px 24px",
              textAlign: "center",
              color: TEXT_MUTED,
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>{"\u{1F963}"}</div>
            <p className="fraunces" style={{ fontStyle: "italic", fontSize: 16, margin: 0 }}>
              Pick a fruit from the crate above to read its story.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
