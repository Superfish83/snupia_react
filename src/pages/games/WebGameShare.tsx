import { useSearchParams } from "react-router-dom";

function PitchShareContent({
  score,
  difficulty,
}: {
  score: number;
  difficulty: string;
}) {
  const DIFFICULTY_LABELS: Record<string, string> = {
    basic: "BASIC",
    easy: "EASY",
    normal: "NORMAL",
    hard: "HARD",
    master: "MASTER",
    devil: "DEVIL",
  };

  const safeScore = Math.max(
    0,
    Math.min(100, Number.isFinite(score) ? score : 0),
  );

  const safeDifficulty =
    difficulty in DIFFICULTY_LABELS ? difficulty : "basic";

  async function createResultImageBlob() {
    const canvas = document.createElement("canvas");

    canvas.width = 1080;
    canvas.height = 1920;

    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";

    // Title
    ctx.fillStyle = "#171717";
    ctx.font = "bold 76px sans-serif";
    ctx.fillText("절대음감 테스트", 540, 340);

    // Difficulty
    ctx.fillStyle = "#737373";
    ctx.font = "bold 48px sans-serif";
    ctx.fillText(
      DIFFICULTY_LABELS[safeDifficulty],
      540,
      480,
    );

    // Score
    ctx.fillStyle = "#171717";
    ctx.font = "bold 260px sans-serif";
    ctx.fillText(`${safeScore}`, 540, 820);

    ctx.font = "bold 54px sans-serif";
    ctx.fillText("점", 540, 920);

    // Challenge
    ctx.font = "bold 46px sans-serif";
    ctx.fillText(
      "🎹 당신도 도전해보세요!",
      540,
      1150,
    );

    // Logo
    const logo = new Image();
    logo.src = "/snupia_white.png";

    await new Promise<void>((resolve, reject) => {
      logo.onload = () => resolve();
      logo.onerror = () => reject();
    });

    const logoWidth = 260;
    const logoHeight =
      logo.height * (logoWidth / logo.width);

    ctx.drawImage(
      logo,
      (canvas.width - logoWidth) / 2,
      1420,
      logoWidth,
      logoHeight,
    );

    // Location
    ctx.fillStyle = "#171717";
    ctx.font = "34px sans-serif";
    ctx.fillText(
      "학생회관 63동 427호",
      540,
      1760,
    );

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/png");
    });
  }

  async function downloadImage() {
    const blob = await createResultImageBlob();

    if (!blob) return;

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `snupia-pitch-${safeScore}.png`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  async function shareImage() {
    const blob = await createResultImageBlob();

    if (!blob) return;

    const file = new File(
      [blob],
      "snupia-absolute-pitch.png",
      {
        type: "image/png",
      },
    );

    if (
      navigator.share &&
      navigator.canShare?.({
        files: [file],
      })
    ) {
      try {
        await navigator.share({
          files: [file],
          title: "SNUPia 절대음감 테스트",
          text: `내 절대음감 점수는 ${safeScore}점!`,
        });
      } catch {
        // User cancelled.
      }

      return;
    }

    await downloadImage();
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-bold">
        절대음감 테스트 결과
      </h1>

      <div className="mt-8 text-center">
        <div className="text-lg font-bold text-neutral-500">
          {DIFFICULTY_LABELS[safeDifficulty]}
        </div>

        <div className="mt-3 text-7xl font-black">
          {safeScore}
        </div>

        <div className="mt-2 text-xl font-bold">
          점
        </div>
      </div>

      <p className="mt-8 text-lg font-bold">
        🎹 당신도 도전해보세요!
      </p>

      <div className="mt-10 w-full max-w-sm flex flex-col gap-3">
        <button
          onClick={shareImage}
          className="w-full rounded-xl bg-black px-6 py-4 font-bold text-white"
        >
          공유하기
        </button>

        <button
          onClick={downloadImage}
          className="w-full rounded-xl border border-neutral-300 bg-white px-6 py-4 font-bold text-black"
        >
          결과 이미지 다운로드
        </button>
      </div>
    </div>
  );
}

export default function WebGameShare() {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");

  if (name === "pitch") {
    const score = Number(searchParams.get("s") ?? 0);
    const difficulty = searchParams.get("d") ?? "basic";

    return (
      <PitchShareContent
        score={score}
        difficulty={difficulty}
      />
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      공유 정보를 찾을 수 없습니다.
    </div>
  );
}