export default function NotFound() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}>
        <img src="/snupia_logo.webp" className="logo snupia" alt="SNUPia logo" />
        <h1>404 - Page Not Found</h1>
        <p>페이지가 없습니다.</p>
        </div>
    )
    }