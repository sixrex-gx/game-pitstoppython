"use client";

type Kind = "me" | "ai";

const THEMES = {
  me: {
    body: ["#ffe7a0", "#f0b429", "#d99f1e", "#a86a08", "#6f4304"],
    pod: "#b0740c",
    accent: "#ffe9b0",
  },
  ai: {
    body: ["#f2a68f", "#c4553f", "#a84634", "#7c3225", "#4a1c15"],
    pod: "#7c3225",
    accent: "#f6c4b7",
  },
} as const;

const OFFSETS = [0, 20, 50, 80, 100];

const BODY =
  "M24 1.6C28 0.9 40 0.9 44 1.6C47.4 2.4 49.4 4.4 50.6 7.6" +
  "C52.4 12.4 54.4 18 55.6 23C56.6 27 59.6 29.4 63.6 31" +
  "C65.6 31.8 66.4 33.4 66 34.8" +
  "C65.4 36.6 63 37.4 59 37.4L9 37.4C5 37.4 2.6 36.6 2 34.8" +
  "C1.6 33.4 2.4 31.8 4.4 31C8.4 29.4 11.4 27 12.4 23" +
  "C13.6 18 15.6 12.4 17.4 7.6C18.6 4.4 20.6 2.4 24 1.6Z";

export function CarArt({ kind }: { kind: Kind }) {
  const t = THEMES[kind];
  const bodyId = `body-${kind}`;
  const glassId = `glass-${kind}`;
  const clipId = `clip-${kind}`;
  const shadeId = `shade-${kind}`;

  return (
    <svg className="car-art" viewBox="0 0 68 38" aria-hidden="true">
      <defs>
        <linearGradient id={bodyId} x1="0" y1="0" x2="0" y2="1">
          {t.body.map((color, i) => (
            <stop key={color} offset={`${OFFSETS[i]}%`} stopColor={color} />
          ))}
        </linearGradient>
        <linearGradient id={glassId} x1=".2" y1="0" x2=".7" y2="1">
          <stop offset="0%" stopColor="#b8c5d6" />
          <stop offset="45%" stopColor="#6c7a8e" />
          <stop offset="100%" stopColor="#252b36" />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={BODY} />
        </clipPath>
        <linearGradient id={shadeId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity=".55" />
          <stop offset="18%" stopColor="#000" stopOpacity=".12" />
          <stop offset="50%" stopColor="#000" stopOpacity="0" />
          <stop offset="82%" stopColor="#000" stopOpacity=".12" />
          <stop offset="100%" stopColor="#000" stopOpacity=".55" />
        </linearGradient>
      </defs>

      {/* bayangan */}
      <ellipse cx="34" cy="36.6" rx="32" ry="1.6" fill="#000" opacity=".45" />

      {/* ban belakang lebar */}
      <g fill="#131318">
        <rect x="0.4" y="26" width="9.6" height="11.8" rx="4.4" />
        <rect x="58" y="26" width="9.6" height="11.8" rx="4.4" />
      </g>
      <g stroke="#30303b" strokeWidth=".55" opacity=".9">
        <line x1="2.8" y1="28.2" x2="2.8" y2="35.6" />
        <line x1="5.2" y1="27.6" x2="5.2" y2="36.2" />
        <line x1="65.2" y1="28.2" x2="65.2" y2="35.6" />
        <line x1="62.8" y1="27.6" x2="62.8" y2="36.2" />
      </g>

      {/* bodi */}
      <path
        d={BODY}
        fill={`url(#${bodyId})`}
        stroke="rgba(0,0,0,.55)"
        strokeWidth=".5"
      />

      {/* shading bodi */}
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="68" height="38" fill={`url(#${shadeId})`} />
        <path d="M2 34L66 34L66 38L2 38Z" fill="#000" opacity=".16" />
      </g>

      {/* atap karbon */}
      <path
        d="M24 1.6C28 0.9 40 0.9 44 1.6C44.7 1.8 45 2.2 45 2.8L45 4.4L23 4.4L23 2.8C23 2.2 23.3 1.8 24 1.6Z"
        fill="#17171f"
        stroke="rgba(0,0,0,.45)"
        strokeWidth=".4"
      />
      <rect x="30.8" y="2.8" width="6.4" height="1.1" rx=".55" fill="#c33a2b" />
      <rect
        x="31.4"
        y="3"
        width="5.2"
        height=".4"
        rx=".2"
        fill="#ff8a78"
        opacity=".8"
      />

      {/* kaca belakang rendah */}
      <path
        d="M25 4.6L43 4.6L53 13.6L15 13.6Z"
        fill={`url(#${glassId})`}
        stroke="rgba(10,12,18,.6)"
        strokeWidth=".5"
      />
      <path
        d="M16.4 12.6L51.6 12.6"
        stroke="#cfe0f2"
        strokeWidth=".7"
        opacity=".3"
      />
      <path
        d="M27 5.8L21 12.5"
        stroke="#e8f3ff"
        strokeWidth="1.1"
        opacity=".15"
      />

      {/* spion */}
      <g fill={t.pod} stroke="rgba(0,0,0,.4)" strokeWidth=".35">
        <path d="M19.4 6L15.4 6.8L15.6 8.8L19.8 8.2Z" />
        <path d="M48.6 6L52.6 6.8L52.4 8.8L48.2 8.2Z" />
      </g>
      <g fill="#8c99ab" opacity=".9">
        <path d="M16.4 7L15.8 7.2L15.9 8.1L16.6 7.9Z" />
        <path d="M51.6 7L52.2 7.2L52.1 8.1L51.4 7.9Z" />
      </g>

      {/* gril mesin rendah */}
      <path
        d="M20 14.4L48 14.4L50.6 17.8L17.4 17.8Z"
        fill="#101017"
        stroke="#34343f"
        strokeWidth=".45"
      />
      <g stroke="#3c3c48" strokeWidth=".55" opacity=".95">
        <line x1="20.8" y1="15.5" x2="47.2" y2="15.5" />
        <line x1="19.2" y1="16.6" x2="48.8" y2="16.6" />
      </g>

      {/* sayap belakang tipis */}
      <path
        d="M6.4 11.2C19.2 9.8 48.8 9.8 61.6 11.2L61.8 12.6C48.8 14 19.2 14 6.2 12.6Z"
        fill="#1b1b23"
        stroke="rgba(0,0,0,.65)"
        strokeWidth=".3"
      />
      <path
        d="M7.2 11.5C19.6 10.3 48.4 10.3 60.8 11.5"
        fill="none"
        stroke="#8a8a98"
        strokeWidth=".4"
      />
      <g fill="#14141b" stroke="#40404c" strokeWidth=".3">
        <rect x="3.6" y="10.1" width="2.2" height="4.6" rx=".6" />
        <rect x="62.2" y="10.1" width="2.2" height="4.6" rx=".6" />
      </g>
      <g stroke={t.accent} strokeWidth=".4" opacity=".55">
        <line x1="3.9" y1="10.8" x2="3.9" y2="14" />
        <line x1="64.1" y1="10.8" x2="64.1" y2="14" />
      </g>
      <rect x="25" y="12.6" width="2" height="2.2" fill="#15151c" />
      <rect x="41" y="12.6" width="2" height="2.2" fill="#15151c" />

      {/* lampu belakang satu bar */}
      <path
        d="M8.4 20.4L31.4 20.6L31.4 22.6L8.6 22.4Z"
        fill="#ff4b38"
        stroke="rgba(0,0,0,.5)"
        strokeWidth=".35"
      />
      <path
        d="M59.6 20.4L36.6 20.6L36.6 22.6L59.4 22.4Z"
        fill="#ff4b38"
        stroke="rgba(0,0,0,.5)"
        strokeWidth=".35"
      />
      <g fill="#ffc0b4" opacity=".85">
        <path d="M9.4 20.9L31 21.1L31 21.7L9.4 21.5Z" />
        <path d="M58.6 20.9L37 21.1L37 21.7L58.6 21.5Z" />
      </g>
      <rect x="31.6" y="20.4" width="4.8" height="2.2" fill="#15151c" />

      {/* haunch crease */}
      <path
        d="M6 24.4C16 23.4 52 23.4 62 24.4"
        fill="none"
        stroke="rgba(0,0,0,.3)"
        strokeWidth=".5"
      />

      {/* bemper + diffuser */}
      <path
        d="M13.4 27.6L54.6 27.6L55.6 35.4L12.4 35.4Z"
        fill="#0e0e14"
        opacity=".93"
      />
      <g stroke="#343440" strokeWidth=".6" opacity=".95">
        <line x1="18" y1="28.8" x2="17.6" y2="34.8" />
        <line x1="24.2" y1="28.8" x2="24" y2="34.8" />
        <line x1="34" y1="28.8" x2="34" y2="34.8" />
        <line x1="43.8" y1="28.8" x2="44" y2="34.8" />
        <line x1="50" y1="28.8" x2="50.4" y2="34.8" />
      </g>
      <g fill="#4a4a55" stroke="#7a7a86" strokeWidth=".4">
        <rect x="19.4" y="29.4" width="6.4" height="1.8" rx=".9" />
        <rect x="42" y="29.4" width="6.4" height="1.8" rx=".9" />
      </g>

      {/* ventilasi bemper + plat */}
      <g fill="#101017" opacity=".55">
        <path d="M11.4 25L13.2 25.4L12.6 27.6L10.8 27.2Z" />
        <path d="M56.6 25L54.8 25.4L55.4 27.6L57.2 27.2Z" />
      </g>
      <rect x="28.8" y="25.2" width="10.4" height="2.6" rx=".5" fill="#15151c" />
      <rect
        x="29.8"
        y="25.8"
        width="8.4"
        height="1.3"
        rx=".3"
        fill="#6f6f7d"
        opacity=".35"
      />
    </svg>
  );
}
