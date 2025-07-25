// Import custom hooks
import { useAuth } from "./hooks/useAuth";

// Import home components
import Landing from "./components/home/Landing";

// Import dashbaord components
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./components/dashboard/Dashboard";
import Recipes from "./components/dashboard/Recipes";
import CreateRecipeForm from "./components/dashboard/CreateRecipeForm";
import Favorites from "./components/dashboard/Favorites";
import Settings from "./components/dashboard/Settings";

// Import Libraries
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Import functions
import { token, setToken } from "./services/apiClient";

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
        setToken(cachedUser.token);

        // Grab recipes of logged in user
      }
    }
  }, [user]);

  return (
    <div
    // style={{
    //   cursor: `url(${cursorpng}) 0 0, crosshair`,
    // }}
    >
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={!user ? <Landing /> : <Navigate to="/dashboard" replace />}
        />

        {/* Protected routes, only accessible if the user is authenticated */}
        {user && (
          <>
            <Route
              path="/dashboard"
              element={
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/recipes"
              element={
                <DashboardLayout>
                  <Recipes />
                </DashboardLayout>
              }
            />
            <Route
              path="/recipes/add"
              element={
                <DashboardLayout>
                  <CreateRecipeForm />
                </DashboardLayout>
              }
            />
            <Route
              path="/favorites"
              element={
                <DashboardLayout>
                  <Favorites />
                </DashboardLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              }
            />
          </>
        )}

        {/* If the user is not authenticated and tries to access protected routes */}
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/recipes" element={<Navigate to="/" replace />} />
        <Route path="/recipes/add" element={<Navigate to="/" replace />} />
        <Route path="/favorites" element={<Navigate to="/" replace />} />
        <Route path="/settings" element={<Navigate to="/" replace />} />
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
