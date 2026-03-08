import { FaMapLocationDot } from "react-icons/fa6";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { type ReactNode } from "react";

import Piece, { type PieceData } from "./Piece";
import "./Concert.css";

import piecedata1Json from "./pieceData1.json";
import piecedata2Json from "./pieceData2.json";

const piecedata1 = piecedata1Json as PieceData[];
const piecedata2 = piecedata2Json as PieceData[];

interface FadeInProps {
  delay: number;
  className?: string;
  children: ReactNode;
}

export default function Concert35() {
  const FadeInDiv = ({ delay, className, children }: FadeInProps) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );

  const Subtitle = ({ className = "", children }: { className?: string; children: ReactNode }) => (
    <h2 className={`section-subtitle ${className}`}>
      {children}
    </h2>
  );

  return (
    <div className="concert-wrapper">

      <AnimatePresence>
        <div className="content-container">
          <FadeInDiv delay={0} className="main-header">
            <div className="concert-title">
              <span className="leftpow">
              {"SNUPia"}
              </span>
              <span style={{width: 30}}> </span>
              <span>
                <div className="pow" style={{color:"white"}}>{"35th "}</div>
                <div className="pow">
                  {"Piano"}
                </div>
                <div className="pow">{"Concert"}</div>
              </span>
            </div>
          </FadeInDiv>

          <br />

          <FadeInDiv delay={0.5} className="text-center text-xl keep-all">
            <h2>서울대학교 중앙 피아노 동아리</h2>
            <h2>SNUPia의 제 35회 정기연주회에</h2>
            <h2>당신을 초대합니다.</h2>
          </FadeInDiv>
          
          <br />
          
          <FadeInDiv delay={1.0} className="info-section">
            <div className="location-row">
              서울대학교 음악대학<br></br>
              예술관(49동) 콘서트홀
              <a
                href="https://map.naver.com/p/entry/place/18716669?c=16.85,0,0,0,dh"
                target="_blank"
                rel="noopener noreferrer"
                className="map-button pulse-animation"
              >
                <FaMapLocationDot size={20} className="mx-1" />
              </a>
            </div>
            <div>2026.03.14(토) 16시</div>
            <div className="underline">전석 무료</div>
          </FadeInDiv>

          <br />

          <FadeInDiv delay={1.2} className="program-section">
            <Subtitle className="text-2xl">PROGRAM</Subtitle>
            <br />
            <div>곡명을 누르면 연주자의 곡 소개를 펼쳐볼 수 있어요.</div>
            <br />

            <Subtitle className="text-2xl">1부</Subtitle>
            <section className="piece-list">
              {piecedata1.map((data, key) => (
                <Piece data={data} key={key} />
              ))}
            </section>

            <br />
            <Subtitle className="text-xl">Intermission</Subtitle>
            <br />

            <Subtitle className="text-2xl">2부</Subtitle>
            <section className="piece-list">
              {piecedata2.map((data, key) => (
                <Piece data={data} key={key} />
              ))}
            </section>
          </FadeInDiv>

          <br />

        </div>
      </AnimatePresence>
    </div>
  );
}