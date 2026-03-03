export default function SnupiaBanner() {
  return (
    <div className="w-full mt-40 mb-20 flex bg-black">
      <div className="text-center mx-auto flex items-center">
        <img
          src={"/logo.png"}
          alt="snupiaLogo"
          width={180}
          height={154}
          className="w-40 h-40 mx-8"
        />
        <div className="flex flex-col items-center text-white font-bold">
          <div className="text-2xl">서울대학교 중앙 피아노 동아리 SNUPia</div>
          <div className="text-5xl my-2">피아노 초견 스피드 게임</div>
        </div>
      </div>
    </div>
  );
}
