import React from 'react';
import Banner from './components/ProductBanner';
import FeatureMitra from '../../Home/components/HomeFeatureMitra';
import SearchProduct from './components/ProductSearch';

const Search = () => (
  <div className="all-products">
    <Banner />
    <div className="container marketing">
      <SearchProduct />
      <hr className="featurette-divider" />
      <FeatureMitra />
    </div>
  </div>
);

export default Search;
