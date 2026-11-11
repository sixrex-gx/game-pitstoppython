"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import {
  buildRounds,
  outcome as computeOutcome,
  positions,
  type AnswerLog,
  type Outcome,
  type Round,
} from "@/lib/game";
import { sfxCorrect, sfxLose, sfxWin, sfxWrong } from "@/lib/sfx";

type Phase = "start" | "playing" | "result";

interface GameState {
  phase: Phase;
  rounds: Round[];
  index: number;
  correct: number;
  picked: string | null;
  log: AnswerLog[];
  over: Outcome;
  sound: boolean;
}

type Action =
  | { type: "start" }
  | { type: "answer"; option: string }
  | { type: "next" }
  | { type: "toggleSound" };

const initialState: GameState = {
  phase: "start",
  rounds: [],
  index: 0,
  correct: 0,
  picked: null,
  log: [],
  over: null,
  sound: true,
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "start":
      return {
        phase: "playing",
        rounds: buildRounds(),
        index: 0,
        correct: 0,
        picked: null,
        log: [],
        over: null,
        sound: state.sound,
      };

    case "answer": {
      if (state.phase !== "playing" || state.picked !== null) return state;
      const round = state.rounds[state.index];
      if (!round) return state;

      const ok = action.option === round.a;
      const correct = state.correct + (ok ? 1 : 0);
      const log: AnswerLog[] = [
        ...state.log,
        { question: round, picked: action.option, ok },
      ];
      const pos = positions(correct, log.length);

      return {
        ...state,
        correct,
        log,
        picked: action.option,
        over: computeOutcome(pos.player, pos.ai),
      };
    }

    case "next": {
      if (state.phase !== "playing" || state.picked === null) return state;
      if (state.over) return { ...state, phase: "result" };
      return { ...state, index: state.index + 1, picked: null };
    }

    case "toggleSound":
      return { ...state, sound: !state.sound };
  }
}

export function useGame() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const resultSound = useRef(false);

  useEffect(() => {
    if (state.phase !== "result") {
      resultSound.current = false;
      return;
    }
    if (resultSound.current || !state.sound) return;
    resultSound.current = true;
    const timer = setTimeout(() => {
      if (state.over === "win") sfxWin();
      else sfxLose();
    }, 260);
    return () => clearTimeout(timer);
  }, [state.phase, state.over, state.sound]);

  const start = useCallback(() => dispatch({ type: "start" }), []);
  const toggleSound = useCallback(() => dispatch({ type: "toggleSound" }), []);

  const answer = useCallback(
    (option: string) => {
      if (state.phase !== "playing" || state.picked !== null) return;
      const round = state.rounds[state.index];
      if (!round) return;

      if (state.sound) {
        if (option === round.a) sfxCorrect();
        else sfxWrong();
      }
      dispatch({ type: "answer", option });
    },
    [state],
  );

  const next = useCallback(() => {
    if (state.phase !== "playing" || state.picked === null) return;
    dispatch({ type: "next" });
  }, [state]);

  return {
    ...state,
    current: state.rounds[state.index] ?? null,
    pos: positions(state.correct, state.log.length),
    start,
    answer,
    next,
    toggleSound,
  };
}
