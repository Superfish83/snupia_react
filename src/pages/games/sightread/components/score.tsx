export default function Score({ imgsrc, showsrc }: { imgsrc: string; showsrc: string }) {
  return (
    <img
      src={`${imgsrc}`}
      alt="score"
      height={100}
      width={100}
      className="w-40 h-40 absolute top-0 left-0"
      style={{
        visibility: imgsrc == showsrc ? "visible" : "hidden",
      }}
    />
  );
}
