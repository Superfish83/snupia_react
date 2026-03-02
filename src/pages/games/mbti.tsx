import { useState } from "react"
import './mbti.css'

interface Option {
  value: string;
  text: string;
}

interface Question {
  id: number;
  text: string;
  imgsrc: string;
  options: Option[];
}

type MbtiInfo = [string, string, string]; // [이름, 설명, 이미지파일명]

const Q: Question[] = [
  {
    id: 1,
    text: "음악을 들을 때 나는...",
    imgsrc: "/gameResources/mbti/1.jpg",
    options: [
      { value: "T", text: "화려하고 신나는 음악이 좋아!" },
      { value: "F", text: "잔잔하고 부드러운 음악이 최고지!" },
    ],
  },
  {
    id: 2,
    text: "친구가 새로운 음악을 추천해줬다! 그때 나는...",
    imgsrc: "/gameResources/mbti/2.jpg",
    options: [
      { value: "E", text: "바로 들어봐야지! 좋으면 플리에도 추가할거야" },
      { value: "I", text: "난 듣는거만 들어~" },
    ],
  },
  {
    id: 3,
    text: "딱 하나만 고른다면 나는?",
    imgsrc: "/gameResources/mbti/3.webp",
    options: [
      { value: "J", text: "최신 가요가 제일 좋지" },
      { value: "P", text: "옛날 대중음악중에 명곡이 얼마나 많은데" },
      { value: "X", text: "클래식." },
    ],
  },
  {
    id: 4,
    text: "내가 음악을 고를때는...",
    imgsrc: "/gameResources/mbti/4.avif",
    options: [
      { value: "N", text: "장르나 분위기, 완성도 같은 음악적인 취향대로 고르는편" },
      { value: "S", text: "그냥 듣기만 좋으면 되는거지 뭘~" },
    ],
  },
]

const mbtiTypes: Record<string, MbtiInfo> = {
  ENTJ: ['리스트', '프란츠 리스트는 낭만주의 시대의 대표적인 피아니스트이자 작곡가로, 초인적인 연주 기교로 당대 유럽에서 선풍적인 인기를 끌었습니다.「헝가리 광시곡」과 「메피스토 왈츠」를 비롯하여 화려하고 극적인 피아노 작품들을 다수 남겼습니다.', 'liszt.jpg'],
  ENTP: ['바흐', 'J. S 바흐는 "음악의 아버지"로 불리는 바로크 시대의 핵심 인물로, 복잡한 대위법과 구조적인 완성도가 높은 작품을 남겼습니다. “푸가의 기법”, “골드베르크 변주곡”, “브란덴부르크 협주곡” 등의 작품을 남겨 후대 작곡가들에게 지대한 영향을 미쳤으며, 음악사에서 가장 위대한 작곡가 중 한 명으로 평가받고 있습니다.', 'bach.jpg'],
  ENFJ: ['슈만', '로베르트 슈만은 문학과 음악의 결합을 시도한 낭만주의 작곡가로, 감정 표현이 뛰어난 작품을 다수 작곡하였습니다. “어린이 정경”, “시인의 사랑” 등의 가곡과 피아노곡이 유명하며, 정신적 불안으로 생애 후반에는 창작 활동이 줄었습니다. 비평가로도 활동하였고, 아내 클라라 슈만은 그의 음악적 동반자이자 저명한 피아니스트였습니다.', 'schumann.png'],
  ENFP: ['리스트', '프란츠 리스트는 낭만주의 시대의 대표적인 피아니스트이자 작곡가로, 초인적인 연주 기교로 당대 유럽에서 선풍적인 인기를 끌었습니다.「헝가리 광시곡」과 「메피스토 왈츠」를 비롯하여 화려하고 극적인 피아노 작품들을 다수 남겼습니다.', 'liszt.jpg'],
  ESTJ: ['모차르트', '볼프강 아마데우스 모차르트는 고전주의 시대의 대표 작곡가로, 극도로 균형 잡힌 형식미와 감성적인 선율이 결합된 작품을 남겼습니다. “피가로의 결혼”, “마술피리”, “레퀴엠” 등 오페라와 종교음악, 기악곡 전반에 걸쳐 걸작을 창작하였습니다. 어린 시절부터 천재성을 인정받아 유럽 전역에서 활동하였습니다.', 'mozart.jpg'],
  ESTP: ['비발디', '안토니오 비발디는 이탈리아 바로크 시대의 작곡가로, 바이올린 협주곡 “사계”로 널리 알려져 있습니다. 500곡이 넘는 협주곡을 작곡하였으며, 명확한 구조와 생동감 넘치는 리듬이 특징입니다. 사제이자 음악 교사로서 활동하면서 여성 고아원에서 뛰어난 음악 교육을 실천하였습니다.', 'vivaldi.jpg'],
  ESFJ: ['드뷔시', '클로드 드뷔시는 인상주의 음악을 대표하는 작곡가로, 기존의 조성과 형식을 탈피하여 섬세하고 색채감 있는 음악 언어를 구축하였습니다. “달빛”, “목신의 오후에의 전주곡” 등에서 이러한 경향이 두드러지며, 화성과 음색에 대한 실험이 현대 음악에 큰 영향을 주었습니다. 프랑스 근대 음악의 방향을 제시한 인물로 평가받습니다.', 'debussy.jpg'],
  ESFP: ['멘델스존', '펠릭스 멘델스존은 낭만주의 작곡가로서 클래식한 형식을 유지하면서도 감성적인 음악을 작곡하였습니다. “한여름 밤의 꿈”의 “결혼행진곡”은 오늘날까지 널리 사용되며, 바이올린 협주곡, 교향곡, 피아노곡에서도 뛰어난 작품을 남겼습니다. 음악가이자 지휘자로서 바흐의 음악을 재조명하는 데 기여하였습니다.', 'mendelssohn.jpg'],
  INTJ: ['브람스', '요하네스 브람스는 베토벤의 후계자로 불리며, 고전적인 형식 안에 깊은 감정과 서정을 담은 음악을 작곡하였습니다. 교향곡, 실내악, 피아노곡, 가곡 등 다양한 분야에서 높은 예술성을 유지하였습니다. “헝가리 무곡”과 4개의 교향곡은 대중성과 작품성을 모두 갖춘 대표작입니다.', 'brahms.jpg'],
  INTP: ['베토벤', '루트비히 반 베토벤은 고전주의와 낭만주의를 잇는 교량 역할을 한 작곡가로, 청력을 상실한 이후에도 걸작을 다수 남겼습니다. 3번 교향곡 “영웅”, 5번 교향곡 “운명”, 9번 교향곡 “합창” 등은 인간의 의지와 감정을 강렬하게 표현한 작품으로 평가받습니다. 구조적 완성도와 혁신성을 동시에 갖춘 그의 음악은 이후 모든 작곡가에게 영향을 미쳤습니다.', 'beethoven.jpg'],
  INFJ: ['차이코프스키', '표트르 차이코프스키는 러시아 낭만주의의 대표 작곡가로, 극적인 선율과 정서적인 깊이를 특징으로 합니다. “백조의 호수”, “호두까기 인형”, “비창 교향곡” 등이 세계적으로 널리 연주됩니다. 서양 음악과 러시아적 요소를 성공적으로 결합하였다는 평가를 받습니다.', 'tchaikovsky.jpg'],
  INFP: ['슈베르트', '프란츠 슈베르트는 가곡의 장르를 확립한 작곡가로, 600곡이 넘는 가곡과 함께 교향곡, 피아노곡, 실내악 등을 작곡하였습니다. “송어”, “겨울 나그네” 등은 서정성과 내면적 감정 표현이 돋보입니다. 생전에 크게 주목받지 못했지만, 사후 높은 평가를 받게 되었습니다.', 'schubert.jpg'],
  ISTJ: ['라흐마니노프', '세르게이 라흐마니노프는 러시아 후기 낭만주의의 대표 인물로, 풍부한 감정과 극적인 전개가 특징입니다. “피아노 협주곡 2번”, “파가니니 주제에 의한 광시곡” 등에서 웅장한 스케일과 서정적인 선율을 동시에 보여줍니다. 뛰어난 피아니스트이기도 하여 본인의 작품을 직접 연주하며 명성을 얻었습니다.', 'rach.jpg'],
  ISTP: ['쇼스타코비치', '드미트리 쇼스타코비치는 소련 시기의 정치적 억압 속에서도 암시적 표현을 통해 비판적 메시지를 담은 작품을 작곡하였습니다. 교향곡과 현악 사중주에서 냉소적이고 긴장감 있는 음악 언어를 사용하였습니다. 대표작으로는 교향곡 5번과 오페라 “맥베스 부인의 사건” 등이 있습니다.', 'shostakovich.webp'],
  ISFJ: ['쇼팽', '프레데리크 쇼팽은 거의 모든 작품을 피아노를 중심으로 작곡한 낭만주의 작곡가입니다. 녹턴, 왈츠, 폴로네즈, 마주르카 등에서 섬세한 감성과 고급스러운 화성이 두드러집니다. 폴란드의 민족 정서를 서정적으로 표현하였으며, 연주기법에도 큰 혁신을 이루었습니다.', 'chopin.jpg'],
  ISFP: ['쇼팽', '프레데리크 쇼팽은 거의 모든 작품을 피아노를 중심으로 작곡한 낭만주의 작곡가입니다. 녹턴, 왈츠, 폴로네즈, 마주르카 등에서 섬세한 감성과 고급스러운 화성이 두드러집니다. 폴란드의 민족 정서를 서정적으로 표현하였으며, 연주기법에도 큰 혁신을 이루었습니다.', 'chopin.jpg'],
  ENTX: ['스트라빈스키', '이고르 스트라빈스키는 20세기 음악을 혁신한 작곡가로, “봄의 제전” 초연 당시의 충격적인 리듬과 화성으로 큰 반향을 일으켰습니다. 신고전주의, 12음기법 등 다양한 음악 스타일을 실험하며 끊임없이 변화하였습니다. 러시아 민속, 종교, 추상적 개념 등을 통합한 독창적인 세계를 구축하였습니다.', 'stravinsky.jpg'],
  ENFX: ['쇤베르크', '아르놀트 쇤베르크는 무조음악과 12음기법을 도입하여 현대 음악의 흐름을 바꾼 인물입니다. 초기에는 후기 낭만주의적 양식을 따르다가 점차 전통 조성을 탈피하였습니다. 제자들과 함께 제2빈악파를 형성하여 새로운 작곡 기법을 정립하였습니다.', 'schoenberg.jpg'],
  ESTX: ['바그너', '리하르트 바그너는 음악극이라는 개념을 창안하여 오페라의 형식을 근본적으로 혁신한 작곡가입니다. 그의 작품은 상징적이고 철학적인 주제를 중심으로 긴 호흡의 관현악과 복잡한 동기 발전을 특징으로 합니다. 대표작으로는 “니벨룽의 반지” 4부작과 “트리스탄과 이졸데” 등이 있으며, 후대 작곡가들에게 지대한 영향을 미쳤습니다.', 'wagner.jpg'],
  ESFX: ['스크랴빈', '알렉산드르 스크랴빈은 러시아 후기 낭만주의와 상징주의, 신비주의를 결합한 독창적인 음악 세계를 구축하였습니다. 초기에는 쇼팽의 영향을 받은 피아노 작품을 작곡했으나, 점차 독자적인 화성과 철학적 사유를 음악에 담기 시작하였습니다. 대표작 “신성한 시”, “프로메테우스” 등에서는 색채와 음악을 통합하려는 시도가 돋보입니다.', 'scriabin.jpg'],
  INTX: ['프로코피예프', '세르게이 프로코피예프는 강렬하고 명확한 리듬, 대담한 화성, 풍부한 유머가 특징인 러시아 작곡가입니다. “피터와 늑대”, 발레 “로미오와 줄리엣”, “전쟁 소나타” 등에서 극적이면서도 서사적인 음악 언어를 구사하였습니다. 혁신성과 대중성을 동시에 추구한 작곡가로 평가받고 있습니다.', 'prokofiev.jpg'],
  INFX: ['말러', '구스타프 말러는 후기 낭만주의 교향곡의 정점을 이룬 작곡가로, 인간 존재와 우주적 주제를 다룬 9개의 대규모 교향곡을 작곡하였고, 극적인 감정 전개와 철학적 깊이를 담고 있습니다. 지휘자로도 활동하며 당시 유럽 음악계에 큰 영향력을 행사하였습니다.', 'mahler.jpg'],
  ISTX: ['라벨', '모리스 라벨은 정교하고 섬세한 피아노 작곡으로 잘 알려진 프랑스 근대 작곡가입니다. “밤의 가스파르”, “쿠프랭의 무덤” 등에서 탁월한 색채감과 높은 연주 난이도를 보여줍니다. 인상주의적인 음향 실험과 함께 구조적인 완성도를 중시하였으며, 피아노 음악의 표현 영역을 크게 확장시킨 인물입니다.', 'ravel.png'],
  ISFX: ['메트너', '니콜라이 메트너는 러시아의 후기 낭만주의 작곡가이자 피아니스트로, 자신의 음악 세계를 고수하며 14곡의 피아노 소나타를 포함한 실내악과 가곡을 다수 작곡하였습니다. 라흐마니노프와 절친한 사이였으며, 라흐마니노프는 그를 “진정한 천재”라고 평가하였습니다. 보수적인 음악 언어를 사용했지만, 내면적 깊이와 형식미가 뛰어납니다.', 'medtner.webp'],
}

export default function MBTISurvey() {
  const [ans, setAnswers] = useState<Record<number, string>>({})
  const [curr, setCurrentQuestion] = useState<number>(0)
  const [showResult, setShowResult] = useState<boolean>(false)
  const [mbtiResult, setResult] = useState<string>("")

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const calc = () => {
    const d: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0, X: 0 }

    Object.values(ans).forEach((answer) => {
      if (answer in d) {
        d[answer]++;
      }
    })

    const type =
      (d.E > d.I ? "E" : "I") +
      (d.S > d.N ? "S" : "N") +
      (d.T > d.F ? "T" : "F") +
      (d.X === 0 ? (d.J > d.P ? "J" : "P") : "X")

    setResult(type)
    setShowResult(true)
  }

  const next = () => {
    if (curr < Q.length - 1) {
      setCurrentQuestion(curr + 1)
    } else {
      calc()
    }
  }

  const prev = () => {
    if (curr > 0) {
      setCurrentQuestion(curr - 1)
    }
  }

  const resetForm = () => {
    setAnswers({})
    setCurrentQuestion(0)
    setShowResult(false)
    setResult("")
  }

  const progress = ((curr + 1) / Q.length) * 100

  if (showResult && mbtiResult in mbtiTypes) {
    const resultData = mbtiTypes[mbtiResult];
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-gray-900 rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <p className="text-gray-300">당신이 피아노 작곡가였다면...</p>
          </div>
          <div className="flex items-center text-center flex-col gap-6">
            <img
              src={`/gameResources/mbti/${resultData[2]}`}
              alt="결과 이미지"
              width={300}
              height={200}
              className="rounded-lg shadow-lg object-cover"
            />
            <div className="text-6xl font-bold text-blue-400">{resultData[0]}</div>
            <div className="text-gray-300">{resultData[1]}</div>
            <button onClick={resetForm} className="systemBtn mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
              다시하기
            </button>
          </div>
        </div>
      </div>
    )
  }

  const q = Q[curr]
  const isAnswered = ans[q.id] !== undefined
  const imgurl = q.imgsrc

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white">클래식 작곡가 유형 테스트</h1>
            <span className="text-sm text-gray-300">
              {curr + 1} / {Q.length}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded overflow-hidden">
            <div className="h-full bg-blue-400 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{q.text}</h3>
            <div className="flex justify-center mb-6">
              <img
                src={imgurl}
                alt={`질문 ${q.id} 이미지`}
                width={300}
                height={200}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              {q.options.map((opt, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 p-3 rounded-lg border border-gray-600 cursor-pointer transition-colors ${
                    ans[q.id] === opt.value ? "bg-blue-900" : "hover:bg-gray-800"
                  }`}
                  onClick={() => handleAnswer(q.id, opt.value)}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={opt.value}
                    checked={ans[q.id] === opt.value}
                    onChange={() => handleAnswer(q.id, opt.value)}
                    className="m-0"
                  />
                  <label className="flex-1 cursor-pointer text-white">{opt.text}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={prev}
              disabled={curr === 0}
              className={`py-2 px-4 rounded transition-colors ${
                curr === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
              } bg-gray-700 text-white border border-gray-600`}
            >
              이전 질문
            </button>
            <button
              onClick={next}
              disabled={!isAnswered}
              className={`py-2 px-4 rounded transition-colors ${
                !isAnswered
                  ? "opacity-50 cursor-not-allowed bg-gray-700 text-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {curr === Q.length - 1 ? "결과 보기" : "다음 질문"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}