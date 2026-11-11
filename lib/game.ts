import { BANK, type RawQuestion } from "@/lib/questions";

export const TOTAL_QUESTIONS = 10;
export const PLAYER_STEP = 13;
export const AI_STEP = 10;

export interface Question extends RawQuestion {
  id: number;
}

export interface Round extends Question {
  options: string[];
}

export interface AnswerLog {
  question: Question;
  picked: string;
  ok: boolean;
}

export type Outcome = "win" | "lose" | null;

export function shuffle<T>(input: readonly T[]): T[] {
  const arr = input.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function withIds(): Question[] {
  return BANK.map((q, i) => ({ ...q, id: i + 1 }));
}

/** 5 soal mudah, 4 sedang, 1 sulit. */
export function pickQuestions(): Question[] {
  const pool = withIds();
  const easy = shuffle(pool.filter((q) => q.d === 1)).slice(0, 5);
  const mid = shuffle(pool.filter((q) => q.d === 2)).slice(0, 4);
  const hard = shuffle(pool.filter((q) => q.d === 3)).slice(0, 1);
  return [...easy, ...mid, ...hard];
}

export function buildRounds(): Round[] {
  return pickQuestions().map((q) => ({
    ...q,
    options: shuffle(q.o),
  }));
}

export function positions(correct: number, asked: number) {
  return {
    player: Math.min(100, correct * PLAYER_STEP),
    ai: Math.min(100, asked * AI_STEP),
  };
}

export function outcome(player: number, ai: number): Outcome {
  if (player >= 100) return "win";
  if (ai >= 100) return "lose";
  return null;
}
