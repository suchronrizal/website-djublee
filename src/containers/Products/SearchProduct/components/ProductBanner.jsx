import React from 'react';

const Banner = () => (
  <div id="productBanner" className="carousel slide" data-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img className="third-slide" src="/public/img/banner-bg.png" alt="slide" />
        <div className="container">
          <div className="carousel-caption text-center">
            <h1 className="mb-4">Temukan Mobil Impianmu!</h1>
            <p>Djublee menyediakan mobil bekas berkualitas yang sesuai untuk anda</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Banner;
