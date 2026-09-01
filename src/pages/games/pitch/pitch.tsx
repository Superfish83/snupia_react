import { useCallback, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./pitch.css";

type Difficulty =
  | "basic"
  | "easy"
  | "normal"
  | "hard"
  | "master"
  | "devil";

type DifficultyConfig = {
  label: string;
  description: string;
  octaves: number[];
  chromatic: boolean;
  tones: number;
};

type Question = {
  notes: number[];
  retries: number;
};

type HistoryItem = {
  question: number;
  answer: string;
  retries: number;
  correct: boolean;
};

const DIFFICULTIES: Record<Difficulty, DifficultyConfig> = {
  basic: {
    label: "BASIC",
    description: "1개 옥타브, 반음 제외",
    octaves: [4],
    chromatic: false,
    tones: 1,
  },

  easy: {
    label: "EASY",
    description: "3개 옥타브, 반음 제외",
    octaves: [3, 4, 5],
    chromatic: false,
    tones: 1,
  },

  normal: {
    label: "NORMAL",
    description: "3개 옥타브, 전체음",
    octaves: [3, 4, 5],
    chromatic: true,
    tones: 1,
  },

  hard: {
    label: "HARD",
    description: "전체 음역, 전체음",
    octaves: [2, 3, 4, 5, 6],
    chromatic: true,
    tones: 1,
  },

  master: {
    label: "MASTER",
    description: "전체 음역, 동시 2음",
    octaves: [2, 3, 4, 5, 6],
    chromatic: true,
    tones: 2,
  },

  devil: {
    label: "DEVIL",
    description: "전체 음역, 동시 3음",
    octaves: [2, 3, 4, 5, 6],
    chromatic: true,
    tones: 3,
  },
};

const NATURAL_NOTES = [0, 2, 4, 5, 7, 9, 11];

const KEY_NAMES: Record<number, string> = {
  0: "도",
  1: "레♭",
  2: "레",
  3: "미♭",
  4: "미",
  5: "파",
  6: "솔♭",
  7: "솔",
  8: "라♭",
  9: "라",
  10: "시♭",
  11: "시",
};

const NOTE_NAMES = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

const WHITE_KEYS = [0, 2, 4, 5, 7, 9, 11];
const BLACK_KEYS = [1, 3, 6, 8, 10];

const TOTAL_QUESTIONS = 10;

/*
  IMPORTANT:
  Put the octave-6 files that ACTUALLY exist here.

  Example:
  public/gameResources/piano-mp3/C6.mp3
  public/gameResources/piano-mp3/Db6.mp3
  public/gameResources/piano-mp3/D6.mp3
*/
const AVAILABLE_OCTAVE_6 = new Set([
  "Ab6",
  "C6",
  "D6",
  "Db6",
  "E6",
  "Eb6",
  "F6",
  "Gb6",
]);

function midiToNoteInfo(midi: number) {
  const pitchClass = midi % 12;
  const octave = Math.floor(midi / 12) - 1;

  return {
    name: NOTE_NAMES[pitchClass],
    octave,
    pitchClass,
  };
}

function midiName(midi: number) {
  const pitchClass = midi % 12;
  const octave = Math.floor(midi / 12) - 1;

  return `${KEY_NAMES[pitchClass]}${octave}`;
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateQuestion(config: DifficultyConfig): Question {
  const pitchClasses = config.chromatic
    ? Array.from({ length: 12 }, (_, i) => i)
    : NATURAL_NOTES;

  const possibleNotes = config.octaves.flatMap((octave) =>
    pitchClasses.map(
      (pitchClass) => 12 * (octave + 1) + pitchClass,
    ),
  );

  const notes: number[] = [];

  while (notes.length < config.tones) {
    const note = getRandomItem(possibleNotes);
    const pitchClass = note % 12;

    // Prevent duplicate pitch classes in HELL/GOD
    if (
      !notes.some(
        (existing) => existing % 12 === pitchClass,
      )
    ) {
      notes.push(note);
    }
  }

  return {
    notes,
    retries: 0,
  };
}

function getPianoSample(midi: number) {
  const { name, octave } = midiToNoteInfo(midi);

  const noteId = `${name}${octave}`;

  /*
    For all octaves except 6:
    use the actual sample directly.
  */
  if (octave !== 6) {
    return {
      src: `/gameResources/piano-mp3/${noteId}.mp3`,
      playbackRate: 1,
    };
  }

  /*
    If the exact octave-6 sample exists,
    use it.
  */
  if (AVAILABLE_OCTAVE_6.has(noteId)) {
    return {
      src: `/gameResources/piano-mp3/${noteId}.mp3`,
      playbackRate: 1,
    };
  }

  /*
    Otherwise use octave 5 and pitch it up
    exactly one octave.
  */
  return {
    src: `/gameResources/piano-mp3/${name}5.mp3`,
    playbackRate: 2,
  };
}

export default function GamesAbsolutePitch() {
  const [showShareQr, setShowShareQr] = useState(false);
  const [difficulty, setDifficulty] =
    useState<Difficulty>("basic");

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [questionNumber, setQuestionNumber] =
    useState(1);

  const [question, setQuestion] =
    useState<Question | null>(null);

  const [selectedNotes, setSelectedNotes] = useState<
    number[]
  >([]);

  const [history, setHistory] = useState<HistoryItem[]>(
    [],
  );

  const [feedback, setFeedback] = useState<
    "correct" | "wrong" | null
  >(null);

  const answeringRef = useRef(false);

  const config = DIFFICULTIES[difficulty];

  const playMidiNotes = useCallback(
    (notes: number[]) => {
      const volume =
        notes.length > 1 ? 0.55 : 0.8;

      notes.forEach((midi) => {
        const { src, playbackRate } =
          getPianoSample(midi);

        const audio = new Audio(src);

        audio.volume = volume;
        audio.playbackRate = playbackRate;

        void audio.play().catch((error) => {
          console.error(
            `Could not play piano sample: ${src}`,
            error,
          );
        });
      });
    },
    [],
  );

  const playKeyboardNote = (pitchClass: number) => {
    const midi = 60 + pitchClass;

    playMidiNotes([midi]);
  };

  const startGame = (
    nextDifficulty: Difficulty = difficulty,
  ) => {
    const nextConfig =
      DIFFICULTIES[nextDifficulty];

    const nextQuestion =
      generateQuestion(nextConfig);

    setDifficulty(nextDifficulty);

    setStarted(true);
    setFinished(false);

    setQuestionNumber(1);
    setHistory([]);
    setSelectedNotes([]);
    setFeedback(null);

    setQuestion(nextQuestion);

    setTimeout(() => {
      playMidiNotes(nextQuestion.notes);
    }, 250);
  };

  const nextQuestion = () => {
    if (questionNumber >= TOTAL_QUESTIONS) {
      setFinished(true);
      setQuestion(null);
      setSelectedNotes([]);

      return;
    }

    const next = generateQuestion(config);

    setQuestionNumber(
      (current) => current + 1,
    );

    setQuestion(next);

    setSelectedNotes([]);
    setFeedback(null);

    setTimeout(() => {
      playMidiNotes(next.notes);
    }, 350);
  };

  const replayQuestion = () => {
    if (!question) return;

    setQuestion((current) =>
      current
        ? {
            ...current,
            retries: current.retries + 1,
          }
        : current,
    );

    playMidiNotes(question.notes);
  };

  const handleAnswer = (
    pitchClass: number,
  ) => {
    if (
      !started ||
      finished ||
      !question ||
      answeringRef.current
    ) {
      return;
    }

    playKeyboardNote(pitchClass);

    const requiredCount = config.tones;

    let nextSelected: number[];

    if (requiredCount === 1) {
      nextSelected = [pitchClass];
    } else if (
      selectedNotes.includes(pitchClass)
    ) {
      nextSelected = selectedNotes.filter(
        (note) => note !== pitchClass,
      );

      setSelectedNotes(nextSelected);

      return;
    } else {
      nextSelected = [
        ...selectedNotes,
        pitchClass,
      ];
    }

    setSelectedNotes(nextSelected);

    if (
      nextSelected.length < requiredCount
    ) {
      return;
    }

    answeringRef.current = true;

    const correctPitchClasses =
      question.notes
        .map((note) => note % 12)
        .sort((a, b) => a - b);

    const guessedPitchClasses = [
      ...nextSelected,
    ].sort((a, b) => a - b);

    const isCorrect =
      correctPitchClasses.length ===
        guessedPitchClasses.length &&
      correctPitchClasses.every(
        (note, index) =>
          note ===
          guessedPitchClasses[index],
      );

    setFeedback(
      isCorrect ? "correct" : "wrong",
    );

    setHistory((current) => [
      ...current,
      {
        question: questionNumber,

        answer: question.notes
          .map(midiName)
          .join(" + "),

        retries: question.retries,

        correct: isCorrect,
      },
    ]);

    setTimeout(() => {
      answeringRef.current = false;

      nextQuestion();
    }, 750);
  };

  const score =
    history.length === 0
      ? 0
      : Math.round(
          (history.filter(
            (item) => item.correct,
          ).length /
            TOTAL_QUESTIONS) *
            100,
        );

    function getShareUrl() {
        const params = new URLSearchParams({
            name: "pitch",
            s: String(score),
            d: difficulty,
        });

        return `${window.location.origin}/webgames/share?${params.toString()}`;
    }
    
  return (
    <div className="absolute-pitch-game w-full h-full flex flex-col">
      <section className="mx-auto mt-14 text-center px-4">
        <h1 className="font-bold text-2xl">
          절대음감 테스트
        </h1>

        <p className="mt-2 text-neutral-500">
          소리를 듣고 맞는 음을 눌러보세요!
        </p>
      </section>

      {!started && (
        <section className="difficulty-section">
          <div className="difficulty-grid">
            {(
              Object.entries(
                DIFFICULTIES,
              ) as [
                Difficulty,
                DifficultyConfig,
              ][]
            ).map(([key, value]) => (
              <button
                key={key}
                className={`difficulty-card ${
                  difficulty === key
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setDifficulty(key)
                }
              >
                <span className="difficulty-name">
                  {value.label}
                </span>

                <span className="difficulty-description">
                  {value.description}
                </span>
              </button>
            ))}
          </div>

          <button
            className="start-button"
            onClick={() => startGame()}
          >
            게임 시작
          </button>
        </section>
      )}

      {started &&
        !finished &&
        question && (
          <>
            <section className="game-status">
              <strong>
                문제 {questionNumber} /{" "}
                {TOTAL_QUESTIONS}
              </strong>

              <span>
                음을 잘 듣고 해당되는 건반을
                누르세요
              </span>

              {config.tones > 1 && (
                <span className="selection-guide">
                  {config.tones}개의 음을
                  선택하세요 (
                  {selectedNotes.length}/
                  {config.tones})
                </span>
              )}

              <button
                className="replay-button"
                onClick={replayQuestion}
              >
                ↻ 다시 듣기
              </button>
            </section>

            <section className="piano-wrapper">
              <div
                className={`piano ${
                  feedback
                    ? `piano-${feedback}`
                    : ""
                }`}
              >
                <div className="white-keys">
                  {WHITE_KEYS.map(
                    (pitchClass) => (
                      <button
                        key={pitchClass}
                        className={`white-key ${
                          selectedNotes.includes(
                            pitchClass,
                          )
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          handleAnswer(
                            pitchClass,
                          )
                        }
                      >
                        {difficulty !== "hard" && difficulty !== "master" && difficulty !== "devil" && (
                            <span>{KEY_NAMES[pitchClass]}</span>
                        )}
                      </button>
                    ),
                  )}
                </div>

                <div className="black-keys">
                  {BLACK_KEYS.map(
                    (pitchClass) => (
                      <button
                        key={pitchClass}
                        className={`black-key black-${pitchClass} ${
                          selectedNotes.includes(
                            pitchClass,
                          )
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          handleAnswer(
                            pitchClass,
                          )
                        }
                      >
                        {difficulty !== "hard" && difficulty !== "master" && difficulty !== "devil" && (
                            <span>{KEY_NAMES[pitchClass]}</span>
                        )}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </section>

            <section className="feedback-area">
              {feedback === "correct" && (
                <span className="correct-text">
                  정답!
                </span>
              )}

              {feedback === "wrong" && (
                <span className="wrong-text">
                  틀렸어요!
                </span>
              )}
            </section>
          </>
        )}

      {finished && (
        <section className="result-section">
          <p className="result-label" style={{width:"100%", textAlign:"center"}}>
            당신의 절대음감 점수는
          </p>

          <div className="result-score">
            {score}
          </div>

          <div className="result-grade">
            {score === 100 &&
              "완벽한 절대음감! 🎹"}

            {score >= 80 &&
              score < 100 &&
              "놀라운 음감이에요! 👏"}

            {score >= 60 &&
              score < 80 &&
              "좋은 음감을 가지고 있어요!"}

            {score >= 40 &&
              score < 60 &&
              "조금만 더 연습해보세요!"}

            {score < 40 &&
              "음감 훈련이 필요해요 🎵"}
          </div>

          <div className="history">
            <h2>세부내역</h2>

            <div className="history-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>순서</th>
                    <th>음계</th>
                    <th>재시도</th>
                    <th>정확도</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((item) => (
                    <tr key={item.question}>
                      <td>
                        {item.question}
                      </td>

                      <td>
                        {item.answer}
                      </td>

                      <td>
                        {item.retries}
                      </td>

                      <td>
                        {item.correct
                          ? "⭕"
                          : "❌"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="result-buttons">
            <button
                className="instagram-share-button"
                onClick={() => setShowShareQr(true)}
                >
                Instagram 스토리 공유
            </button>

            <button
                className="retry-button"
                onClick={() => {
                setStarted(false);
                setFinished(false);
                setHistory([]);
                setQuestionNumber(1);
                }}
            >
                다시하기
            </button>
            {showShareQr && (
  <div
    className="share-modal-backdrop"
    onClick={() => setShowShareQr(false)}
  >
    <div
      className="share-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="share-modal-close"
        onClick={() => setShowShareQr(false)}
      >
        ×
      </button>

      <h2>Instagram 스토리 공유</h2>

      <p>
        휴대폰으로 QR 코드를 스캔한 뒤
        결과 이미지를 다운로드하세요.
      </p>

      <div className="share-qr">
        <QRCodeSVG
          value={getShareUrl()}
          size={220}
          level="M"
        />
      </div>

      <div className="share-score">
        {DIFFICULTIES[difficulty].label} · {score}점
      </div>

      <button
        className="share-copy-button"
        onClick={() => {
          void navigator.clipboard.writeText(getShareUrl());
        }}
      >
        링크 복사
      </button>
    </div>
  </div>
)}
            </div>
        </section>
        
      )}
    </div>
  );
}