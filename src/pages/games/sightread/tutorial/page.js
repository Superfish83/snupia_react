"use client";

import Score from "@/components/sightread/score";
import TutorialBoard from "@/components/sightread/tutorialBoard";

export default function Game() {
  return (
    <div className="w-full h-full flex flex-col">
      <section className="mx-auto mt-14 font-bold text-xl">
        음표에 맞는 음을 누르세요!
      </section>

      <section className="mx-auto my-4">
        <div className="relative w-40 h-40">
          <Score
            imgsrc={"/gameResources/quizpic/1/26_1.jpg"}
            showsrc={"/gameResources/quizpic/1/26_1.jpg"}
          />
        </div>
      </section>

      <section className="mx-auto my-1">
        <TutorialBoard gamestart={26} />
        <div className="text-black">[DEBUG]</div>
      </section>

      <section className="mx-auto my-4">
        <div className="font-bold text-xl">
          초록색으로 표시된 가온 도(C4) 음을 클릭하면 게임이 시작됩니다!
        </div>
      </section>
    </div>
  );
}
