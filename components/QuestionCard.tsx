"use client";

import type { Outcome, Round } from "@/lib/game";

const LETTERS = ["A", "B", "C", "D"];

interface QuestionCardProps {
  round: Round;
  index: number;
  total: number;
  picked: string | null;
  over: Outcome;
  onAnswer: (option: string) => void;
  onNext: () => void;
}

export function QuestionCard({
  round,
  index,
  total,
  picked,
  over,
  onAnswer,
  onNext,
}: QuestionCardProps) {
  const answered = picked !== null;
  const ok = picked === round.a;

  function optionClass(option: string) {
    if (!answered) return "opt";
    if (option === round.a) return "opt correct";
    if (option === picked) return "opt wrong";
    return "opt dim";
  }

  return (
    <>
      <div className="meta">
        <span className="qno">
          Soal {index + 1} dari {total}
        </span>
        <span className="dots">
          {Array.from({ length: total }, (_, k) => (
            <i
              key={k}
              className={
                answered
                  ? k <= index
                    ? "on"
                    : ""
                  : k < index
                    ? "on"
                    : k === index
                      ? "cur"
                      : ""
              }
            />
          ))}
        </span>
      </div>

      <h2 className="qtext">{round.q}</h2>

      {round.code ? <pre className="code">{round.code}</pre> : null}

      <div className="opts">
        {round.options.map((option, i) => (
          <button
            key={option}
            type="button"
            className={optionClass(option)}
            disabled={answered}
            onClick={() => onAnswer(option)}
          >
            <span className="key">{LETTERS[i]}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      {answered ? (
        <>
          <div className={ok ? "fb" : "fb bad"}>
            {ok ? (
              <>
                <b>Benar.</b> Mobilmu menyalip. {round.why}
              </>
            ) : (
              <>
                <b>Belum tepat.</b> Jawaban benar: <b>{round.a}</b>. {round.why}
              </>
            )}
          </div>
          <button className="next" type="button" onClick={onNext}>
            {over ? "Lihat hasil" : "Soal berikutnya"}
          </button>
        </>
      ) : (
        <div className="hint">Tekan 1-4 atau A-D untuk menjawab</div>
      )}
    </>
  );
}
