import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px', backgroundColor: '#0B0C10' }}>
        <button onClick={toggleMenu} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '28px', cursor: 'pointer' }}>
          ☰
        </button>
      </header>

      {isMenuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: '#000000', zIndex: 1000, padding: '40px 20px', 
          display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={closeMenu} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '30px', cursor: 'pointer' }}>✕</button>
          </div>
          
          <div style={{ marginTop: '40px', paddingLeft: '20px' }}>
            <h3 style={{ color: '#fff', borderBottom: '1px solid #555', paddingBottom: '10px', marginBottom: '20px', fontWeight: '400' }}>공연정보</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: '10px', marginBottom: '50px' }}>
              <Link to="/" onClick={closeMenu} style={{ color: '#ccc', textDecoration: 'none' }}>HOME</Link>
              <Link to="/location" onClick={closeMenu} style={{ color: '#ccc', textDecoration: 'none' }}>찾아오시는 길</Link>
            </div>

            <h3 style={{ color: '#fff', borderBottom: '1px solid #555', paddingBottom: '10px', marginBottom: '20px', fontWeight: '400' }}>프로그램북</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: '10px' }}>
              <Link to="/program" onClick={closeMenu} style={{ color: '#ccc', textDecoration: 'none' }}>연주 프로그램</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;