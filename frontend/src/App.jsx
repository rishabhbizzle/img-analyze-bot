import { useState } from 'react'
import ChatBot from './components/ChatBot'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
    <Sidebar />
    <div className="flex flex-col">
      <ChatBot />
    </div>
  </div>
  )
}

export default App
