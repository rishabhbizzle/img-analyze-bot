import ChatBot from './components/ChatBot'
import Sidebar from './components/Sidebar'

function App() {

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
