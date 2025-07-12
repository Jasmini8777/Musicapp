import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "./library";
import Feed from "./feed";
import Trending from "./trending";
import Player from "./player";
import Favorites from "./favorites";
import "./home.css";
import Sidebar from "../components/sidebar";
import Login from "./auth/login";

import { setClientToken } from "../spotify";
import SignOut from "./auth/SignOut";

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token"); // Retrieve from localStorage
    const hash = window.location.hash; // Get hash fragment from URL

    if (!storedToken && hash) {
      // Extract access token from hash
      const params = new URLSearchParams(hash.substring(1)); // Remove '#' and parse parameters
      const _token = params.get("access_token");

      if (_token) {
        window.localStorage.setItem("token", _token); // Store token
        setToken(_token);
        setClientToken(_token); // If needed for API calls
      }

      window.location.hash = ""; // Clear URL hash to avoid security issues
    } else if (storedToken) {
      setToken(storedToken);
      setClientToken(storedToken); // If needed
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/signout" element={<SignOut />} />
        </Routes>
      </div>
    </Router>
  );
}
