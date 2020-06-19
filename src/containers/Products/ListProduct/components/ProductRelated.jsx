import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { formatDate, formatCurrency } from '../../../../components/helpers/commons';
import NotFound from '../../../../components/404';

class ProductRelated extends Component {
  setBgImage = url => ({ backgroundImage: `url(${url})` });

  render() {
    const { listSearchGroupByParams } = this.props.listItem;
    const listProducts = (listSearchGroupByParams && listSearchGroupByParams.data) || [];
    const status = listSearchGroupByParams && listSearchGroupByParams.status;
    const ProductTerkait = () => (
      <div>
        {status === 200 ? (
          <div>
            <div className="mb-5">
              <h2 className="product-header">PRODUK TERKAIT</h2>
            </div>
            <div className="row">
              {listProducts.map((product, i) =>
                i < 4 ? (
                  <div className="col-md-3 text-center" key={i}>
                    <Link
                      to={`/product?brand=${product.brand}&group_model=${
                        product.groupModel
                      }&model=${product.model}&tahun=${formatDate(
                        product.product_year_build,
                        'YYYY'
                      )}`}
                    >
                      <div className="product-box">
                        <span className="product-sticky-label">
                          {product.product_count}
                          {` listing`}
                          <br />
                          {product.bid_count}
                          {` penawar`}
                        </span>
                        <div
                          className="bg-image rounded mb-3"
                          style={this.setBgImage(product.link)}
                        />
                        <h2 className="text-left product-title">
                          {`${product.brandName} ${product.groupModelName} `}
                          <br />
                          {product.modelName}
                          <br />
                          <small>{formatDate(product && product.product_year_build, 'YYYY')}</small>
                        </h2>
                        <p className="text-left">
                          {`Harga Jual Terendah`}
                          <br />
                          <span className="product-price">
                            {formatCurrency(product && product.lowest_price)}
                          </span>
                          <br />
                          {`Harga Tawar Tertinggi`}
                          <br />
                          <span className="product-sell">
                            {formatCurrency(product && product.last_transaction)}
                          </span>
                          <br />
                        </p>
                      </div>
                    </Link>
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
        {this.props.listItem.loading ? (
          <div className="row">
            <div className="col-md-2 col-md-offset-5">
              <Spin />
            </div>
          </div>
        ) : (
          <ProductTerkait />
        )}
      </div>
    );
  }
}

ProductRelated.propTypes = {
  listItem: PropTypes.objectOf(PropTypes.any).isRequired
};

export default ProductRelated;
