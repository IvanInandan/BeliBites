// Import Components
import Home from "./components/Home";

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
      </Routes>
    </div>
  );
};

export default App;
