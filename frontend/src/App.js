import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import HoldingPage from "@/pages/HoldingPage";

function App() {
  return (
    <div className="App">
      <Toaster
        position="top-center"
        theme="light"
        toastOptions={{
          style: {
            background: "#FDFBF7",
            border: "1px solid #E5DCCF",
            color: "#1A1A1A",
            fontFamily: "Outfit, sans-serif",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HoldingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
