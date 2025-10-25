import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "./logo.png";
import about from "./pic2.jpg";
import backgroundVideo from "./background.mp4";
import { FaMapMarkedAlt } from "react-icons/fa"; // Map icon

function Home() {
  const navigate = useNavigate();

  // ---------- AUTH STATES ----------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
  const [users, setUsers] = useState([]);

  // ---------- SIGNUP STATES ----------
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [usernameError, setUsernameError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const questionSets = [
    [
      "What is your favorite food?",
      "What is your favorite color?",
      "Which is your favorite travel destination?",
    ],
    [
      "Which sport do you enjoy watching the most?",
      "What is your favorite season?",
      "What type of music do you prefer?",
    ],
    [
      "Do you prefer tea or coffee?",
      "What is your favorite hobby?",
      "Which book has had the most impact on you?",
    ],
  ];

  // ---------- FETCH USERS ----------
  useEffect(() => {
    fetch(`${API_BASE}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, [API_BASE]);

  // ---------- VALIDATION ----------
  const validateUsername = (username) =>
    /^(?=.*[!@#$%^&*(),.?":{}|<>])[^\s_]{8,}$/.test(username);
  const validateMobileNumber = (mobileNumber) => /^\d{10}$/.test(mobileNumber);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setUsernameError(
      validateUsername(value)
        ? ""
        : "Username must be at least 8 characters and contain a special character."
    );
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    setMobileNumber(value);
    setMobileNumberError(
      validateMobileNumber(value)
        ? ""
        : "Mobile number must contain exactly 10 digits."
    );
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : "Invalid email address.");
  };

  // ---------- LOGIN ----------
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert("Login successful!");
    setIsLoggedIn(true);
    setIsLoginOpen(false);
    e.target.reset();
  };

  // ---------- LOGOUT ----------
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileDropdown(false);
    alert("Logged out successfully!");
  };

  // ---------- SIGNUP ----------
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!usernameError && !mobileNumberError && !emailError) {
      const randomSetIndex = Math.floor(Math.random() * questionSets.length);
      setQuestions(questionSets[randomSetIndex]);
      setStep(2);
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  const handleFinalSignup = async (finalAnswers) => {
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          mobile: mobileNumber,
          email,
          password,
          answers: finalAnswers,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Sign up failed");
        return;
      }
      setStep(3);
    } catch (err) {
      alert("Could not reach server. Is the backend running?");
    }
  };

  const handleAnswer = () => {
    if (!answer.trim()) {
      alert("Please provide an answer.");
      return;
    }
    const updated = [...answers, answer];
    setAnswers(updated);
    setAnswer("");
    const nextIndex = currentQ + 1;
    if (nextIndex < questions.length) {
      setCurrentQ(nextIndex);
    } else {
      handleFinalSignup(updated);
    }
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    alert("Password reset successful!");
    setOldPassword("");
    setNewPassword("");
    setIsForgotPasswordOpen(false);
  };

  return (
    <div className="home-container">
      {/* === Background Video === */}
      <div className="video-background">
        <video autoPlay loop muted className="video">
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
        <div className="center-title">
          <h2>Proactive Coastal and Tourist Information</h2>
          <h2>Welcome to Coastal Beacon</h2>
          <h2>
            <span style={{ color: "#00bfff" }}>Your Journey, Our Insights</span>
          </h2>
        </div>
      </div>

      {/* === Header === */}
      <header className="header">
  <div className="coastal-beacon-logo">
    <img src={logo} alt="Coastal Beacon Logo" className="logo" />
    <h1 className="logo-text">Coastal Beacon</h1>
  </div>

  <div className="top-right-links">
    <span className="link home">Home</span>

    {!isLoggedIn ? (
      <span className="link login" onClick={() => setIsLoginOpen(true)}>
        Login
      </span>
    ) : (
      <div className="profile-container">
        <span
          className="link profile"
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        >
          👤 Profile
        </span>
        {showProfileDropdown && (
          <div className="dropdown-menu">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    )}

    {!isLoggedIn && (
      <span
        className="link signup"
        onClick={() => {
          setIsSignupOpen(true);
          setStep(1);
          setCurrentQ(0);
          setAnswers([]);
          setAnswer("");
        }}
      >
        Sign Up
      </span>
    )}

    {/* 🆕 Feedback Button */}
    <span
      className="link feedback"
      onClick={() => navigate("/feedback")}
    >
      Feedback
    </span>
  </div>
</header>


      {/* === About Section === */}
      <section className="about-section">
        <div className="about-text">
          <h2>About Our Project</h2>
          <p>
            <strong>Coastal Beacon</strong> provides proactive coastal and tourist
            information. Our mission is to keep travelers safe and informed with
            real-time updates.
          </p>
          <p>
            With innovation and technology, we bring you accurate data about
            weather, safety, and cultural highlights while exploring coastal areas.
          </p>
          <div className="button-group">
            <button className="explore-btn" onClick={() => navigate("/beaches")}>
              Explore Beaches
            </button>
            <button className="insights-btn" onClick={() => navigate("/insights")}>
              View Insights
            </button>
          </div>
        </div>
        <div className="about-image">
          <img src={about} alt="About Coastal Beacon" />
        </div>
      </section>

      {/* === Floating Map Icon === */}
      <div
        className="floating-map-icon"
        onClick={() => navigate("/map")}
        title="View Tamil Nadu Map"
      >
        <FaMapMarkedAlt size={30} />
      </div>

      {/* === Login Modal === */}
      {isLoginOpen && (
        <div className="login-dialog">
          <div className="dialog-content">
            <button
              className="close-button"
              onClick={() => setIsLoginOpen(false)}
            >
              ×
            </button>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <label>Username:</label>
              <input type="text" required />
              <label>Password:</label>
              <input type="password" required />
              <button type="submit">Login</button>
              <div className="dialog-links">
                <a
                  href="#"
                  onClick={() => {
                    setIsSignupOpen(true);
                    setIsLoginOpen(false);
                    setStep(1);
                  }}
                >
                  Create an account
                </a>
                <br />
                <a
                  href="#"
                  onClick={() => {
                    setIsForgotPasswordOpen(true);
                    setIsLoginOpen(false);
                  }}
                >
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* === Signup Modal === */}
      {isSignupOpen && (
        <div className="login-dialog">
          <div className="dialog-content">
            <button
              className="close-button"
              onClick={() => setIsSignupOpen(false)}
            >
              ×
            </button>
            <h2>Sign Up</h2>
            {step === 1 && (
              <form onSubmit={handleSignupSubmit}>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
                {usernameError && (
                  <p className="error-message">{usernameError}</p>
                )}

                <label>Mobile Number:</label>
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  required
                />
                {mobileNumberError && (
                  <p className="error-message">{mobileNumberError}</p>
                )}

                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {emailError && <p className="error-message">{emailError}</p>}

                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button type="submit">Next</button>
              </form>
            )}
            {step === 2 && (
              <div className="question-step">
                <h3>Answer the Questions</h3>
                <p>{questions[currentQ]}</p>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
                <button onClick={handleAnswer}>
                  {currentQ + 1 === questions.length ? "Submit" : "Next"}
                </button>
              </div>
            )}
            {step === 3 && (
              <div className="success-message">
                <h3>🎉 Registered Successfully!</h3>
                <button onClick={() => setIsSignupOpen(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* === Forgot Password Modal === */}
      {isForgotPasswordOpen && (
        <div className="login-dialog">
          <div className="dialog-content">
            <button
              className="close-button"
              onClick={() => setIsForgotPasswordOpen(false)}
            >
              ×
            </button>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetSubmit}>
              <label>Old Password:</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button type="submit">Reset</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
