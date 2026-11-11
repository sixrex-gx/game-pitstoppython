"use client";

import { useEffect, useRef } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultCard } from "@/components/ResultCard";
import { StartCard } from "@/components/StartCard";
import { Track } from "@/components/Track";
import { useGame } from "@/hooks/useGame";
import { TOTAL_QUESTIONS } from "@/lib/game";

const KEY_TO_INDEX: Record<string, number> = {
  "1": 0,
  "2": 1,
  "3": 2,
  "4": 3,
  A: 0,
  B: 1,
  C: 2,
  D: 3,
};

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      {on ? (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </>
      ) : (
        <>
          <path d="m16 9 5 6" />
          <path d="m21 9-5 6" />
        </>
      )}
    </svg>
  );
}

export default function Home() {
  const game = useGame();
  const latest = useRef(game);

  useEffect(() => {
    latest.current = game;
  });

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const g = latest.current;
      const target = e.target as HTMLElement | null;

      if (e.key === "Enter" || e.key === " ") {
        if (target?.tagName === "BUTTON") return;
        const button = document.querySelector<HTMLButtonElement>(".panel .next");
        if (button) {
          e.preventDefault();
          button.click();
        }
        return;
      }

      if (g.phase !== "playing" || g.picked !== null) return;
      const round = g.current;
      if (!round) return;

      const idx = KEY_TO_INDEX[e.key.toUpperCase()];
      if (idx === undefined) return;
      const option = round.options[idx];
      if (option !== undefined) g.answer(option);
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const last = game.log[game.log.length - 1];
  const fx = last ? (last.ok ? "boost" : "shake") : null;
  const soal =
    game.phase === "start" ? 0 : Math.min(game.index + 1, TOTAL_QUESTIONS);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          Pit Stop <b>Python</b>
        </div>
        <div className="stats">
          <div className="stat-mini">
            <span>Soal</span>
            <b>
              {soal}/{TOTAL_QUESTIONS}
            </b>
          </div>
          <div className="stat-mini">
            <span>Benar</span>
            <b>{game.correct}</b>
          </div>
          <button
            className={game.sound ? "snd" : "snd off"}
            type="button"
            aria-label="Nyalakan atau matikan suara"
            aria-pressed={game.sound}
            onClick={game.toggleSound}
          >
            <SoundIcon on={game.sound} />
          </button>
        </div>
      </header>

      <Track
        player={game.pos.player}
        ai={game.pos.ai}
        fx={fx}
        fxId={game.log.length}
      />

      <section className="panel" aria-live="polite">
        {game.phase === "start" && <StartCard onStart={game.start} />}

        {game.phase === "playing" && game.current && (
          <QuestionCard
            round={game.current}
            index={game.index}
            total={TOTAL_QUESTIONS}
            picked={game.picked}
            over={game.over}
            onAnswer={game.answer}
            onNext={game.next}
          />
        )}

        {game.phase === "result" && game.over && (
          <ResultCard
            over={game.over}
            correct={game.correct}
            player={game.pos.player}
            ai={game.pos.ai}
            log={game.log}
            onRestart={game.start}
          />
        )}
      </section>

      <div className="foot">
        Pit Stop Python · media belajar Python berbasis balapan
      </div>
    </div>
  );
}
