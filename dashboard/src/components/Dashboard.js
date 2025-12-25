import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

// Dashboard pages
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

  /* ---------- AUTH CHECK ---------- */
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/verify`, {
          withCredentials: true,
        });

        // ✅ accept any truthy auth flag
        if (
          !res.data ||
          res.data.status === false ||
          res.data.authenticated === false
        ) {
          window.location.href = "http://localhost:3000/signup";
          return;
        }

        setLoading(false);
      } catch (error) {
        window.location.href = "http://localhost:3000/signup";
      }
    };

    verifyUser();
  }, []);

  const logout = async () => {
    try {
      await axios.get("http://localhost:3002/logout", {
        withCredentials: true,
      });

      window.location.href = "http://localhost:3000/signup";
    } catch (error) {
      console.error("Logout failed");
    }
  };

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Checking authentication...</h2>
      </div>
    );
  }

  /* ---------- DASHBOARD ---------- */
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
