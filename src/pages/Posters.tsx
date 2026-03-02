import './Posters.css'
import { useState } from 'react';

interface Poster {
  id: number;
  title: string;
  desc: string; // 설명글 필드 추가
  images: string[];
  link: string;
}

// 2. 데이터 정의 (설명글 내용 예시 추가)
const Data: Poster[] = [
  {
    id: 34,
    title: "2025년 SNUPia 제34회 정기연주회",
    desc: `[1부]
장성재(화학생물공학부 21): W. A. Mozart - Piano Sonata in a minor, K. 310, II. Andante cantabile, III. Presto
양아름(자유전공학부 24): L. v. Beethoven - Piano Sonata No.5 in c minor, Op. 10-1, I. Allegro molto e con brio
최유림(교육학과 석사과정): L. v. Beethoven - Piano Sonata No. 6 in F Major, Op. 10-2, I. Allegro, II. Allegretto, III. Presto
최창인(원자핵공학과 22): L. v. Beethoven - Piano Sonata No. 8 in c minor, Op. 13 "Pathétique", II. Adagio cantabile / F. Chopin - Prelude Op. 28 No. 15 in D-flat Major
이상혁(첨단융합학부 25): F. Chopin - Polonaise in A-flat Major, Op. 53 "Heroic"
이현서(음악학과 23): F. Chopin - Barcarolle in F-sharp Major, Op. 60

[2부]
문도현(약학과 석사과정): F. Chopin - Ballade No. 3 in A-flat Major, Op. 47
박기범(경제학부 25): F. Liszt - Mephisto Waltz No. 1, S. 514
이유찬(통계학과 23): F. Liszt - Annes de perelinage, 2nd Year "Italie", S. 161, V. Sonetto 104 del Petraca
김건호(수리과학부 25): F. Schubert / F. Liszt - "Erlkönig", S. 558/4
동희재(철학과 24): M. Ravel - Le Tombeau de Couperin, M. 68, I. Prelude
김연준(컴퓨터공학부 24): M. Glinka / M. Balakirev - "The Lark"
배준익(컴퓨터공학부 19): N. Kapustin - Concert Etude Op. 40 No. 6, "Pastorale"
강성래(물리학과 석박통합과정): C. V. Alkan - Etude Op. 27 "Le Chemin de Fer"
이승현(의예과 24학번): C. Franck - Prelude, Choral et Fugue, FWV21, II. Choral, III. Fugue

[앵콜]
김진웅&전혜인(농경제사회학부 23/음악학과 24): P. Tchaikovsky - Waltz of the Flowers (from "The Nutcracker", Op. 71)`,
    link: "https://www.youtube.com/playlist?list=PLqucC5JV05LRP1qU8Bv6m5E9ZxxhIskOl",
    images: [
      "https://snupia.kr/data/file/history/thumb-9f5f4fc49da219384e176a06539d473e_QvEUdgCW_c8e8c3b6c3170a4968c124a01397edff275be2ba_600x848.jpg",
      "https://snupia.kr/data/file/history/thumb-9f5f4fc49da219384e176a06539d473e_kps9JKUx_4330fe02d206c12debf7744273b31abe3c6230b8_600x848.jpg"
    ]
  },
  {
    id: 33,
    title: "2025년 SNUPia 제33회 정기연주회",
    desc: `[1부]
김진웅(농경제사회학부 23) & 이승현(의예과 24): N. Kapustin, Sinfonietta for Piano 4-Hands, Op. 49 - II. Slow Waltz
최창인(원자핵공학과 22): W. A. Mozart, Piano Sonata in F Major, K. 332 - I. Allegro, II. Adagio
김유선(수의예과 24): J. Haydn, Piano Sonata No. 50 in D Major, Hob. XVI:37 - I. Allegro con brio
최유림(교육학과 석사과정 24): R.Schumann, Fantasie in C Major, Op.17 - I. Durchaus fantastisch und leidenschaftlich vorzutragen; Im Legenden-Ton
이은애(작곡과 21): S. Rachmaninoff, Prelude, Op. 32 No. 9 / Op. 3 No. 2
강상훈(치의학과 24): F. Liszt, Grandes études de Paganini, S. 141, No. 3 “La Campanella”

[2부]
박원(컴퓨터공학부 98, SNUPia 1기): Queen - Bohemian Rhapsody (arr. 박원)
문지원(피아노과 12, SNUPia 8기): F. Chopin, Etude Op. 25 No. 6 in G-Sharp minor
최재열(통계학과 23): A. Scriabin, Piano Sonata No. 2, Op. 19 "Sonata-Fantasy"
이현서(음악학과 23): J. Sibelius, 5 pieces for Piano Op. 75 “The Trees”, No. 1, 5
김연준(컴퓨터공학부 24): F. Chopin, Etude Op. 25 No. 1, 12
문도현(약학과 석사과정 24): F. Chopin, Ballade No. 1 in G minor, Op. 23
조예나(기계공학부 24): F. Liszt, Hungarian Rhapsody No. 2 in C-sharp minor, S.244/2

[앵콜]
김진웅 (농경제사회학부 23): F. Liszt, Liebestraum No. 3, S. 541`,
    link: "https://www.youtube.com/playlist?list=PLqucC5JV05LRP1qU8Bv6m5E9ZxxhIskOl",
    images: [
      "https://snupia.kr/data/file/history/thumb-2de5de814d3f8a28074eb39315ddd298_Oohdw1cf_8a0ec98cd7c93678326333167808f8f86eff2e03_600x850.jpg"
    ]
  },
];

interface PostRow {
  info: Poster;
  onImageClick: (imgSrc: string) => void;
}

function PostRow({ info, onImageClick }: PostRow) {
  return (
    <div className="concert-row">
      <div className="poster-column">
        {info.images.map((src, index) => (
          <img 
            key={index} 
            src={src} 
            alt={`${info.title} 포스터 ${index + 1}`}
            className="poster-thumb"
            onClick={() => onImageClick(src)}
          />
        ))}
      </div>
      <div className="info-column">
        <h2 className="info-title">{info.title}</h2>
        <p className="info-desc">{info.desc}</p>
        <a href={info.link} target="_blank" rel="noopener noreferrer"className="info-link">
          ▶
        </a>
      </div>
    </div>
  );
}

export default function Posters() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imgSrc: string) => {
    setSelectedImage(imgSrc);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container">
      <header className="header">
        <img src="/snupia_logo.webp" className="logo" alt="SNUPia logo" />
        <h1>SNUPia 정기연주회 포스터 전시</h1>
      </header>
      
      <div className="poster-list">
        {Data.map((concert) => (
          <PostRow 
            key={concert.id} 
            info={concert} 
            onImageClick={handleImageClick}
          />
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content">
            <img src={selectedImage} alt="확대된 포스터" />
            <button className="close-btn" onClick={handleCloseModal}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}