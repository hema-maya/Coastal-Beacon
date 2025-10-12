import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MarinaBeach from "./components/MarinaBeach";
import KovalamBeach from "./components/KovalamBeach";
import ElliotBeach from "./components/ElliotBeach";
import KanyakumariBeach from "./components/KanyakumariBeach";
import RameswaramBeach from "./components/RameswaramBeach";
import BeachProfiles from "./components/BeachProfiles";
import TamilNaduMap from "./components/TamilNaduMap";  // ✅ import
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Home page */}
      <Route path="/" element={<Home />} />

      {/* Map view page */}
      <Route path="/map" element={<TamilNaduMap />} />   {/* ✅ added */}

      {/* Beach profile pages */}
      <Route path="/beaches" element={<BeachProfiles />} />
      <Route path="/marina" element={<MarinaBeach />} />
      <Route path="/kovalam" element={<KovalamBeach />} />
      <Route path="/elliot" element={<ElliotBeach />} />
      <Route path="/kanyakumari" element={<KanyakumariBeach />} />
      <Route path="/rameswaram" element={<RameswaramBeach />} />
    </Routes>
  );
}

export default App;
