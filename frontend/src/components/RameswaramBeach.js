import React from 'react';
const RameswaramBeach = () => {
  return (
    <div className="rameswaram-container">
      <header className="banner2">
  <div className="overlay2">
    <video autoPlay muted loop playsInline className="bg-video">
        <source src="/video/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    <h1>Rameswaram Beach</h1>
    <p>Rameswaram, Tamil Nadu, India</p>
  </div>
</header>

      <section className="section description">
        <h2>Rameswaram Beach – The Sacred Shoreline of Tamil Nadu</h2>
          <p>Rameswaram Beach, situated on the tranquil Pamban Island, is one of Tamil Nadu’s most serene and spiritually significant coastal destinations. Washed by the gentle waves of the Bay of Bengal, the beach is famous for its shallow, crystal-clear waters, soft sands, and peaceful ambiance. For centuries, it has been a sacred bathing site for pilgrims visiting the renowned Ramanathaswamy Temple, where many take a holy dip in the sea before offering prayers.

Beyond its religious significance, Rameswaram Beach offers a breathtaking natural setting with stunning sunrise and sunset views, making it a paradise for photographers and nature lovers. The calm waters are perfect for swimming, while adventure enthusiasts can indulge in activities like windsurfing, kayaking, and snorkeling around the nearby coral reefs. Local fishing boats dot the horizon, adding a rustic charm to the scenery.

The beach also serves as a starting point for exploring nearby attractions such as the historic Pamban Bridge, which connects the island to mainland India, and the ghost town of Dhanushkodi, known for its untouched beauty and haunting history. Visitors can savor freshly caught seafood from local stalls and immerse themselves in the island’s vibrant fishing culture. With its harmonious blend of spirituality, natural beauty, and cultural richness, Rameswaram Beach stands as a destination that touches both the heart and the soul, offering an unforgettable coastal experience in Tamil Nadu.
            </p>
      </section>

      <section className="section activities">
        <h2>Things To Do</h2>
        <div className="activity-grid">
          <div className="activity-card">🤿 Snorkeling </div>
          <div className="activity-card">🪸 Coral watching</div>
          <div className="activity-card">🛶 Kayaking</div>
          <div className="activity-card">🏄‍♂️ Windsurfing</div>
          <div className="activity-card">🏊‍♂️ Swimming</div>
          <div className="activity-card">💧 Agnitheertham Bath</div>
        </div>
      </section>

      <section className="section gallery">
  <h2>Gallery</h2>

  <div className="gallery-grid">
    {[
      { src: "/images/7.jpeg", text: "Pamban Bridge, pride of Tamil Nadu" },
      { src: "/images/8.jpg", text: "Dhanushkodi, the last land of India" },
      { src: "/images/9.jpg", text: "Tranquil waters, timeless coastal beauty" }
    ].map((item, index) => (
      <div className="flip-card" key={index}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={item.src} alt={`Rameswaram Beach ${index + 1}`} />
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
      { src: "/images/10.jpg", text: "Sea breeze bliss at Pamban Beach Park" },
      { src: "/images/11.jpg", text: "Divine blessings at Agnitheertham waters" },
      { src: "/images/12.jpg", text: "Unleashing fun over the waters" }
    ].map((item, index) => (
      <div className="flip-card" key={index}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={item.src} alt={`Rameswaram Beach ${index + 4}`} />
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
      📍Rameswaram Beach ; Ramanathapuram, Tamil Nadu, India · Gulf of Mannar · Serene, spiritual coastal beach
      </footer>
    </div>
  );
};

export default RameswaramBeach;
