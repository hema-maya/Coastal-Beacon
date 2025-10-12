import React from 'react';
const KanyakumariBeach = () => {
  return (
    <div className="kanyakumari-container">
      <header className="banner5">
  <div className="overlay5">
    <video autoPlay muted loop playsInline className="bg-video">
        <source src="/video/video5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    <h1>Kanyakumari Beach</h1>
    <p>Chennai, Tamil Nadu, India</p>
  </div>
</header>

      <section className="section description">
        <h2>Kanyakumari Beach – Dawn of Three Oceans</h2>
        <p>Kanyakumari Beach, often called the Land’s End of India, is one of the most captivating coastal destinations in Tamil Nadu. Situated at the confluence of the Bay of Bengal, Arabian Sea, and Indian Ocean, it offers a rare natural spectacle where three seas meet. Unlike typical sandy beaches, Kanyakumari’s shore is largely rocky with colorful sand patches, making it a dramatic sight as the waves crash against the boulders. The beach is world-famous for its sunrises and sunsets, which are especially breathtaking during the equinox when both can be seen on the same horizon. Just off the coast stand two iconic landmarks — the Vivekananda Rock Memorial, honoring the great saint-philosopher, and the Thiruvalluvar Statue, a towering tribute to the ancient Tamil poet.

Kanyakumari Beach is not just about natural beauty but also holds deep cultural and spiritual significance. Pilgrims visit the nearby Kanyakumari Amman Temple, dedicated to Goddess Kanya Devi, while travelers explore the lively seashore markets selling seashells, handicrafts, and local delicacies. The beach also provides panoramic views of the distant Western Ghats merging into the sea, adding to its charm. With its unique geography, spiritual aura, and blend of history and nature, Kanyakumari Beach stands as a symbol of India’s unity, heritage, and natural wonder. </p>
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
      { src: "/images/1.jpeg", text: "Golden sands at Marina Beach" },
      { src: "/images/2.jpeg", text: "Evening lights along the shore" },
      { src: "/images/3.jpeg", text: "Waves meeting the horizon" }
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
      { src: "/images/4.jpeg", text: "Beach during golden hour" },
      { src: "/images/5.jpeg", text: "Crowds enjoying the shoreline" },
      { src: "/images/6.jpg", text: "Boats resting on the sand" }
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
        </footer>
    </div>
  );
};

export default KanyakumariBeach;
