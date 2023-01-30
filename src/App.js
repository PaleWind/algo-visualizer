import Sidebar from "./pages/Sidebar";
import Home from "./pages/Home";
import Sort from "./pages/Sort";
import Pathing from "./pages/Pathing";
import Pathing2 from "./pages/Pathing2";
import GraphQL from "./pages/GraphQL";
import SelfDriving from "./pages/SelfDriving";
import { Route, Routes } from "react-router-dom";
import "./Styles/App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/sort" element={<Sort />} />
        <Route path="/Pathing" element={<Pathing />} />
        <Route path="/Pathing2" element={<Pathing2 />} />
        <Route path="/GraphQL" element={<GraphQL />} />
        <Route path="/SelfDriving" element={<SelfDriving />} />
      </Routes>
      <Sidebar />
    </div>
  );
}

export default App;
