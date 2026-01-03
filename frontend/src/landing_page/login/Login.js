import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [btnHover, setBtnHover] = useState(false);
  const [cardHover, setCardHover] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debug: check what we are sending
    console.log("Login Form Data:", formData);

    // Check for empty fields before sending
    if (!formData.email || !formData.password) {
      alert("Email and password are required");
      return;
    }

    try {
      // 🔹 Hardcoded backend URL for debugging
      const res = await axios.post("http://localhost:3002/login", formData, {
        withCredentials: true,
      });

      console.log("Server Response:", res.data);

      if (res.data.success) {
        localStorage.setItem("username", res.data.username);
        window.location.href = "http://localhost:3001"; // redirect to dashboard
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.card,
          transform: cardHover ? "translateY(-4px)" : "translateY(0)",
        }}
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
      >
        <h2 style={styles.title}>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            style={{
              ...styles.button,
              background: btnHover
                ? "linear-gradient(135deg,#1f2937,#4b5563)"
                : "linear-gradient(135deg,#111827,#374151)",
            }}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            Login
          </button>

          <p style={styles.footer}>
            Don’t have an account?
            <span
              style={styles.link}
              onClick={() =>
                (window.location.href = "http://localhost:3000/signup")
              }
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

/* 🔥 SAME styles as Signup */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#eef2f7,#dbeafe)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    width: "360px",
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "11px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "11px",
    borderRadius: "10px",
    border: "none",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  footer: {
    textAlign: "center",
    marginTop: "18px",
    fontSize: "13px",
    color: "#555",
  },
  link: {
    marginLeft: "5px",
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default Login;
