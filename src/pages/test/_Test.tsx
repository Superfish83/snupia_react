import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './_Test.css'
import '../common.css'

import { TestComponent } from '../../components/testComponent'

export default function Test() {
  
  return (
    <>
      <div>
        <img src="/snupia_logo.webp" className="logo snupia" alt="SNUPia logo" />
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>SNUPia React Pages</h1>
      <h2>(Test page)</h2>
      <h2>Powered by Vite + React + TypeScript</h2>
      <TestComponent />
    </>
  )
}