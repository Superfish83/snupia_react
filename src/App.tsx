import {BrowserRouter, Route, Routes} from 'react-router-dom'

// import pages
import NotFound from './pages/_NotFound.tsx'
import Test from './pages/_Test.tsx'

import About from './pages/About.tsx'
import Clubroom from './pages/Clubroom.tsx'
import Posters from './pages/Posters.tsx'
import WebGames from './pages/WebGames.tsx'
import GamesMBTI from './pages/games/mbti.tsx'


// main App component (routing 담당)
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Test />} />
        <Route path="*"         element={<NotFound />} />

        <Route path="/about"    element={<About />} />
        <Route path="/clubroom" element={<Clubroom />} />
        <Route path="/posters"  element={<Posters />} />
        <Route path="/webgames" element={<WebGames />} />
        <Route path="/webgames/mbti" element={<GamesMBTI />} />

        {/* 추가 예정 */}
      </Routes>
    </BrowserRouter>
  )
}