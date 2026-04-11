import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

// ─────────────────────────────────────────────────────────────────────────────
// Design Tokens
// ─────────────────────────────────────────────────────────────────────────────
const BG = "#07091A";
const PURPLE = "#7C3AED";
const PURPLE_LIGHT = "#A78BFA";
const PURPLE_GLOW = "rgba(124,58,237,0.18)";
const GREEN = "#10B981";
const GREEN_LIGHT = "#34D399";
const BLUE = "#60A5FA";
const AMBER = "#FBBF24";
const TEXT = "#F1F5F9";
const SUB = "#94A3B8";
const CARD_BG = "rgba(255,255,255,0.05)";
const CARD_BORDER = "rgba(255,255,255,0.09)";

// ─────────────────────────────────────────────────────────────────────────────
// Animation Helpers
// ─────────────────────────────────────────────────────────────────────────────
function fadeIn(frame: number, start: number, dur = 20): number {
  return interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function fadeOut(frame: number, total: number, dur = 25): number {
  return interpolate(frame, [total - dur, total], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function slideY(frame: number, start: number, fps: number, from = 50): number {
  const s = spring({
    frame: frame - start,
    fps,
    config: { damping: 15, mass: 0.7 },
  });
  return interpolate(s, [0, 1], [from, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function scaleSpring(
  frame: number,
  start: number,
  fps: number,
  from = 0.85
): number {
  return spring({
    frame: frame - start,
    fps,
    config: { damping: 12, mass: 0.5 },
    from,
    to: 1,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared: Grid overlay
// ─────────────────────────────────────────────────────────────────────────────
const GridOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.5 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
      `,
      backgroundSize: "64px 64px",
      opacity,
    }}
  />
);

// ─────────────────────────────────────────────────────────────────────────────
// Scene 1 · Logo Intro  (frames 0 – 150)
// ─────────────────────────────────────────────────────────────────────────────
const LogoIntro: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowOp = fadeIn(frame, 0, 30);
  const logoOp = fadeIn(frame, 5, 20);
  const logoScale = scaleSpring(frame, 5, fps, 0.8);
  const tagOp = fadeIn(frame, 28, 22);
  const tagY = slideY(frame, 28, fps, 28);
  const lineOp = fadeIn(frame, 45, 20);
  const exit = fadeOut(frame, dur, 28);

  return (
    <AbsoluteFill
      style={{ backgroundColor: BG, alignItems: "center", justifyContent: "center", flexDirection: "column", opacity: exit }}
    >
      {/* radial glow */}
      <div
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${PURPLE_GLOW}, transparent 68%)`,
          opacity: glowOp,
        }}
      />

      {/* wordmark */}
      <div
        style={{
          opacity: logoOp,
          transform: `scale(${logoScale})`,
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          fontWeight: 900,
          fontSize: 128,
          letterSpacing: -6,
          lineHeight: 1,
          display: "flex",
        }}
      >
        <span style={{ color: TEXT }}>Ve</span>
        <span style={{ color: PURPLE }}>fy</span>
      </div>

      {/* separator */}
      <div
        style={{
          opacity: lineOp,
          width: 48,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${PURPLE}, transparent)`,
          marginTop: 20,
          marginBottom: 20,
        }}
      />

      {/* tagline */}
      <div
        style={{
          opacity: tagOp,
          transform: `translateY(${tagY}px)`,
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          fontSize: 16,
          fontWeight: 500,
          color: SUB,
          letterSpacing: 3.5,
          textTransform: "uppercase",
        }}
      >
        Legal Infrastructure · LATAM
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Scene 2 · Hero  (frames 120 – 390 → dur 270)
// ─────────────────────────────────────────────────────────────────────────────
const HeroScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const op = fadeIn(frame, 0, 25);
  const exit = fadeOut(frame, dur, 25);

  // animated orbs
  const orb1x = interpolate(frame, [0, dur], [-20, 20]);
  const orb1y = interpolate(frame, [0, dur], [0, -15]);

  // text animations
  const badgeOp = fadeIn(frame, 5, 18);
  const h1Op = fadeIn(frame, 10, 22);
  const h1Y = slideY(frame, 10, fps, 60);
  const h2Op = fadeIn(frame, 22, 22);
  const h2Y = slideY(frame, 22, fps, 40);
  const ctaOp = fadeIn(frame, 42, 22);
  const ctaScale = scaleSpring(frame, 42, fps, 0.9);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, opacity: op * exit }}>
      {/* orbs */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 640,
          height: 640,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(124,58,237,0.13), transparent 65%)`,
          transform: `translate(${orb1x}px, ${orb1y}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -160,
          left: -80,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(16,185,129,0.07), transparent 65%)`,
        }}
      />
      <GridOverlay />

      {/* content */}
      <div
        style={{
          position: "absolute",
          left: 100,
          right: 140,
          top: "50%",
          transform: "translateY(-52%)",
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {/* badge */}
        <div
          style={{
            opacity: badgeOp,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(124,58,237,0.14)",
            border: `1px solid rgba(124,58,237,0.32)`,
            borderRadius: 100,
            padding: "7px 18px",
            width: "fit-content",
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: GREEN,
              boxShadow: `0 0 8px ${GREEN}`,
            }}
          />
          <span
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: 12,
              color: PURPLE_LIGHT,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            Now in Latin America
          </span>
        </div>

        {/* H1 */}
        <div
          style={{
            opacity: h1Op,
            transform: `translateY(${h1Y}px)`,
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: 78,
            fontWeight: 900,
            color: TEXT,
            lineHeight: 1.08,
            letterSpacing: -4,
          }}
        >
          Raise your round.
          <br />
          <span
            style={{
              background: `linear-gradient(135deg, ${PURPLE_LIGHT}, ${BLUE})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Digitally.
          </span>
        </div>

        {/* sub */}
        <div
          style={{
            opacity: h2Op,
            transform: `translateY(${h2Y}px)`,
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: 22,
            fontWeight: 400,
            color: SUB,
            lineHeight: 1.55,
            maxWidth: 580,
          }}
        >
          End-to-end legal infrastructure for founders and investors across
          Latin America — from SPV creation to final signature, all in one
          platform.
        </div>

        {/* CTA row */}
        <div
          style={{
            opacity: ctaOp,
            transform: `scale(${ctaScale})`,
            display: "flex",
            gap: 14,
            marginTop: 6,
            transformOrigin: "left center",
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${PURPLE} 0%, #5B21B6 100%)`,
              color: TEXT,
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontWeight: 700,
              fontSize: 16,
              padding: "15px 34px",
              borderRadius: 10,
              boxShadow: `0 0 32px rgba(124,58,237,0.45)`,
            }}
          >
            Get Started →
          </div>
          <div
            style={{
              border: `1px solid ${CARD_BORDER}`,
              color: SUB,
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontWeight: 500,
              fontSize: 16,
              padding: "15px 34px",
              borderRadius: 10,
            }}
          >
            See how it works
          </div>
        </div>
      </div>

      {/* right: floating UI card */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: "50%",
          transform: `translateY(-50%) scale(${scaleSpring(frame, 30, fps, 0.88)})`,
          opacity: fadeIn(frame, 30, 30),
          width: 240,
          backgroundColor: "rgba(13,18,38,0.9)",
          border: `1px solid rgba(124,58,237,0.3)`,
          borderRadius: 16,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: 11,
            fontWeight: 700,
            color: PURPLE_LIGHT,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          Round Dashboard
        </div>
        {[
          { label: "Target", value: "$500k", color: TEXT },
          { label: "Committed", value: "$312k", color: GREEN_LIGHT },
          { label: "Investors", value: "14", color: BLUE },
          { label: "Signed", value: "11 / 14", color: AMBER },
        ].map((row, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, 40 + i * 8, 16),
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: i < 3 ? `1px solid ${CARD_BORDER}` : "none",
            }}
          >
            <span
              style={{
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: 13,
                color: SUB,
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: 14,
                fontWeight: 700,
                color: row.color,
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
        {/* progress bar */}
        <div
          style={{
            height: 6,
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.08)",
            overflow: "hidden",
            marginTop: 4,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${interpolate(frame, [60, 110], [0, 62], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
              background: `linear-gradient(90deg, ${PURPLE}, ${GREEN})`,
              borderRadius: 3,
            }}
          />
        </div>
        <div
          style={{
            opacity: fadeIn(frame, 70, 16),
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: 11,
            color: SUB,
            textAlign: "right",
          }}
        >
          62% funded
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Scene 3 · SPV Feature  (frames 360 – 600 → dur 240)
// ─────────────────────────────────────────────────────────────────────────────
const SPVScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const op = fadeIn(frame, 0, 25);
  const exit = fadeOut(frame, dur, 25);

  const titleOp = fadeIn(frame, 5, 22);
  const titleY = slideY(frame, 5, fps, 50);
  const descOp = fadeIn(frame, 18, 20);

  const bullets = [
    { icon: "⚡", text: "Single line on your cap table — no complexity" },
    { icon: "🔒", text: "Founders keep full control — zero carry" },
    { icon: "📱", text: "KYC, onboarding & e-signatures in one flow" },
  ];

  // investors animating into SPV
  const investors = ["Angel 1", "Angel 2", "Fund A", "Angel 3"];

  return (
    <AbsoluteFill style={{ backgroundColor: BG, opacity: op * exit }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 480,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(124,58,237,0.1), transparent 70%)`,
        }}
      />
      <GridOverlay opacity={0.35} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 100px",
          gap: 70,
        }}
      >
        {/* ── Left: text ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              opacity: fadeIn(frame, 0, 18),
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: 12,
              fontWeight: 700,
              color: PURPLE_LIGHT,
              letterSpacing: 2.5,
              textTransform: "uppercase",
            }}
          >
            Vefy SPV
          </div>

          <div
            style={{
              opacity: titleOp,
              transform: `translateY(${titleY}px)`,
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: 54,
              fontWeight: 900,
              color: TEXT,
              lineHeight: 1.12,
              letterSpacing: -2.5,
            }}
          >
            Bring investors together.
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${PURPLE_LIGHT}, ${BLUE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Simplify your cap table.
            </span>
          </div>

          <div
            style={{
              opacity: descOp,
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: 17,
              color: SUB,
              lineHeight: 1.65,
              maxWidth: 420,
            }}
          >
            Pool multiple angel checks into a single vehicle. No complex legal
            structures. No setup headaches. No shared returns.
          </div>

          {/* bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 4 }}>
            {bullets.map((b, i) => {
              const bOp = fadeIn(frame, 32 + i * 14, 18);
              const bY = slideY(frame, 32 + i * 14, fps, 18);
              return (
                <div
                  key={i}
                  style={{
                    opacity: bOp,
                    transform: `translateY(${bY}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      backgroundColor: "rgba(124,58,237,0.15)",
                      border: `1px solid rgba(124,58,237,0.25)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      flexShrink: 0,
                    }}
                  >
                    {b.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      fontSize: 15,
                      color: TEXT,
                    }}
                  >
                    {b.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right: SPV diagram ── */}
        <div
          style={{
            width: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 0,
          }}
        >
          {investors.map((name, i) => {
            const iOp = fadeIn(frame, 12 + i * 10, 18);
            const iY = slideY(frame, 12 + i * 10, fps, 20);
            const lineW = interpolate(frame, [30 + i * 10, 80 + i * 10], [0, 80], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={i}
                style={{
                  opacity: iOp,
                  transform: `translateY(${iY}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: i < 3 ? 18 : 0,
                }}
              >
                {/* investor bubble */}
                <div
                  style={{
                    width: 88,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: CARD_BG,
                    border: `1px solid ${CARD_BORDER}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: '"Helvetica Neue", Arial, sans-serif',
                    fontSize: 11,
                    fontWeight: 600,
                    color: SUB,
                    flexShrink: 0,
                  }}
                >
                  {name}
                </div>
                {/* connector line */}
                <div
                  style={{
                    height: 1,
                    width: lineW,
                    background: `linear-gradient(90deg, rgba(124,58,237,0.6), rgba(124,58,237,0.2))`,
                  }}
                />
              </div>
            );
          })}

          {/* SPV node */}
          <div
            style={{
              opacity: fadeIn(frame, 90, 22),
              transform: `scale(${scaleSpring(frame, 90, fps, 0.88)}) translateX(114px)`,
              marginTop: 8,
              backgroundColor: "rgba(124,58,237,0.16)",
              border: `1px solid rgba(124,58,237,0.45)`,
              borderRadius: 14,
              padding: "16px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: GREEN,
                  boxShadow: `0 0 8px ${GREEN}`,
                }}
              />
              <span
                style={{
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: 13,
                  fontWeight: 700,
                  color: PURPLE_LIGHT,
                }}
              >
                Vefy SPV
              </span>
            </div>
            <span
              style={{
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: 11,
                color: SUB,
              }}
            >
              Cap table: 1 line
            </span>
            <span
              style={{
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: 11,
                color: GREEN_LIGHT,
              }}
            >
              4 investors pooled
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Scene 4 · Features Grid  (frames 570 – 900 → dur 330)
// ─────────────────────────────────────────────────────────────────────────────
const FeaturesScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const op = fadeIn(frame, 0, 25);
  const exit = fadeOut(frame, dur, 25);

  const headerY = slideY(frame, 0, fps, 40);

  const features = [
    {
      icon: "🔍",
      title: "KYC & Investor Onboarding",
      desc: "Verify investor identity in minutes with automated compliance checks.",
      accent: BLUE,
    },
    {
      icon: "✍️",
      title: "Electronic Signatures",
      desc: "Legally binding e-signatures from anywhere in the world.",
      accent: PURPLE_LIGHT,
    },
    {
      icon: "📁",
      title: "Document Management",
      desc: "Term sheets, shareholder agreements, and more — all in one secure place.",
      accent: GREEN_LIGHT,
    },
    {
      icon: "📊",
      title: "Round Dashboard",
      desc: "Track commitments, signatures, and round progress in real time.",
      accent: AMBER,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        opacity: op * exit,
        padding: "56px 96px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      <GridOverlay opacity={0.3} />

      {/* header */}
      <div
        style={{
          opacity: fadeIn(frame, 0, 22),
          transform: `translateY(${headerY}px)`,
          textAlign: "center",
          marginBottom: 44,
          position: "relative",
        }}
      >
        <div
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: 44,
            fontWeight: 900,
            color: TEXT,
            letterSpacing: -2,
            marginBottom: 10,
          }}
        >
          Everything to{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${PURPLE_LIGHT}, ${GREEN_LIGHT})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            close your round
          </span>
        </div>
        <div
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: 17,
            color: SUB,
          }}
        >
          One platform. No spreadsheets. No back-and-forth emails.
        </div>
      </div>

      {/* grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          flex: 1,
          position: "relative",
        }}
      >
        {features.map((f, i) => {
          const cardOp = fadeIn(frame, 22 + i * 14, 20);
          const cardY = slideY(frame, 22 + i * 14, fps, 36);
          const cardScale = scaleSpring(frame, 22 + i * 14, fps, 0.93);
          return (
            <div
              key={i}
              style={{
                opacity: cardOp,
                transform: `translateY(${cardY}px) scale(${cardScale})`,
                backgroundColor: CARD_BG,
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: 18,
                padding: "26px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 13,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* glow accent */}
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  left: -40,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${f.accent}18, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
              {/* icon */}
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 13,
                  backgroundColor: `${f.accent}18`,
                  border: `1px solid ${f.accent}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                {f.icon}
              </div>
              {/* title */}
              <div
                style={{
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: 19,
                  fontWeight: 700,
                  color: TEXT,
                }}
              >
                {f.title}
              </div>
              {/* desc */}
              <div
                style={{
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: 14,
                  color: SUB,
                  lineHeight: 1.65,
                }}
              >
                {f.desc}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Scene 5 · Stats  (frames 870 – 1140 → dur 270)
// ─────────────────────────────────────────────────────────────────────────────
const StatsScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const op = fadeIn(frame, 0, 25);
  const exit = fadeOut(frame, dur, 25);

  const headerY = slideY(frame, 0, fps, 36);

  const stats = [
    {
      value: "54%",
      sub: "of LATAM VC goes to early-stage rounds",
      color: PURPLE_LIGHT,
    },
    {
      value: "$150k",
      sub: "average SPV size across the region",
      color: GREEN_LIGHT,
    },
    {
      value: "100%",
      sub: "digital — no paperwork, no in-person meetings",
      color: BLUE,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        opacity: op * exit,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 56,
        padding: "0 96px",
      }}
    >
      {/* background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 960,
          height: 400,
          background: `radial-gradient(ellipse, rgba(124,58,237,0.12), transparent 65%)`,
        }}
      />
      <GridOverlay opacity={0.28} />

      {/* header */}
      <div
        style={{
          opacity: fadeIn(frame, 0, 22),
          transform: `translateY(${headerY}px)`,
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: 12,
            fontWeight: 700,
            color: PURPLE_LIGHT,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          The LATAM Opportunity
        </div>
        <div
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: 50,
            fontWeight: 900,
            color: TEXT,
            letterSpacing: -2.5,
            lineHeight: 1.1,
          }}
        >
          Capital is flowing.{" "}
          <br />
          <span
            style={{
              background: `linear-gradient(135deg, ${PURPLE_LIGHT}, ${BLUE})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Infrastructure must follow.
          </span>
        </div>
      </div>

      {/* stats row */}
      <div
        style={{
          display: "flex",
          gap: 32,
          justifyContent: "center",
          position: "relative",
        }}
      >
        {stats.map((s, i) => {
          const sOp = fadeIn(frame, 22 + i * 16, 22);
          const sY = slideY(frame, 22 + i * 16, fps, 56);
          const sScale = scaleSpring(frame, 22 + i * 16, fps, 0.82);
          return (
            <div
              key={i}
              style={{
                opacity: sOp,
                transform: `translateY(${sY}px) scale(${sScale})`,
                backgroundColor: CARD_BG,
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: 22,
                padding: "32px 36px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                minWidth: 230,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* glow */}
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 180,
                  height: 100,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${s.color}20, transparent 70%)`,
                }}
              />
              <div
                style={{
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: 68,
                  fontWeight: 900,
                  color: s.color,
                  letterSpacing: -3,
                  lineHeight: 1,
                  position: "relative",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: 13,
                  color: SUB,
                  textAlign: "center",
                  lineHeight: 1.55,
                  maxWidth: 170,
                }}
              >
                {s.sub}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Scene 6 · CTA  (frames 1110 – 1380 → dur 270)
// ─────────────────────────────────────────────────────────────────────────────
const CTAScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const op = fadeIn(frame, 0, 25);
  const exit = fadeOut(frame, dur, 25);

  const titleY = slideY(frame, 8, fps, 56);
  const pulse = interpolate(Math.sin((frame / 28) * Math.PI), [-1, 1], [0.65, 1.0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        opacity: op * exit,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 28,
      }}
    >
      {/* gradient bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 55%, rgba(124,58,237,0.16), transparent 62%)`,
        }}
      />
      <GridOverlay opacity={0.22} />

      {/* content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          textAlign: "center",
          padding: "0 120px",
        }}
      >
        {/* chip */}
        <div
          style={{
            opacity: fadeIn(frame, 0, 18),
            backgroundColor: "rgba(16,185,129,0.12)",
            border: `1px solid rgba(16,185,129,0.3)`,
            borderRadius: 100,
            padding: "7px 20px",
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: 12,
            color: GREEN_LIGHT,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          Start Today — Free
        </div>

        {/* headline */}
        <div
          style={{
            opacity: fadeIn(frame, 5, 22),
            transform: `translateY(${titleY}px)`,
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: 68,
            fontWeight: 900,
            color: TEXT,
            lineHeight: 1.08,
            letterSpacing: -3.5,
          }}
        >
          Join the future of
          <br />
          <span
            style={{
              background: `linear-gradient(135deg, ${PURPLE_LIGHT} 0%, ${BLUE} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            LATAM fundraising
          </span>
        </div>

        {/* sub */}
        <div
          style={{
            opacity: fadeIn(frame, 22, 22),
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: 19,
            color: SUB,
            lineHeight: 1.55,
            maxWidth: 540,
          }}
        >
          Create your SPV, onboard investors, collect signatures, and close
          your round — 100% online, in days not months.
        </div>

        {/* CTA button */}
        <div
          style={{
            opacity: fadeIn(frame, 40, 22),
            transform: `scale(${scaleSpring(frame, 40, fps, 0.9)})`,
            marginTop: 6,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${PURPLE} 0%, #4C1D95 100%)`,
              color: TEXT,
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontWeight: 800,
              fontSize: 20,
              padding: "18px 52px",
              borderRadius: 14,
              boxShadow: `0 0 ${36 * pulse}px rgba(124,58,237,0.55), 0 0 80px rgba(124,58,237,0.2)`,
              letterSpacing: -0.5,
            }}
          >
            Start at vefy.app →
          </div>
        </div>

        {/* footnote */}
        <div
          style={{
            opacity: fadeIn(frame, 56, 20),
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: 13,
            color: "#475569",
          }}
        >
          No credit card required · Free to start · LATAM-focused team
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Scene 7 · Outro  (frames 1350 – 1500 → dur 150)
// ─────────────────────────────────────────────────────────────────────────────
const OutroScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const op = fadeIn(frame, 0, 22);
  const exit = fadeOut(frame, dur, 35);
  const logoScale = scaleSpring(frame, 8, fps, 0.84);
  const urlOp = fadeIn(frame, 28, 22);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        opacity: op * exit,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 440,
          height: 440,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${PURPLE_GLOW}, transparent 68%)`,
          opacity: fadeIn(frame, 0, 30),
        }}
      />

      {/* wordmark */}
      <div
        style={{
          opacity: fadeIn(frame, 8, 22),
          transform: `scale(${logoScale})`,
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          fontWeight: 900,
          fontSize: 110,
          letterSpacing: -5,
          lineHeight: 1,
          display: "flex",
        }}
      >
        <span style={{ color: TEXT }}>Ve</span>
        <span style={{ color: PURPLE }}>fy</span>
      </div>

      {/* separator */}
      <div
        style={{
          opacity: urlOp,
          width: 40,
          height: 1.5,
          background: `linear-gradient(90deg, transparent, ${PURPLE}, transparent)`,
          marginTop: 10,
          marginBottom: 10,
        }}
      />

      {/* URL */}
      <div
        style={{
          opacity: urlOp,
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          fontSize: 20,
          color: SUB,
          letterSpacing: 2.5,
        }}
      >
        vefy.app
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Root composition  (total: 1500 frames = 50 s @ 30 fps)
// ─────────────────────────────────────────────────────────────────────────────
export const VefyVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Scene 1 · Logo Intro   0 – 150 */}
      <Sequence from={0} durationInFrames={150}>
        <LogoIntro dur={150} />
      </Sequence>

      {/* Scene 2 · Hero          120 – 390 */}
      <Sequence from={120} durationInFrames={270}>
        <HeroScene dur={270} />
      </Sequence>

      {/* Scene 3 · SPV           360 – 600 */}
      <Sequence from={360} durationInFrames={240}>
        <SPVScene dur={240} />
      </Sequence>

      {/* Scene 4 · Features      570 – 900 */}
      <Sequence from={570} durationInFrames={330}>
        <FeaturesScene dur={330} />
      </Sequence>

      {/* Scene 5 · Stats         870 – 1140 */}
      <Sequence from={870} durationInFrames={270}>
        <StatsScene dur={270} />
      </Sequence>

      {/* Scene 6 · CTA           1110 – 1380 */}
      <Sequence from={1110} durationInFrames={270}>
        <CTAScene dur={270} />
      </Sequence>

      {/* Scene 7 · Outro         1350 – 1500 */}
      <Sequence from={1350} durationInFrames={150}>
        <OutroScene dur={150} />
      </Sequence>
    </AbsoluteFill>
  );
};
