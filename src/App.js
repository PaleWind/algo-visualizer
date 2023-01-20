import Sidebar from "./pages/Sidebar";
import Home from "./pages/Home";
import Sort from "./pages/Sort";
import Visualizer2 from "./pages/Visualizer2";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sort" element={<Sort />} />
        <Route path="/Visualizer2" element={<Visualizer2 />} />
      </Routes>
      <Sidebar />
    </div>
  );
}

export default App;
