// // --------------------------------------------
// // CatalogItem.tsx
// // 소장 악보 검색 결과의 항목(item)을 표시하는 컴포넌트
// // (251225 김연준)
// // --------------------------------------------

// import { useState } from "react";
// import './Catalog.css';


// // tag 컴포넌트 (클릭 시 검색어로 설정)
// function ItemTag(
//     { text, setSearchText }:
//     { text: string; setSearchText: (text: string) => void }
// ) {
//   return (
//     <button
//       onClick={() => { setSearchText(text); }}
//       className="itemtag">
//       {text}
//     </button>
//   );
// }

// export default function CatalogItem(
//     { itemJson, setSearchText }:
//     { itemJson: any; setSearchText: (text: string) => void }
// ) {
//     // 상세정보 열람 toggle 상태
//     const [isOpen, setIsOpen] = useState<boolean>(false);

//     if (isOpen){    // 상세정보 표시
//         return (
//         <button onClick={() => setIsOpen(!isOpen)} className="item">

//         </button>
//         )
//     }
//     else{           // 간략한 정보만 표시
//         return (
//         <button onClick={() => setIsOpen(!isOpen)} className="item">
//             <div className="item-title">
//                 {itemJson.title_kor}
//             </div>
//             <div className="item-subtitle">
//             </div>
//         </button>
//         )
//     }
// }