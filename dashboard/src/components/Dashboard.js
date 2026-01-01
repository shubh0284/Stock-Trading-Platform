import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

// Pages
import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";

// Context
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // 1. Ensure the URL is explicitly correct for Docker networking
        // If process.env.REACT_APP_API_URL is undefined, it defaults to localhost:3002
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";

        const res = await axios.get(`${apiUrl}/verify`, {
          withCredentials: true, // ⚠️ CRITICAL: Sends the 'token' cookie to the backend
        });

        // 2. Check if the backend verification was successful
        if (res.data && res.data.status === true) {
          setLoading(false);
        } else {
          // If status is false, clear any stale local data and redirect
          localStorage.removeItem("username");
          window.location.href = "http://localhost:3000/login";
        }
      } catch (err) {
        console.error("Dashboard Verification Error:", err);
        // On error (401, 500, or network fail), redirect to login/signup
        localStorage.removeItem("username");
        window.location.href = "http://localhost:3000/login";
      }
    };

    verifyUser();
  }, [navigate]);

  // 3. Loading State (Prevents the dashboard content from flashing before check is done)
  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          fontFamily: "sans-serif",
          color: "#666",
        }}
      >
        <h2>Authenticating...</h2>
        <p>Please wait while we verify your session.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
        <div className="content">
          <Routes>
            <Route path="/" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
          </Routes>
        </div>
      </GeneralContextProvider>
    </div>
  );
};

export default Dashboard;
