import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductBrandAction, getProductMerkAction } from '../../actions/productAction';
import { filterByMerk } from '../../actions/filterAction';

class FilterBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandId: ''
    };
  }

  componentDidMount() {
    this.props.getProductBrandAction();
  }

  handleClick = brandId => {
    this.props.filterByMerk(brandId);
    this.setState({ brandId });
    brandId && this.props.getProductMerkAction(brandId);
  };

  render() {
    const res = this.props.ProductReducer;
    const { brandId } = this.state;
    const brands = res.listBrand ? res.listBrand : [];
    return (
      <div>
        <h5 className="product-filter-label mb-3">
          <strong>Merk</strong>
        </h5>
        <ul className="filter">
          {brands.map(brand => (
            <li key={brand.id}>
              <Link
                to={{ pathname: '/search', search: `?brand=${brand.id}` }}
                className={brandId === brand.id ? 'active' : ''}
                onClick={() => this.handleClick(brand.id)}
              >
                {brand.name}
              </Link>
            </li>
          ))}
        </ul>
        <hr />
      </div>
    );
  }
}

FilterBrand.propTypes = {
  getProductBrandAction: PropTypes.func.isRequired,
  getProductMerkAction: PropTypes.func.isRequired,
  filterByMerk: PropTypes.func.isRequired,
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired
};

function mapStateToProps({ ProductReducer }) {
  return { ProductReducer };
}

export default connect(
  mapStateToProps,
  { getProductBrandAction, filterByMerk, getProductMerkAction }
)(withRouter(FilterBrand));
