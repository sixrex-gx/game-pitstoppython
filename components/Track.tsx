"use client";

import { useEffect, useState } from "react";
import { CarArt } from "@/components/CarArt";

interface TrackProps {
  player: number;
  ai: number;
  fx: "boost" | "shake" | null;
  fxId: number;
}

function bottom(p: number) {
  return `${6 + p * 0.69}%`;
}

function Car({
  kind,
  pos,
  fxClass,
}: {
  kind: "me" | "ai";
  pos: number;
  fxClass?: string;
}) {
  return (
    <div
      className={`car ${kind}${fxClass ? ` ${fxClass}` : ""}`}
      style={{ bottom: bottom(pos) }}
    >
      <CarArt kind={kind} />
    </div>
  );
}

export function Track({ player, ai, fx, fxId }: TrackProps) {
  const [anim, setAnim] = useState<"boost" | "shake" | "">("");

  useEffect(() => {
    if (!fx) {
      setAnim("");
      return;
    }
    setAnim("");
    const raf = requestAnimationFrame(() => setAnim(fx));
    const timer = setTimeout(() => setAnim(""), 600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [fx, fxId]);

  return (
    <section className="track" aria-label="Lintasan balap">
      <div className="finish" />
      <div className="divider" />
      <div className="lane left">
        <div className="lane-tag">AI</div>
        <Car kind="ai" pos={ai} />
      </div>
      <div className="lane right">
        <div className="lane-tag you">KAMU</div>
        <Car kind="me" pos={player} fxClass={anim} />
      </div>
    </section>
  );
}
