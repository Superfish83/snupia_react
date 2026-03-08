import './About.css'

// import icons
import { GiMusicalScore } from "react-icons/gi";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";

export default function About() {
  const GongsaAlert = () => (
    <div className="alertbox">
      <IoIosAlert />
      <p>
        <b>[공지]</b> 학생회관 리모델링 공사로 인해 2026년 3월 말까지 기존 동아리방 출입이 제한됩니다.
        대체 활동 공간 및 시간은 카카오톡 공지를 참조해 주세요.
      </p>
    </div>
  );
  
  return (
    <div style={{padding: 30}}>
      <h1><GiMusicalScore /> 동아리 소개 </h1>
      
      <p>
        <b>SNUPia(Seoul National University & Piano)</b>는 2005년 설립된 중앙피아노동아리이자
        서울대학교 음악대학 유관 단체로, 학부생, 대학원생 등 서울대학교 구성원 중 피아노에 열정을 가진 이들이
        모여 운영되고 있습니다. 매 학기 정기연주회, 교류연주회, 연합연주회, 각종 소규모 연주회 등을 진행하고 있으며,
        2025년까지 총 34회의 정기연주회를 성공적으로 개최했습니다.
      </p>

      <div className="imgbox">
      {/* 최신 정기연주회 게시글에서 포스터 '이미지 링크 복사' 후 붙여넣기 하여 업데이트해 주세요.
          (251225 김연준) */}
      <img  src="https://snupia.kr/data/file/history/thumb-9f5f4fc49da219384e176a06539d473e_QvEUdgCW_c8e8c3b6c3170a4968c124a01397edff275be2ba_600x848.jpg"
            alt="concert"></img>
      <img  src="https://snupia.kr/data/file/history/thumb-9f5f4fc49da219384e176a06539d473e_kps9JKUx_4330fe02d206c12debf7744273b31abe3c6230b8_600x848.jpg"
            alt="concert"></img>
      </div>
      <div className="imgcaption">2025년 SNUPia 제34회 정기연주회 포스터</div>

      <p>
        SNUPia의 동아리방은 <b>서울대학교 학생회관(63동) 428호</b>에 위치해 있습니다.
        동아리방에는 <b>그랜드 피아노 2대</b>와 다양한 시대의 악보들이 구비되어 있어 회원들이 언제나 자유롭게 연습할 수 있습니다.
        자세한 내용은 아래 링크의 페이지를 참조해 주세요.
      </p>
      
      {/* 2026년 3월까지 공사 관련 공지인데 끝나면 지워 주세요.
          (251225 김연준) */}
      <GongsaAlert />

      <div className="linkbox">
      <a className="linkbutton" href="https://snupia.kr/utils/clubroom?" target="_blank" rel="noopener noreferrer">
      <GiMusicalScore /> 동아리방 및 소장 자료 안내</a>
      </div>





      <br/>
      <h2><GiMusicalScore /> 멘토링 활동</h2>
      <p>
        SNUPia는 <b>전공생 멘토링</b> 및 <b>비전공생 멘토링</b>을 운영하고 있습니다.
        우선 전공생멘토링은 소정의 신청비 납부 후 피아노과, 혹은 예술중학교나 예술고등학교에서 피아노를 전공한 회원에게
        멘토링을 받는 활동입니다. 최소 월 1회 1시간 이상 전공생 멘토에게 멘토링을 받을 수 있습니다.
        이어서, 비전공생 멘토링은 동아리 내 비전공생 회원이 멘티와 멘토로서 1대1로 매칭되어 학기 동안 멘티의 피아노 연습을
        멘토가 도와주는 활동입니다.
      </p>





      <br/>
      <h2><GiMusicalScore /> 친목 활동</h2>
      <p>
        SNUPia는 <b>MT, 개강/종강파티</b> 및 학기 중 여러 차례 <b>정기모임</b>을 열어 회원들 간의
        친목을 도모하고 있습니다. 정기모임에서는 피아노와 음악에 관련된 활동뿐만 아니라 버들골 점심 모임,
        보드게임 모임, 시험기간 스터디 모임 등 다양한 활동이 이루어지며, 부담 없이 참여하여 회원들과 친해질 수 있는
        자리를 마련하고 있습니다.
      </p>

      <div className="imgbox">
      {/* 최신 정기모임 게시글에서 포스터 '이미지 링크 복사' 후 붙여넣기 하여 업데이트해 주세요.
          (251225 김연준) */}
      <img  src="https://snupia.kr/data/editor/2510/20251020092839_cb50b57248a4cb6498dcdd9141dea390_c43h.jpg"
            alt="meeting"></img>
      <img  src="https://snupia.kr/data/editor/2505/20250518154238_86f0fb8282f3c30eb6b3ea3eaad51d05_v3cy.jpg"
            alt="meeting"></img>
      </div>
      <div className="imgcaption">2025년 SNUPia 정기모임</div>
      




      <br/>
      <h2><GiMusicalScore /> 대외 교류 활동</h2>
      <p>
        SNUPia는 타 대학 피아노동아리와의 대외 교류에도 집중하고 있습니다. <b>하양까망(숭실대), 건드림(서강대),
        선율(건국대), PIY(연세대), TTP(고려대), 음취헌(성균관대), 인하인의피아노사랑(인하대)</b> 등과
        교류하며 각종 앙상블, 교류연주회, 연합연주회 등을 개최하고 있습니다.
        더불어, <b>서울대학교 아마추어 오케스트라 SNUPO</b>와는 방학마다 앙상블 연주회를 개최하는 등
        각종 협력사업을 다방면으로 진행하고 있습니다.
      </p>


      <div className="imgbox">
      {/* 최신 교류연주회/앙상블 게시글에서 포스터 '이미지 링크 복사' 후 붙여넣기 하여 업데이트해 주세요.
          (251225 김연준) */}
      <img  src="https://snupia.kr/data/editor/2511/thumb-20251110214700_20d40af4043ba35e8201a9c544cdc617_0ujd_600x800.png"
            alt="cooperation"></img>
      <img  src="https://snupia.kr/data/editor/2506/thumb-20250606215708_59a112a0e6485e74faa4a06af1c1dda7_jhwf_600x849.jpg"
            alt="cooperation"></img>
      </div>
      <div className="imgcaption">교류연주회/앙상블 포스터</div>





      <br/>
      <h2><GiMusicalScore /> 가입 안내</h2>
      <p>
        SNUPia는 실력보다 열정을 중시합니다. 현재 가지고 있는 실력에 걱정하지 마시고, 적극적으로 가입 신청해 주세요!
        신입 회원 모집은 정규학기 개강 직후(3월, 9월)에 진행합니다.
      </p>
      <p>
        가입 문의는 아래 오픈채팅 또는 인스타그램 DM을 통해 부탁드립니다!
      </p>
      <div className="linkbox">
      <a className="linkbutton" href="https://open.kakao.com/o/g9iTf42f" target="_blank" rel="noopener noreferrer">
      <RiKakaoTalkFill /> 오픈채팅</a>
      <a className="linkbutton" href="https://www.instagram.com/snupia_snu/" target="_blank" rel="noopener noreferrer">
      <FaInstagram />  인스타그램</a>
      </div>
      <br/>

    </div>
  )
}