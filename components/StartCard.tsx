"use client";

export function StartCard({ onStart }: { onStart: () => void }) {
  return (
    <div className="intro">
      <h1>
        Pit Stop <span>Python</span>
      </h1>
      <p>Balapan melawan mobil AI. Satu jawaban benar, satu kali menyalip.</p>
      <ul className="rules">
        <li>
          <span className="n">1</span>
          <span>Ada 10 soal Python. Soal diambil acak dari 30 soal.</span>
        </li>
        <li>
          <span className="n">2</span>
          <span>Jawaban benar membuat mobilmu maju 13 persen. Salah, mobilmu diam.</span>
        </li>
        <li>
          <span className="n">3</span>
          <span>Mobil AI maju 10 persen setiap soal, benar atau salah.</span>
        </li>
        <li>
          <span className="n">4</span>
          <span>Finis duluan berarti menang. Butuh 8 jawaban benar.</span>
        </li>
      </ul>
      <button className="next" type="button" onClick={onStart}>
        Mulai balapan
      </button>
    </div>
  );
}
