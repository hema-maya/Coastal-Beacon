import React from 'react';


const MarinaBeach = () => {
  return (
    <div className="marina-container">
      
      <header className="banner1">
  <div className="overlay1">
    <video autoPlay muted loop playsInline className="bg-video">
        <source src="/video/video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1>Marina Beach</h1>
            <p>Chennai, Tamilnadu</p>
  </div>
</header>

      <section className="section description">
        <h2>Marina Beach – The Jewel of Chennai</h2>
        <p>Marina Beach stretches along the eastern coastline of Chennai, embracing the vast Bay of Bengal with waves that tell stories of centuries gone by. Spanning nearly 13 kilometers, it stands as the second-longest urban beach in the world, drawing visitors from every corner of India and beyond.

Its golden sands glisten under the tropical sun, and the rhythmic sound of crashing waves blends with the distant calls of seabirds. Early mornings here are tranquil, with cool breezes carrying the scent of saltwater, while evenings transform the shore into a lively canvas of colors and voices.

Marina Beach is deeply entwined with Tamil culture and history. Along its promenade stand statues of poets, freedom fighters, and historical figures, serving as reminders of the state’s proud heritage. The stretch has witnessed countless political speeches, cultural gatherings, and moments that shaped the social fabric of Tamil Nadu.

The sea here can be both mesmerizing and fierce — its power reflected in the strong currents that constantly reshape the shore. Yet, it remains a place of peace for morning walkers, photographers, and those who seek to watch the sunrise turn the horizon into a spectacle of gold and crimson.

Marina Beach is not just a geographical landmark; it's an emotion — a symbol of Chennai's resilience, beauty, and soul.
          </p>
      </section>

      <section className="section activities">
        <h2>Things To Do</h2>
        <div className="activity-grid">
          <div className="activity-card">🌅 Sunrise and Sunset Views</div>
          <div className="activity-card">🎠 Horse and Camel Rides</div>
          <div className="activity-card">🗼 Lighthouse</div>
          <div className="activity-card">🏛 Memorials</div>
          <div className="activity-card">✒ Statue of Poet Subramania Bharati</div>
          <div className="activity-card">🪁 Evening Kite Flying</div>
        </div>
      </section>

      <section className="section gallery">
  <h2>Gallery</h2>

  <div className="gallery-grid">
    {[
      { src: "/images/1.jpeg", text: "Golden sands, endless serenity at Marina Beach" },
      { src: "/images/2.jpeg", text: "Shoreline strolls under the lighthouse light" },
      { src: "/images/3.jpeg", text: "Lights, laughter, and seaside vibes—Marina Beach at night!" }
    ].map((item, index) => (
      <div className="flip-card" key={index}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={item.src} alt={`Marina Beach ${index + 1}`} />
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
      { src: "/images/4.jpeg", text: "Giggles and thrills on Marina Beach rides!" },
      { src: "/images/5.jpeg", text: "Walk, relax, and soak in Marina’s coastal charm" },
      { src: "/images/6.jpg", text: "Waves dance around Marina’s timeless rocks" }
    ].map((item, index) => (
      <div className="flip-card" key={index}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={item.src} alt={`Marina Beach ${index + 4}`} />
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
      📍Marina Beach ; Chennai, Tamil Nadu, India · Coromandel, Bay of Bengal · Urban, natural sandy beach
      </footer>
    </div>
  );
};

export default MarinaBeach;
