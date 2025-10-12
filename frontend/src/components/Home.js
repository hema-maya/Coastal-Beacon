import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "./logo.png";
import about from "./pic2.jpg";
import backgroundVideo from "./background.mp4";

function Home() {
  const navigate = useNavigate();

  // ---------- AUTH STATES ----------
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login state
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // For dropdown

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
    ["What is your favorite food?", "What is your favorite color?", "Which is your favorite travel destination?"],
    ["Which sport do you enjoy watching the most?", "What is your favorite season?", "What type of music do you prefer?"],
    ["Do you prefer tea or coffee?", "What is your favorite hobby?", "Which book has had the most impact on you?"]
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
        : "Username must be at least 8 characters, no underscores, and contain a special character."
    );
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    setMobileNumber(value);
    setMobileNumberError(
      validateMobileNumber(value) ? "" : "Mobile number must contain exactly 10 digits."
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
    // Here you can validate credentials with backend if needed
    alert("Login successful!");
    setIsLoggedIn(true);       // ✅ change state to logged in
    setIsLoginOpen(false);     // close login modal
    e.target.reset();
  };

  // ---------- LOGOUT ----------
  const handleLogout = () => {
    setIsLoggedIn(false);      // ✅ log out
    setShowProfileDropdown(false);
    alert("Logged out successfully!");
  };

  // ---------- SIGNUP ----------
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!usernameError && !mobileNumberError && !emailError) {
      setUsername("");
      setMobileNumber("");
      setEmail("");
      setPassword("");

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
      {/* Background Video */}
      <div className="video-background">
        <video autoPlay loop muted className="video">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="coastal-beacon-logo">
          <img src={logo} alt="Coastal Beacon Logo" className="logo" />
          <h1 className="logo-text">Coastal Beacon</h1>
        </div>

        <div className="top-right-links">
          <span className="link home">Home</span>

          {/* ✅ Conditional rendering */}
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

          {/* Sign Up button visible only if not logged in */}
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
        </div>
      </header>

      {/* Center Title */}
      <div className="center-title">
        <h2>Proactive Coastal and Tourist Information</h2>
        <h2>Welcome to Coastal Beacon</h2>
        <h2><span style={{ color: 'blue' }}>Your Journey, Our Insights</span></h2>
      </div>

      {/* About Section */}
      <section className="about-section">
        <div className="about-text">
          <h2>About Our Project</h2>
          <p>Coastal Beacon provides proactive coastal and tourist information. Our mission is to keep travelers safe and informed with real-time updates.</p>
          <p>With innovation and technology, we bring you accurate data about weather, safety, and cultural highlights while exploring coastal areas.</p>

          {/* Explore Button */}
          <button
            className="explore-btn"
            onClick={() => navigate("/beaches")}
          >
            Explore
          </button>

          {/* Map View Button */}
          <button
            className="map-view-btn"
            onClick={() => navigate("/map")}
          >
            Map View
          </button>
        </div>
        <div className="about-image">
          <img src={about} alt="About Coastal Beacon" />
        </div>
      </section>

      {/* Users Section */}
      <section className="users-section">
        <h2>Registered Users (from MySQL)</h2>
        <ul>
          {users.map((u) => (
            <li key={u.id}>{u.username} — {u.email}</li>
          ))}
        </ul>
      </section>

      {/* LOGIN Modal */}
      {isLoginOpen && (
        <div className="login-dialog">
          <div className="dialog-content glow-border">
            <button className="close-button" onClick={() => setIsLoginOpen(false)}>X</button>
            <h2>Login Page</h2>
            <form onSubmit={handleLoginSubmit}>
              <label>
                Username:<input type="text" required />
              </label>
              <label>
                Password:<input type="password" required />
              </label>
              <button type="submit">Login</button>
              <div className="dialog-links">
                <a href="#" onClick={() => { setIsSignupOpen(true); setIsLoginOpen(false); setStep(1); }}>Create an account</a>
                <br />
                <a href="#" onClick={() => { setIsForgotPasswordOpen(true); setIsLoginOpen(false); }}>Forgot Password?</a>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SIGNUP Modal */}
      {isSignupOpen && (
        <div className="login-dialog">
          <div className="dialog-content glow-border">
            <button className="close-button" onClick={() => setIsSignupOpen(false)}>X</button>
            <h2>Sign Up</h2>
            {step === 1 && (
              <form onSubmit={handleSignupSubmit}>
                <label>
                  Username:
                  <input type="text" value={username} onChange={handleUsernameChange} required />
                  {usernameError && <p className="error-message">{usernameError}</p>}
                </label>
                <label>
                  Mobile Number:
                  <input type="text" value={mobileNumber} onChange={handleMobileNumberChange} required />
                  {mobileNumberError && <p className="error-message">{mobileNumberError}</p>}
                </label>
                <label>
                  Email:
                  <input type="email" value={email} onChange={handleEmailChange} required />
                  {emailError && <p className="error-message">{emailError}</p>}
                </label>
                <label>
                  Password:
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Submit</button>
              </form>
            )}
            {step === 2 && (
              <div className="question-step">
                <h3>Answer the Questions</h3>
                <p>{questions[currentQ]}</p>
                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
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

      {/* FORGOT PASSWORD Modal */}
      {isForgotPasswordOpen && (
        <div className="login-dialog">
          <div className="dialog-content glow-border">
            <button className="close-button" onClick={() => setIsForgotPasswordOpen(false)}>X</button>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetSubmit}>
              <label>
                Old Password:
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
              </label>
              <label>
                New Password:
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </label>
              <button type="submit">Reset</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
