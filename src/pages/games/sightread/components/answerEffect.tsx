import { useState, useEffect } from "react";

export default function AnswerEffect({ keyHitTime, isblack, wrong = false }:
  {keyHitTime: number | null; isblack: boolean; wrong?: boolean}) {
  // timer used for correct answer effect
  const [msElapsed, setMsElapsed] = useState(-1);
  const [greenOpacity, setGreenOpacity] = useState(0.0);

  useEffect(() => {
    if (!keyHitTime) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGreenOpacity(
      msElapsed > 0 ? Math.min(1, Math.max(0, 1 - (msElapsed - 200) / 300)) : 0
    );
    setTimeout(() => {
      setMsElapsed(Date.now() - keyHitTime);
    }, 50);
  }, [msElapsed]);

  return (
    greenOpacity > 0 && (
      <div
        className={`w-full h-full ${
          wrong
            ? isblack
              ? "bg-red-800"
              : "bg-red-400"
            : isblack
            ? "bg-green-800"
            : "bg-green-400"
        }`}
        style={{ opacity: greenOpacity }}
      />
    )
  );
}
