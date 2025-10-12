import React from 'react';
const ElliotBeach = () => {
  return (
    <div className="elliot-container">
      <header className="banner3">
  <div className="overlay3">
    <video autoPlay muted loop playsInline className="bg-video">
        <source src="/video/video3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    <h1>Elliot Beach</h1>
    <p>Chennai, Tamil Nadu, India</p>
  </div>
</header>

      <section className="section description">
        <h2>Elliot Beach – Serenity by the Shore</h2>
        <p>
          Elliot’s Beach, fondly known as Bessie, is one of Chennai’s most serene and picturesque coastal escapes. Located in the vibrant Besant Nagar neighborhood, it offers a perfect blend of tranquility and local charm, making it a favorite among families, tourists, and young crowds alike. Unlike the busy Marina Beach, Elliot’s Beach is quieter, with clean golden sands stretching along gentle waves, ideal for morning yoga sessions, leisurely evening strolls, or simply sitting by the shore to watch the sun dip below the horizon. The iconic Karl Schmidt Memorial stands as a poignant tribute to a Dutch sailor who sacrificed his life saving a swimmer, adding historical significance to the scenic beauty. The area around the beach is lively yet relaxed, featuring an array of cafes, street food stalls, and local shops where visitors can savor Chennai’s flavors—from spicy sundal to fresh seafood delights. Cultural and spiritual landmarks nearby, such as the Ashtalakshmi Temple and Velankanni Church, provide additional sightseeing opportunities. With its combination of peaceful coastal vibes, local culinary experiences, and cultural richness, Elliot’s Beach is a destination that captures the essence of Chennai’s coastal lifestyle, offering visitors both relaxation and memorable experiences.
          </p>
      </section>

      <section className="section activities">
        <h2>Things To Do</h2>
        <div className="activity-grid">
          <div className="activity-card">🏛️ Exploring Karl Schmidt Memorial</div>
          <div className="activity-card">🧘‍♂️💪 Yoga & Fitness Sessions</div>
          <div className="activity-card">🏐 Beach Volleyball</div>
          <div className="activity-card">🚴‍♂️ Cycling along the promenade</div>
          <div className="activity-card">⛪🛕 Visiting Ashtalakshmi Temple & Velankanni Church</div>
          <div className="activity-card">🪁 Kite Flying</div>
        </div>
      </section>

      <section className="section gallery">
  <h2>Gallery</h2>

  <div className="gallery-grid">
    {[
      { src: "/images/18.jpg", text: "Adventure rides across blue waters" },
      { src: "/images/14.jpg", text: "Sailing strong through endless blue" },
      { src: "/images/15.jpg", text: "Crispy bites by the shore" }
    ].map((item, index) => (
      <div className="flip-card" key={index}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={item.src} alt={`Elliot Beach ${index + 1}`} />
          </div>
          <div className="flip-card-back">
            <p>{item.text}</p>
          </div>
        </div>
      </div>
    ))}
  </div>

  <br />

  <div className="gallery-grid">
    {[
      { src: "/images/13.jpg", text: "Graceful flight across the horizon" },
      { src: "/images/16.jpg", text: "Ashtalakshmi Temple with  divine spiritual ambiance" },
      { src: "/images/17.jpg", text: "Sacred haven of prayers and miracles at Velankanni Church" }
    ].map((item, index) => (
      <div className="flip-card" key={index}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={item.src} alt={`Elliot Beach ${index + 4}`} />
          </div>
          <div className="flip-card-back">
            <p>{item.text}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


      <footer className="footer">
        📍Elliot’s Beach ; Chennai, Tamil Nadu, India · Bay of Bengal · Calm, clean, less crowded urban beach
        </footer>
    </div>
  );
};

export default ElliotBeach;
