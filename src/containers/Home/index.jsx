import React from 'react';
import HomeBannerSearch from './components/HomeBannerSearch';
import FeatureMitra from './components/HomeFeatureMitra';
import ProductByBid from './components/HomeProductByBid';
import ProductLuxuryCars from './components/HomeProductLuxuryCars';
import ProductSuperCars from './components/HomeProductSuperCars';

const Home = () => (
  <div className="home">
    <HomeBannerSearch />
    <div className="container marketing">
      {/* <!-- MITRA --> */}
      <FeatureMitra />
      <hr className="featurette-divider" />
      {/* <!-- MODEL LISTING BID TERBANYAK --> */}
      <ProductByBid />
      <hr className="featurette-divider" />
      {/* <!-- PRODUK LUXURY CARS --> */}
      <ProductLuxuryCars />
      <hr className="featurette-divider" />
      {/* <!-- PRODUK SUPER CARS --> */}
      <ProductSuperCars />
    </div>
    {/* <!-- /.container --> */}
  </div>
);

export default Home;
