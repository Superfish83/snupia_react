import React from 'react';
import poster1 from '../assets/poster1.jpg'; 

function Home() {
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#000', minHeight: '80vh' }}>
      <div style={{ marginBottom: '40px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <img 
          src={poster1} 
          alt="제35회 정기연주회 포스터" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
      </div>

      <h2 style={{ 
        fontFamily: "'Nanum Myeongjo', serif", 
        fontSize: '24px', 
        color: '#C5A880', 
        fontWeight: '700', 
        marginBottom: '30px',
        letterSpacing: '2px'
      }}>
        초대의 글
      </h2>
      <p style={{ 
        lineHeight: '2.0', 
        fontSize: '15px', 
        color: '#ddd', 
        wordBreak: 'keep-all',
        fontWeight: '300'
      }}>
        서울대학교 중앙피아노동아리 SNUPia가<br />
        제35회 정기연주회를 개최합니다!<br /><br />
        
        연주자들이 정성껏 준비한 프로그램과<br />
        다양한 무대로 동아리원들이<br />
        관객 여러분을 맞이합니다.<br /><br />
        
        따뜻한 관심과 많은 응원 부탁드립니다!
      </p>
      
      <div style={{ width: '40px', height: '1px', backgroundColor: '#C5A880', margin: '40px auto' }}></div>
    </div>
  );
}

export default Home;