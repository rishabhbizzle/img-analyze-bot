import ChatBot from "./components/ChatBot";
import Sidebar from "./components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { useState } from "react";

function App() {
  const [reRender, setReRender] = useState(false);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
        <Sidebar reRender={reRender} setReRender={setReRender} />
        <div className="flex flex-col">
          <ChatBot reRender={reRender} setReRender={setReRender} />
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
