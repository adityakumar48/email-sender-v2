import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Send from "./pages/Send";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
