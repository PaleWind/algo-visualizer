import Sidebar from "./pages/Sidebar";
import Home from "./pages/Home";
import Sort from "./pages/Sort";
import Pathing from "./pages/Pathing";
import { redirect, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/sort" element={<Sort />} />
        <Route path="/Pathing" element={<Pathing />} />
      </Routes>
      <Sidebar />
    </div>
  );
}

export default App;
