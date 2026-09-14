"use client";

import { useEffect, useState } from "react";

export default function Typing({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setStill(true);
  }, []);

  useEffect(() => {
    if (still || !words.length) return;
    const word = words[i % words.length];
    const full = n === word.length;

    let delay = del ? 45 : 85;
    if (full && !del) delay = 1700;
    if (n === 0 && del) delay = 320;

    const id = setTimeout(() => {
      if (!del) {
        if (full) setDel(true);
        else setN(n + 1);
      } else {
        if (n === 0) {
          setDel(false);
          setI(i + 1);
        } else setN(n - 1);
      }
    }, delay);
    return () => clearTimeout(id);
  }, [n, del, i, words, still]);

  const word = words[i % words.length] ?? "";

  return (
    <span className={className}>
      {still ? word : word.slice(0, n)}
      {!still && <span className="caret" aria-hidden />}
    </span>
  );
}
