
export default function GamesSightread() {
  return (
    <div className="w-full h-full flex flex-col">
      <h1>피아노 초견 스피드 게임</h1>

      <section className="mx-auto">
        <a href="/games/sightread/tutorial" className="systemBtn">
          게임 시작
        </a>
      </section>

      <section className="mx-auto mt-16 text-center">
        <div className="my-2 text-lg">
          PC/태블릿 등 가로로 넓은 화면에서 플레이해 주세요.
        </div>
      </section>
    </div>
  );
}
