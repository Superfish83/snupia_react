// // --------------------------------------------
// // CatalogSearchBar.tsx
// // 소장자료 search bar 컴포넌트
// // (251225 김연준)
// // --------------------------------------------

// import { useEffect, useState } from "react";
// import './Catalog.css';

// // import icons
// import { HiMagnifyingGlass } from "react-icons/hi2";
// import { HiXMark } from "react-icons/hi2";


// export default function SearchBar(
//   { searchText, setSearchText}:
//   { searchText: string; setSearchText: (text: string) => void;})
// {
//   // 검색어 state
//   const [barContent, setBarContent] = useState<string>("");
//   useEffect(() => {
//     setBarContent(searchText);
//   }, [searchText]);

//   // 검색 버튼 클릭 handler
//   function handleSearch(): void {
//     if (barContent.length <= 1) {
//       alert("검색어는 2글자 이상 입력해주세요.");
//       return;
//     }
//     else{
//       setSearchText(barContent.trim());
//     }
//   }

//   return (
//     <section className="searchbar-container">
//       <div>소장 악보 검색 (기준일: 2025.12.25)</div>
//       <section className="searchbar">
//         <input
//           type="text"
//           placeholder="검색어를 입력하세요 (ex: 쇼팽, 소나타, ...)"
//           value={barContent}
//           onChange={(e) => { setBarContent(e.target.value); }}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSearch();
//               e.currentTarget.blur();
//             }
//           }}
//         />
//         <button onClick={() => { setBarContent(""); setSearchText(""); }}>
//           <HiXMark />
//         </button>
//         <button onClick={handleSearch}>
//           <HiMagnifyingGlass />
//         </button>
//       </section>
//     </section>
//   );
// }