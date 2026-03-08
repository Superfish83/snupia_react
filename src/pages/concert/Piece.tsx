import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import "./Concert.css";

// 데이터 타입 정의
export interface PieceItem {
  composer: string;
  title: string;
  movement?: string;
}

export interface Performer {
  name: string;
  info: string;
}

export interface PieceData {
  piece: PieceItem[];
  performer?: Performer;
  intro_performer?: string[];
  intro_piece?: string[];
}

interface PieceProps {
  data: PieceData;
}

interface FadeInProps {
  delay: number;
  className?: string;
  children: ReactNode;
}

export default function Piece({ data }: PieceProps) {
  const [open, setOpen] = useState<boolean>(false);

  const PieceFadeInDiv = ({ delay, className, children }: FadeInProps) => (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );

  return (
    <AnimatePresence>
      <div
        className={`piece-card ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex-col gap-2">
          {data.piece.map((piece_item, key) => (
            <div key={key} className="piece-title">
              <p style={{margin: 0}}>{`${piece_item.composer}: ${piece_item.title}`}</p>
              {piece_item.movement && (
                <p style={{margin: 0}} className="piece-movement">{piece_item.movement}</p>
              )}
            </div>
          ))}
        </div>

        {open && (
          <AnimatePresence mode="sync">
            <div className="piece-details">
              <PieceFadeInDiv delay={0} className="detail-title">
                {data.performer?.name} ({data.performer?.info})
              </PieceFadeInDiv>

              <PieceFadeInDiv delay={0.1} className="flex-col gap-2 mb-2">
                {data.intro_performer?.map((text, key) => (
                  <p style={{margin: 0}} key={key}>{`⠀${text}`}</p>
                ))}
              </PieceFadeInDiv>

              <PieceFadeInDiv delay={0.3} className="detail-title">
                곡 소개
              </PieceFadeInDiv>

              <PieceFadeInDiv delay={0.4} className="flex-col gap-2">
                {data.intro_piece?.map((text, key) => (
                  <p style={{margin: 0}}>{`⠀${text}`}</p>
                ))}
              </PieceFadeInDiv>
            </div>
          </AnimatePresence>
        )}
      </div>
    </AnimatePresence>
  );
}