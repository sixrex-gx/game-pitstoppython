"use client";

import type { AnswerLog, Outcome } from "@/lib/game";

interface ResultCardProps {
  over: Exclude<Outcome, null>;
  correct: number;
  player: number;
  ai: number;
  log: AnswerLog[];
  onRestart: () => void;
}

export function ResultCard({
  over,
  correct,
  player,
  ai,
  log,
  onRestart,
}: ResultCardProps) {
  const asked = log.length;
  const acc = asked ? Math.round((correct / asked) * 100) : 0;
  const win = over === "win";
  const wrong = log.filter((x) => !x.ok);

  return (
    <>
      <div className={win ? "verdict win" : "verdict lose"}>
        {win ? "FINIS" : "KALAH"}
      </div>
      <p className="sub">
        {win
          ? `Mobilmu menyentuh garis finis di soal ke-${asked}. AI tertinggal di ${Math.round(ai)} persen.`
          : `Mobil AI menyentuh garis finis lebih dulu. Kamu berhenti di ${Math.round(player)} persen.`}
      </p>

      <div className="statgrid">
        <div className="stat">
          <b>{correct}</b>
          <span>Benar</span>
        </div>
        <div className="stat">
          <b>{asked}</b>
          <span>Soal</span>
        </div>
        <div className="stat">
          <b>{acc}%</b>
          <span>Akurasi</span>
        </div>
      </div>

      <button className="next" type="button" onClick={onRestart}>
        Main lagi
      </button>

      {wrong.length ? (
        <div className="review">
          <h3>Yang perlu diulang</h3>
          {wrong.map((x, i) => (
            <div className="revitem" key={`${x.question.id}-${i}`}>
              <div className="q">{x.question.q}</div>
              {x.question.code ? (
                <pre className="revcode">{x.question.code}</pre>
              ) : null}
              <div className="a">Jawabanmu: {x.picked}</div>
              <div className="b">Benar: {x.question.a}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="allgood">
          Semua jawaban benar. Coba main lagi, soalnya diambil acak dari 30
          soal.
        </div>
      )}
    </>
  );
}
