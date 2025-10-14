import React from 'react';
const KovalamBeach = () => {
  return (
    <div className="kovalam-container">
      <header className="banner4">
  <div className="overlay4">
     <video autoPlay muted loop playsInline className="bg-video">
        <source src="/video/video4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    <h1>Kovalam Beach</h1>
    <p>Chennai, Tamil Nadu, India</p>
  </div>
</header>

      <section className="section description">
        <h2>Kovalam Beach – Serenity by the Bay</h2>
        <p>Kovalam Beach, also known locally as Covelong Beach, lies about 40 kilometers south of Chennai along the scenic East Coast Road (ECR). Originally a quiet fishing hamlet, it has gradually transformed into a popular tourist spot while still retaining its village charm. The beach is characterized by its wide stretch of golden sand, swaying palm trees, and gentle sea breeze, making it a refreshing getaway from the busy city life of Chennai.

One of the highlights of Kovalam Beach is its reputation as a surfing hub. With consistent waves and surf schools like the Covelong Point Surf School, it attracts both amateurs and professional surfers. Every year, the Covelong Point Surf, Music & Yoga Festival brings together athletes, artists, and travelers from across the globe, adding to its cultural vibrancy. Apart from surfing, visitors can indulge in kayaking, windsurfing, catamaran rides, and swimming, making it a haven for adventure seekers.

The beach also has a strong cultural and historical significance. Kovalam once housed a Dutch fort, remnants of which still exist, and the nearby fishing village offers visitors a glimpse into the traditional lifestyle of local communities. Freshly caught seafood delicacies are a major attraction, with small eateries and stalls serving authentic Tamil coastal flavors.

Sunsets at Kovalam are particularly enchanting, with the horizon blending shades of orange and gold, making it a favorite spot for photographers and travelers alike. Its calm yet lively atmosphere, combined with natural beauty, cultural heritage, and adventure opportunities, makes Kovalam Beach one of the most distinctive and must-visit beaches near Chennai.</p>
      </section>

      <section className="section activities">
        <h2>Things To Do</h2>
        <div className="activity-grid">
          <div className="activity-card">🚤 Speed Boat Tours</div>
          <div className="activity-card">🤿 Snorkeling</div>
          <div className="activity-card">🗼 Vizhinjam Lighthouse</div>
          <div className="activity-card">🪂 Parasailing</div>
          <div className="activity-card">🐠 Sagarika Marine Research Aquarium</div>
          <div className="activity-card">🌊 Backwaters</div>
        </div>
      </section>

      <section className="section gallery">
  <h2>Gallery</h2>

  <div className="gallery-grid">
    {[
      { src: "/images/19.jpg", text: "Waves curling over sparkling sandy stretch" },
      { src: "/images/20.jpg", text: "Scattered boulders guarding the golden shore" },
      { src: "/images/21.jpg", text: "Ancient Dutch fort overlooking serene waves" }
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
      { src: "/images/22.jpg", text: "Adventurous boy conquering sea tides" },
      { src: "/images/23.jpg", text: "Thatched huts beneath a painted sky" },
      { src: "/images/24.jpg", text: "Fishing boats resting under tall palms" }
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
        📍 Kovalam Beach ; Chennai, Tamil Nadu, India · Bay of Bengal · Scenic fishing hamlet turned tourist spot · Famous for surfing & adventure sports
        </footer>
    </div>
  );
};

export default KovalamBeach;
