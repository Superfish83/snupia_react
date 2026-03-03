import AnswerBoard from "./components/answerBoard";
import Score from "./components/score";
import Timer from "./components/timer";
import TutorialBoard from "./components/tutorialBoard";
import useImages from "./hooks/useImages";
import { useEffect, useState } from "react";

const pitchname: string[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "Bb",
  "Db",
  "Eb",
  "Gb",
  "Ab",
];
const notename: string[] = [
  "라",
  "시",
  "도",
  "레",
  "미",
  "파",
  "솔",
  "라#",
  "도#",
  "레#",
  "파#",
  "솔#",
];
const octavename: string[] = ["2", "3", "4", "5", "6"];

type QuizIdx = {
  dif: number; // difficulty
  idx: number; // index
};

export default function GamesSightreadGame() {
  const [gameStatus, setGameStatus] = useState<number>(0);
  // 0: 게임 진행 중
  // 1: 오답
  // 2: 타임 오버
  const [correctCnt, setCorrectCnt] = useState<number>(0);
  const [keyHitTime, setKeyHitTime] = useState<number | null>(null);

  const [quizList, setQuizList] = useState<string[][]>([]);
  const [quizIdx, setQuizIdx] = useState<QuizIdx>({
    dif: 0, // difficulty
    idx: 0, // index
  });
  const [answer, setAnswer] = useState<number>(-1);
  const [lastAnswer, setLastAnswer] = useState<number>(-1);
  const [lastCorrect, setLastCorrect] = useState<number>(-1);

  const images = useImages("gameResources/quizpic");

  const DEBUGMODE: boolean = false;

  function initGame(): void {
    setLastAnswer(-1);
    setCorrectCnt(0);
    setGameStatus(0);
    setQuizList(images?.images as string[][]);
    setQuizIdx({
      dif: 0,
      idx: Math.floor(Math.random() * ((images?.images as string[][])?.[0]?.length ?? 0)),
    });
  }

  
  function getPitch(key: number, verbose?: boolean): string {
    if (verbose) {
      return `${key} (${pitchname[key % 12]}${
        octavename[Math.floor(key / 12)]
      },${" "}
        ${notename[key % 12]})`;
    } else {
      return `${pitchname[key % 12]}${octavename[Math.floor(key / 12)]}`;
    }
  }

  function getKeyFromQuizIdx(): number {
    //console.log(quizList[quizIdx.dif]);
    const t: string = quizList[quizIdx.dif][quizIdx.idx].slice(1);
    return parseInt(t.slice(t.indexOf("/") + 11, [t.indexOf("_")] as unknown as number));
  }


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (images.loading == false && quizList?.length == 0) initGame();
  }, [images]);

  function updateQuizIdx(): void {
    let newDif: number; // new Difficulty
    if (correctCnt < 7) newDif = 0;
    else if (correctCnt < 20) newDif = 1;
    else newDif = 2;

    let newIdx: number = Math.floor(Math.random() * quizList[quizIdx.dif].length);
    if (newIdx == quizIdx.idx) {
      newIdx = (quizIdx.idx + 1) % quizList[quizIdx.dif].length;
    }

    setQuizIdx({
      dif: newDif,
      idx: newIdx,
    });
  }

  useEffect(() => {
    if (answer == -1) return;

    // Play key sound
    const tmp: string = getPitch(answer);
    const sound = new Audio(
      `/gameResources/piano-mp3/${
        (tmp[0] == "A" && tmp.length == 2) || tmp[0] == "B"
          ? getPitch(answer - 12)
          : tmp
      }.mp3`
    );
    sound.play();

    // Check answer
    const correctAnswer: number = getKeyFromQuizIdx();

    if (answer == correctAnswer) {
      //alert("정답!");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCorrectCnt(correctCnt + 1);
    }

    setLastCorrect(correctAnswer);
    setLastAnswer(answer);

    // 다음 문제 출제
    setKeyHitTime(Date.now());
    updateQuizIdx();

    setAnswer(-1);
  }, [answer]);

  const GameRunning = () => (
    <div className="w-full h-full flex flex-col">
      <section className="mx-auto mt-14 font-bold text-xl">
        음표에 맞는 음을 누르세요!
      </section>

      <section className="mx-auto my-4">
        {quizList?.length > 0 ? (
          <div className="flex items-center">
            <div className="w-36" />
            <div className="relative w-40 h-40 text-white">
              {quizList[0]?.map((item: string, key: number) => (
                <Score
                  key={key}
                  showsrc={quizList[quizIdx.dif][quizIdx.idx]}
                  imgsrc={item}
                />
              ))}
              {quizList[1]?.map((item: string, key: number) => (
                <Score
                  key={key}
                  showsrc={quizList[quizIdx.dif][quizIdx.idx]}
                  imgsrc={item}
                />
              ))}
              {quizList[2]?.map((item: string, key: number) => (
                <Score
                  key={key}
                  showsrc={quizList[quizIdx.dif][quizIdx.idx]}
                  imgsrc={item}
                />
              ))}
            </div>

            <div className="w-36 px-4 text-slate-300 text-center">
              난이도: {quizIdx.dif == 0 && "★"}
              {quizIdx.dif == 1 && "★★"}
              {quizIdx.dif == 2 && "★★★"}
            </div>
          </div>
        ) : (
          <div className="w-40 h-40 bg-white flex items-center">
            <div className="mx-auto text-black">Loading...</div>
          </div>
        )}
      </section>

      <section className="mx-auto my-1">
        <AnswerBoard
          setAnswer={setAnswer}
          lastCorrect={lastCorrect}
          lastAnswer={lastAnswer}
          keyHitTime={keyHitTime}
        />
        {DEBUGMODE && (
          <div className="text-gray-400">
            [DEBUG] 입력: {getPitch(lastAnswer, true)}
          </div>
        )}
      </section>

      <section className="mx-auto my-4">
        {quizList.length > 0 && (
          <Timer
            seconds={DEBUGMODE ? 3000 : 45}
            barSize={1000}
            setGameStatus={setGameStatus}
          />
        )}
      </section>
    </div>
  );

  const GameOver = () => (
    <div className="w-full h-full flex flex-col">
      <section className="mx-auto mt-12 font-bold text-xl text-center">
        <div className="text-3xl text-red-300 font-bold">게임 오버!</div>
      </section>
      <section className="mx-auto my-4">
        <div className="relative w-40 h-40 text-white">
          <Score
            imgsrc={quizList[quizIdx.dif][quizIdx.idx]}
            showsrc={quizList[quizIdx.dif][quizIdx.idx]}
          />
        </div>
      </section>
      <section className="mx-auto my-1">
        <TutorialBoard wrong={getKeyFromQuizIdx()} />
      </section>
      <section className="mx-auto mt-4 text-center flex items-center">
        <div className="font-bold text-3xl text-green-200">
          맞힌 개수: {correctCnt}개
        </div>
        <a className="ml-10 systemBtn" href={"/webgames"}>
          게임 종료
        </a>
      </section>
    </div>
  );

  if (gameStatus == 0) {
    return GameRunning();
  } else return GameOver();
}