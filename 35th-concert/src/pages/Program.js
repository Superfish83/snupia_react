import React from 'react';

function Program() {
  const programList = [
    { id: 1, composer: "R. Schumann", title: "Nachtstücke, Op. 23, No. 3, 4", player: "이상혁" },
    { id: 2, composer: "A. Scriabin", title: "Étude in c-sharp minor, Op. 2, No. 1\nA. Scriabin: Valse, Op. 38", player: "최재열" },
    { id: 3, composer: "F. Chopin", title: "Ballade No. 1 in g minor, Op. 23", player: "양승민" },
    { id: 4, composer: "F. Chopin", title: "Ballade No. 4 in f minor, Op. 52", player: "김동환" },
    { id: 5, composer: "F. Mendelssohn", title: "Fantasy in f-sharp minor, Op. 28", player: "이유찬" },
    { id: 'intermission', isIntermission: true },
    { id: 6, composer: "S. Rachmaninoff", title: "Moments musicaux, Op. 16, No. 4", player: "박재영" },
    { id: 7, composer: "F. Chopin", title: "Ballade No. 2 in F Major, Op. 38", player: "문도현" },
    { id: 8, composer: "F. Chopin", title: "Polonaise-Fantaisie in A-flat Major, Op. 61", player: "이승현" },
    { id: 9, composer: "J. Brahms", title: "Piano Sonata No. 1 in C Major, Op. 1\nI. Allegro", player: "장성재" },
    { id: 10, composer: "S. Rachmaninoff", title: "Piano Sonata No. 2, Op. 36 (1913)\nII. Non allegro - Lento, III. Allegro Molto", player: "전지호" }
  ];

  return (
    <div style={{ padding: '30px 20px', backgroundColor: '#0B0C10', color: '#E0E0E0', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '30px', fontWeight: '300', marginBottom: '40px', borderBottom: '1px solid #C5A880', paddingBottom: '15px', color: '#fff' }}>Program</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {programList.map((item) => {
          if (item.isIntermission) {
            return <li key={item.id} style={{ textAlign: 'center', margin: '50px 0', fontSize: '18px', color: '#C5A880', letterSpacing: '3px', fontWeight: '300' }}>&lt; Intermission &gt;</li>;
          }
          return (
            <li key={item.id} style={{ marginBottom: '35px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, paddingRight: '20px' }}>
                  <span style={{ fontSize: '13px', color: '#999', letterSpacing: '1px' }}>{item.composer}</span>
                  <div style={{ fontSize: '16px', color: '#FFF', whiteSpace: 'pre-line', marginTop: '6px', lineHeight: '1.5', fontWeight: '300' }}>{item.title}</div>
                </div>
                <div style={{ fontSize: '16px', color: '#C5A880', whiteSpace: 'nowrap', marginTop: '20px', fontWeight: '400' }}>{item.player}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Program;