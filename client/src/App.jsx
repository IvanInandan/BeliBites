// Import Components
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

// Import Libraries
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Import assets
import cursorpng from "./assets/spoon.png";

const App = () => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log("Current user: ", user);
  }, [user]);

  return (
    <div
      style={{
        cursor: `url(${cursorpng}) 0 0, crosshair`,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default App;
