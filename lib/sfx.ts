let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

function beep(
  freq: number,
  dur: number,
  type: OscillatorType = "square",
  vol = 0.07,
) {
  const ac = audio();
  if (!ac) return;
  try {
    if (ac.state === "suspended") void ac.resume();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(vol, ac.currentTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
    osc.connect(gain).connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + dur + 0.03);
  } catch {
    // suara tidak wajib
  }
}

export function sfxCorrect() {
  beep(520, 0.09, "square", 0.05);
  setTimeout(() => beep(780, 0.12, "square", 0.05), 90);
}

export function sfxWrong() {
  beep(150, 0.22, "sawtooth", 0.045);
}

export function sfxWin() {
  [523, 659, 784, 1046].forEach((f, i) =>
    setTimeout(() => beep(f, 0.16, "triangle", 0.06), i * 120),
  );
}

export function sfxLose() {
  [330, 280, 220].forEach((f, i) =>
    setTimeout(() => beep(f, 0.2, "sawtooth", 0.045), i * 140),
  );
}
