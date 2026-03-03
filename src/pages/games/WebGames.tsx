import './WebGames.css';

function GameButton({ name, link, imgsrc, desc }: { name: string, link: string, imgsrc: string, desc?: string }) {
  return (<a href={link} className='webgame-card'>
      <img src={imgsrc} alt={name} className='games-img' />
      <div>
        <h2>{name}</h2>
        <br/> {desc && <p>{desc}</p>}
      </div>
  </a>)
};

export default function WebGames() {

  
  return (
    <>
      <br/>
      <h1>SNUPia 웹게임</h1>
      <br/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <GameButton name="피아노 초견 스피드 게임" desc="악보를 보고 알맞은 음을 빠르게 눌러보세요! 제한 시간 내에 최대한 많은 음을 맞혀야 합니다."
                    link="/webgames/sightread" imgsrc='/gameThumbs/1.jpg' />
        <GameButton name="작곡가 유형 심리 테스트" desc="내가 작곡가라면 어떤 사람이었을까? MBTI를 바탕으로 한 성격 유형 테스트입니다."
                    link="/webgames/mbti" imgsrc="/gameThumbs/3.jpg" />
      </div>
    </>
  )
}