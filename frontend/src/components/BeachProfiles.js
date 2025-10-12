import React from 'react';
import { useNavigate } from 'react-router-dom';

function BeachProfiles() {
  const navigate = useNavigate();

  return (
       <div className="beach-container">
      {/* Heading over video */}
      <h1 className="page-title">Beach Profiles</h1>

      {/* Background Video */}
      <video autoPlay muted loop playsInline className="background-video">
        <source src="/video/1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Cards */}
      <div className="beach-card marina" onClick={() => navigate('/marina')}>
        <h2>Marina Beach</h2>
      </div>
      <div className="beach-card kovalam" onClick={() => navigate('/kovalam')}>
        <h2>Kovalam Beach</h2>
      </div>
      <div className="beach-card elliot" onClick={() => navigate('/elliot')}>
        <h2>Elliot’s Beach</h2>
      </div>
      <div className="beach-card kanyakumari" onClick={() => navigate('/kanyakumari')}>
        <h2>Kanyakumari Beach</h2>
      </div>
      <div className="beach-card rameswaram" onClick={() => navigate('/rameswaram')}>
        <h2>Rameswaram Beach</h2>
      </div>
    </div>
  );
}

export default BeachProfiles;
