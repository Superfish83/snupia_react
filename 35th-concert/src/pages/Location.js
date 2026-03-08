import React from 'react';

function Location() {
  return (
    <div style={{ padding: '30px 20px', color: '#fff' }}>
      <h2 style={{ color: '#C5A880', fontWeight: '300', textAlign: 'center', marginBottom: '40px', borderBottom: '1px solid #222', paddingBottom: '15px' }}>
        찾아오시는 길
      </h2>
      <div style={{ backgroundColor: '#111', padding: '25px 20px', borderRadius: '12px', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#fff', lineHeight: '1.4' }}>
          서울대학교 관악캠퍼스<br/>음악대학 예술관(49동) 콘서트홀
        </h3>
        <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
          <span style={{ color: '#777', marginRight: '8px' }}>도로명</span> 서울 관악구 관악로 1<br />
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <a href="https://map.naver.com/v5/search/서울대학교 음악대학 49동" target="_blank" rel="noreferrer" style={{ display: 'block', backgroundColor: '#03C75A', color: '#fff', textAlign: 'center', padding: '16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}>네이버 지도로 길찾기</a>
      </div>
    </div>
  );
}

export default Location;