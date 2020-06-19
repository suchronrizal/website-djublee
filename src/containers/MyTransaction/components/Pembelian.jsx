import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMyBuyAndBidder } from '../../../actions/transAction';
import { formatCurrency, formatDate } from '../../../components/helpers/commons';

class Pembelian extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.getMyBuyAndBidder();
  };

  render() {
    const { Trans } = this.props;
    return (
      <div>
        {Trans.loading ? (
          'Loading...'
        ) : (
          <div className="row">
            {Trans.listMyBuyAndBidder !== undefined &&
              Trans.listMyBuyAndBidder.map(product => (
                <div className="col-md-3 text-center" key={product.id}>
                  <Link to={`/product/detail-product/${product.id}`}>
                    <div className="product-box">
                      <img
                        src={product.product.model.link}
                        className="bg-image rounded mb-3"
                        alt="product-img"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150';
                        }}
                      />
                      <h2 className="text-left product-title">
                        {`${product.product.brand.name} ${product.product.group_model.name} `}
                        <br />
                        {product.product.model.name}
                        <br />
                        <small>{formatDate(product.product.product_year_build, 'YYYY')}</small>
                      </h2>
                      <p className="text-left">
                        <span className="product-price">
                          {formatCurrency(product.product && product.product.product_sell_price)}
                        </span>
                        <br />
                      </p>
                      <p className="text-left mt-3" style={{ color: '#00967e', cursor: 'pointer' }}>
                        <i className="fas fa-user" />
                        {` ${(product.product && product.product.count_bid) || 0} Penawaran`}
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

Pembelian.propTypes = {
  getMyBuyAndBidder: PropTypes.func.isRequired,
  Trans: PropTypes.objectOf(PropTypes.any).isRequired
};
function mapStateToProps({ Trans }) {
  return { Trans };
}
export default connect(
  mapStateToProps,
  { getMyBuyAndBidder }
)(Pembelian);
