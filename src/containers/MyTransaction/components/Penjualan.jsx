import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMyProductAction } from '../../../actions/transAction';
import { formatCurrency, formatDate } from '../../../components/helpers/commons';

class Penjualan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.getMyProductAction();
  };

  render() {
    const { Trans } = this.props;
    console.log(Trans);
    return (
      <div>
        {Trans.loading ? (
          'Loading...'
        ) : (
          <div className="row">
            {Trans.listMyProduct !== undefined &&
              Trans.listMyProduct.map(product => (
                <div className="col-md-3 text-center mb-3" key={product.id}>
                  <Link to={`/product/detail-product/${product.id}`}>
                    <div className="product-box">
                      {product.product_images &&
                        product.product_images.map(img => (
                          <img
                            src={img.link}
                            className="bg-image rounded mb-3"
                            alt="product-img"
                            onError={e => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/150';
                            }}
                          />
                        ))}
                      <h2 className="text-left product-title">
                        {`${product.brand.name} ${product.group_model.name} `}
                        <br />
                        {product.model.name}
                        <br />
                        <small>{formatDate(product.product_year_build, 'YYYY')}</small>
                      </h2>
                      <p className="text-left">
                        <span className="product-price">
                          {formatCurrency(product.product_sell_price)}
                        </span>
                        <br />
                      </p>

                      <p className="text-left mt-3" style={{ color: '#00967e' }}>
                        <i className="fas fa-user" />
                        {` ${(product && product.count_bid) || 0} Penawaran`}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}
Penjualan.propTypes = {
  getMyProductAction: PropTypes.func.isRequired,
  Trans: PropTypes.objectOf(PropTypes.any).isRequired
};
function mapStateToProps({ Trans }) {
  return { Trans };
}
export default connect(
  mapStateToProps,
  { getMyProductAction }
)(Penjualan);
