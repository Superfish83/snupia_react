// import '../common.css'
// import './Clubroom.css'

// import Catalog from './Catalog/Catalog';

// // import icons
// import { GiMusicalScore } from "react-icons/gi";
// import { IoIosAlert } from "react-icons/io";

// export default function Clubroom() {
//   const GongsaAlert1 = () => (
//     <div className="alertbox">
//       <IoIosAlert />
//       <p>
//         <b>[공지]</b> 학생회관 리모델링 공사로 인해 2026년 3월 말까지 기존 동아리방 출입이 제한됩니다.
//         공사 기간동안 피아노는 <b>서울대학교 67동(NH두레문예관) 105호(다향만당)</b>에서 이용하실 수 있습니다.
//         사용 가능한 시간 및 예약 방법은 카카오톡 공지를 참조해 주세요.
//       </p>
//     </div>
//   );
//   const GongsaAlert2 = () => (
//     <div className="alertbox">
//       <IoIosAlert />
//       <p>
//         <b>[공지]</b> 학생회관 리모델링 공사로 인해 공사기간 중 악보 열람이 불가합니다.
//       </p>
//     </div>
//   );
  
//   return (
//     <>
//       <h1><GiMusicalScore /> 동아리방 소개</h1>

//       <div className="imgbox">
//         <img src="/clubroom/piano.jpg" alt="piano" />
//         <img src="/clubroom/art.jpg" alt="art" />
//       </div>

//       {/* 2026년 3월까지 공사 관련 공지인데 끝나면 지워 주세요.
//           (251225 김연준) */}
//       <GongsaAlert1 />

//       <p>
//         SNUPia의 동아리방은 <b>서울대학교 학생회관(63동) 428호</b>에 위치해 있습니다.
//       </p>
//       <p>
//         동아리방에는 <b>그랜드 피아노 2대</b>가 비치되어 있어 회원들이 멘토링을 진행하거나 자유롭게 연습할 수 있습니다.
//         피아노 이용 시에는 다음 사항을 준수해야 합니다.
//       </p>

//       <ol>
//         <li><b>과도하게 힘을 실은 타건 금지</b> (현이 끊어지거나 조율이 틀어집니다)</li>
//         <li>사용 시간 준수 (<b>사용 시작 시 타이머 작동</b>, 1시간 후 대기자가 있을 경우 양보)</li>
//         <li><b>음식물, 음료, 필기구</b>는 피아노 근처에 두지 않기</li>
//         <li>피아노 사용 전후로 손 씻기, 주변 정리하기, 덮개 닫기</li>
//       </ol>


//       <br/>
//       <h2><GiMusicalScore /> 동아리방 시설</h2>
//       <p>
//         동아리방에는 피아노 이외에도 책장과 침대가 구비되어 있어 회원들이 휴식을 취하거나 악보 열람, 독서를 할 수 있습니다.
//         음악 감상 정기모임이나 소규모 연주회 등도 동아리방에서 진행됩니다.
//       </p>


//       <br/>
//       <h2><GiMusicalScore /> 소장 악보</h2>

//       <div className="imgbox">
//         <img src="/clubroom/shelf.jpg" alt="shelf" />
//       </div>

//       {/* 2026년 3월까지 공사 관련 공지인데 끝나면 지워 주세요.
//           (251225 김연준) */}
//       <GongsaAlert2 />

//       <p>
//         동아리방에는 다양한 시대와 장르의 악보들이 구비되어 있어 회원들이 자유롭게 열람할 수 있습니다.
//         아래 메뉴에서 원하는 자료가 있는지 조회할 수 있으며, 구입 신청 혹은 기증 문의는 집행진에게 연락해 주세요.
//       </p>

//       <br/>
//       <Catalog />
//       <br/>
//     </>
//   )
// }