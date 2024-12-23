import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./App.css";
import Nav from "./components/nav/Nav.jsx";
import Home from "./pages/homepage/Homepage.jsx";
import Subjects from "./pages/subjects/Subjects.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Challenge from "./pages/challenge/Challenge.jsx";
import LoginSignup from "./pages/auth/Auth.jsx";
import CodeEditorPage from "./pages/code-editor/CodeEditor.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

    // Generate placeholder data for 3 weeks (active vs. inactive)
    const generateStreakData = () => {
        return Array(21).fill(0).map(() => Math.random() < 0.5);
    };

    const streakData = generateStreakData();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("isLoggedIn");
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignup = (userData) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", userData.username);
    localStorage.setItem("userid", userData._id);
    navigate("/profile");
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    console.log(userData);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", userData.username);
    localStorage.setItem("userid", userData._id);
    console.log(userData._id);
    navigate("/profile");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    navigate("/");
  };

  return (
    <>
      <Nav isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              username={localStorage.getItem("username")}
              streakData={streakData}
            />
          }
        />
        <Route path="/subjects" element={<Subjects />} />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Profile
                onLogout={handleLogout}
                username={localStorage.getItem("username")}
                streakData={streakData}
                userid={localStorage.getItem("userid")}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/challenge" element={<Challenge />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/profile" replace />
            ) : (
              <LoginSignup onLogin={handleLogin} onSignup={handleSignup} />
            )
          }
        />
        <Route 
          path="/signup" 
          element={
            isLoggedIn ? (
              <Navigate to="/profile" replace />
            ) : (
              <LoginSignup onLogin={handleLogin} onSignup={handleSignup} />
            )
          } 
        />
        <Route 
          path="/editor/:challengeId" 
          element={<CodeEditorPage isLoggedIn={isLoggedIn} username={localStorage.getItem("username")} userid={localStorage.getItem("userid")} />} 
        />
      </Routes>
    </>
  );
}

export default App;
