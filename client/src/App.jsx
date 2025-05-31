// Import Components
import Home from "./components/Home";
import Register from "./components/Register";

// Import Libraries
import { Routes, Route } from "react-router-dom";

// Import assets
import cursorpng from "./assets/spoon.png";

const App = () => {
  return (
    <div
      style={{
        cursor: `url(${cursorpng}) 0 0, crosshair`,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
