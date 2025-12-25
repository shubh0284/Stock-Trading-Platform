import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const username = localStorage.getItem("username") || "User";

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/logout`, {
        withCredentials: true,
      });
      window.location.href = "http://localhost:3000/";
    } catch (error) {
      console.log("Logout failed");
    }
  };

  return (
    <>
      {/* INLINE CSS */}
      <style>{`
        .menu-container {
          padding: 10px;
        }

        .menus ul {
          list-style: none;
          padding: 0;
        }

        .menu {
          padding: 10px;
        }

        .menu.selected {
          font-weight: bold;
        }

        .profile {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 10px;
          margin-top: 10px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          margin-right: 8px;
        }

        .username {
          font-size: 14px;
          font-weight: 500;
        }

        .logout-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .logout-card {
          background: #fff;
          padding: 25px;
          width: 300px;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          text-align: center;
        }

        .logout-card h3 {
          margin-bottom: 8px;
        }

        .logout-card p {
          font-size: 14px;
          color: #555;
        }

        .logout-actions {
          margin-top: 18px;
          display: flex;
          justify-content: space-between;
        }

        .cancel-btn {
          background: #e5e7eb;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
        }

        .logout-btn {
          background: #dc2626;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
        }

        .logout-btn:hover {
          background: #b91c1c;
        }
      `}</style>

      <div className="menu-container">
        <img src="logo.png" style={{ width: "50px" }} alt="logo" />

        <div className="menus">
          <ul>
            <li>
              <Link to="/" onClick={() => handleMenuClick(0)}>
                <p className={selectedMenu === 0 ? "menu selected" : "menu"}>
                  Dashboard
                </p>
              </Link>
            </li>

            <li>
              <Link to="/orders" onClick={() => handleMenuClick(1)}>
                <p className={selectedMenu === 1 ? "menu selected" : "menu"}>
                  Orders
                </p>
              </Link>
            </li>

            <li>
              <Link to="/holdings" onClick={() => handleMenuClick(2)}>
                <p className={selectedMenu === 2 ? "menu selected" : "menu"}>
                  Holdings
                </p>
              </Link>
            </li>

            <li>
              <Link to="/positions" onClick={() => handleMenuClick(3)}>
                <p className={selectedMenu === 3 ? "menu selected" : "menu"}>
                  Positions
                </p>
              </Link>
            </li>

            <li>
              <Link to="/funds" onClick={() => handleMenuClick(4)}>
                <p className={selectedMenu === 4 ? "menu selected" : "menu"}>
                  Funds
                </p>
              </Link>
            </li>

            <li>
              <Link to="/apps" onClick={() => handleMenuClick(5)}>
                <p className={selectedMenu === 5 ? "menu selected" : "menu"}>
                  Apps
                </p>
              </Link>
            </li>
          </ul>

          <hr />

          {/* PROFILE */}
          <div className="profile" onClick={() => setIsLogoutOpen(true)}>
            <div className="avatar">{username.charAt(0).toUpperCase()}</div>
            <p className="username">{username}</p>
          </div>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      {isLogoutOpen && (
        <div className="logout-overlay" onClick={() => setIsLogoutOpen(false)}>
          <div className="logout-card" onClick={(e) => e.stopPropagation()}>
            <h3>Logout</h3>
            <p>Do you really want to logout?</p>

            <div className="logout-actions">
              <button
                className="cancel-btn"
                onClick={() => setIsLogoutOpen(false)}
              >
                Cancel
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
