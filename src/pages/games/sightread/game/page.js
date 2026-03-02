"use client";

import AnswerBoard from "@/components/sightread/answerBoard";
import Score from "@/components/sightread/score";
import Timer from "@/components/sightread/timer";
import TutorialBoard from "@/components/sightread/tutorialBoard";
import useImages from "@/hooks/useImages";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const pitchname = [
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
const notename = [
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
const octavename = ["2", "3", "4", "5", "6"];

export default function Game() {
  const [gameStatus, setGameStatus] = useState(0);
  // 0: 게임 진행 중
  // 1: 오답
  // 2: 타임 오버
  const [correctCnt, setCorrectCnt] = useState(0);
  const [keyHitTime, setKeyHitTime] = useState(null);

  const [quizList, setQuizList] = useState([]);
  const [quizIdx, setQuizIdx] = useState({
    dif: 0, // difficulty
    idx: 0, // index
  });
  const [answer, setAnswer] = useState(-1);
  const [lastAnswer, setLastAnswer] = useState(-1);
  const [lastCorrect, setLastCorrect] = useState(-1);

  const images = useImages("gameResources/quizpic");

  const DEBUGMODE = false;

  function initGame() {
    setLastAnswer(-1);
    setCorrectCnt(0);
    setGameStatus(0);
    setQuizList(images?.images);
    setQuizIdx({
      dif: 0,
      idx: Math.floor(Math.random() * images?.images[0]?.length),
    });
  }

  useEffect(() => {
    if (images.loading == false && quizList?.length == 0) initGame();
  }, [images]);

  function updateQuizIdx() {
    let newDif; // new Difficulty
    if (correctCnt < 7) newDif = 0;
    else if (correctCnt < 20) newDif = 1;
    else newDif = 2;

    let newIdx = Math.floor(Math.random() * quizList[quizIdx.dif].length);
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
    const tmp = getPitch(answer);
    const sound = new Audio(
      `/gameResources/piano-mp3/${
        (tmp[0] == "A" && tmp.length == 2) || tmp[0] == "B"
          ? getPitch(answer - 12)
          : tmp
      }.mp3`
    );
    sound.play();

    // Check answer
    const correctAnswer = getKeyFromQuizIdx(quizIdx.idx);

    if (answer == correctAnswer) {
      //alert("정답!");
      setCorrectCnt(correctCnt + 1);
    }

    setLastCorrect(correctAnswer);
    setLastAnswer(answer);

    // 다음 문제 출제
    setKeyHitTime(Date.now());
    updateQuizIdx();

    setAnswer(-1);
  }, [answer]);

  function getPitch(key, verbose) {
    if (verbose) {
      return `${key} (${pitchname[key % 12]}${
        octavename[Math.floor(key / 12)]
      },${" "}
        ${notename[key % 12]})`;
    } else {
      return `${pitchname[key % 12]}${octavename[Math.floor(key / 12)]}`;
    }
  }
  function getKeyFromQuizIdx() {
    //console.log(quizList[quizIdx.dif]);
    const t = quizList[quizIdx.dif][quizIdx.idx].slice(1);
    return parseInt(t.slice(t.indexOf("/") + 11, [t.indexOf("_")]));
  }

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
              {quizList[0]?.map((item, key) => (
                <Score
                  key={key}
                  showsrc={quizList[quizIdx.dif][quizIdx.idx]}
                  imgsrc={item}
                />
              ))}
              {quizList[1]?.map((item, key) => (
                <Score
                  key={key}
                  showsrc={quizList[quizIdx.dif][quizIdx.idx]}
                  imgsrc={item}
                />
              ))}
              {quizList[2]?.map((item, key) => (
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
        <Link className="ml-10 systemBtn" href={"/games"}>
          게임 종료
        </Link>
      </section>
    </div>
  );

  if (gameStatus == 0) {
    return GameRunning();
  } else return GameOver();
}
