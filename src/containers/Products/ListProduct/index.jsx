import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductByModel from './components/ProductByModel';
import ProductBySuper from './components/ProductBySuper';
import ProductByLuxury from './components/ProductByLuxury';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPage = () => {
    const pathname = this.props.match.params;
    if (pathname.luxury === 'luxury') {
      return <ProductByLuxury />;
    }
    if (pathname.super === 'super') {
      return <ProductBySuper />;
    }
    if (pathname.listing === 'listing') {
      return <ProductByModel />;
    }
  };

  render() {
    return <div className="container marketing">{this.renderPage()}</div>;
  }
}
Product.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withRouter(Product);
