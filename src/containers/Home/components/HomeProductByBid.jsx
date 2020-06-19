import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { getProductByBidCountAction } from '../../../actions/productAction';
import { formatDate, formatCurrency, setBgImage } from '../../../components/helpers/commons';
import NotFound from '../../../components/404';

class ProductNewest extends React.Component {
  componentDidMount() {
    this.props.getProductByBidCountAction();
  }

  render() {
    const { listByBidCount, loading } = this.props.ProductReducer;
    const status = listByBidCount ? listByBidCount.status : null;
    const data = status === 200 && listByBidCount ? listByBidCount.data : [];
    const Listting = () => (
      <div>
        {status === 200 ? (
          <div>
            <div className="mb-5">
              <h2 className="product-header">
                {`LISTING TERBANYAK`}
                <Link to="/products/listing">See All</Link>
              </h2>
            </div>
            <div className="row">
              {data.map((product, i) =>
                i < 4 ? (
                  <div className="col-md-3 text-center" key={product.id}>
                    <div className="product-box">
                      <Link
                        to={`/product?brand=${product.brand}&group_model=${
                          product.groupModel
                        }&model=${product.model}&tahun=${formatDate(
                          product.product_year_build,
                          'YYYY'
                        )}`}
                      >
                        <span className="product-sticky-label">
                          {product.product_count}
                          {` listing`}
                          <br />
                          {product.bid_count}
                          {` penawar`}
                        </span>
                        <div className="bg-image rounded mb-3" style={setBgImage(product.link)} />
                        <h2 className="text-left product-title">
                          {`${product.brandName} ${product.groupModelName}`}
                          <br />
                          {product.modelName}
                          <br />
                          <small>{formatDate(product.product_year_build, 'YYYY')}</small>
                        </h2>
                        <p className="text-left">
                          {`Harga Jual Terendah`}
                          <br />
                          <span className="product-price">
                            {formatCurrency(product && product.lowest_price)}
                          </span>
                          <br />
                          {`Transaksi Terakhir`}
                          <br />
                          <span className="product-sell">
                            {formatCurrency(product.last_transaction)}
                          </span>
                          <br />
                        </p>
                      </Link>
                    </div>
                  </div>
                ) : (
                  ''
                )
              )}
            </div>
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    );
    return (
      <div>
        {loading ? (
          <div className="row text-center">
            <div className="col-md-12">
              <Spin tip="Loading..." />
            </div>
          </div>
        ) : (
          <Listting />
        )}
      </div>
    );
  }
}

ProductNewest.propTypes = {
  getProductByBidCountAction: PropTypes.func.isRequired,
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getProductByBidCountAction: () => dispatch(getProductByBidCountAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductNewest);
