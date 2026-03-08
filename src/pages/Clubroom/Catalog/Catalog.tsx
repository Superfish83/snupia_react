// // --------------------------------------------
// // Catalog.tsx
// // 소장 악보 리스트 및 검색 기능을 제공하는 컴포넌트
// // (251225 김연준)
// // --------------------------------------------

// import { useEffect, useState } from 'react';
// import './Catalog.css';

// import { getCatalogList } from './getCatalogList';
// import SearchBar from './CatalogSearchBar';
// import CatalogItem from './CatalogItem';

// export default function Catalog() {
//   const [searchText, setSearchText] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const max_show_cnt = 30;
//   const [catalogList, setCatalogList] = useState<Array<Object>>([]);  // 소장자료 전체 목록
//   const [showList, setShowList] = useState<Array<Object>>([]);        // 화면에 표시할 목록


//   // 소장 악보 리스트를 .xlsx 파일로부터 JSON array 형식으로 불러오기
//   async function loadCatalog(): Promise<void> {
//     const list = await getCatalogList();
//     setCatalogList(list);
//     setShowList(list.slice(0, max_show_cnt));
//     setIsLoading(false);
//   }
//   useEffect(() => {loadCatalog()}, []);
  
//   const CatalogList = () => (
//     <section className="catalog-list">
//       {showList.map((itemJson, index) => (
//         <CatalogItem
//           key={index}
//           itemJson={itemJson}
//           setSearchText={setSearchText}
//         />
//       ))}
//     </section>
//   )
  
//   return (
//     <>
//       <SearchBar searchText={searchText} setSearchText={setSearchText} />
//       {isLoading ? <div>Loading...</div> : <CatalogList />}
//     </>
//   );
// }