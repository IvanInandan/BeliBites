// Import custom hooks
import { useAuth } from "./hooks/useAuth";

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
  const { cacheUser } = useAuth();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // If user doesn't exist in global state, search browser cache
    if (!user) {
      const cachedUserJSON = window.localStorage.getItem("user");

      // If exists in cache, set in global state
      if (cachedUserJSON) {
        const cachedUser = JSON.parse(cachedUserJSON); // Parse JSON
        cacheUser(cachedUser);

        // transactionService.setToken(user.token); // Set token used for transaction APIs

        // Grab recipes of logged in user
      }
    }

    console.log(user);
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
