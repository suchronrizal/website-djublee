import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Carousel, Spin } from 'antd';
import { getDetailViewProductByVariousParameter } from '../../../actions/productAction';
import {
  formatDate,
  formatCurrency,
  getParams,
  highestBid
} from '../../../components/helpers/commons';

class ProductDetailViewGroup extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    const params = getParams(window.location.search);
    const brand = params.get('brand');
    const groupModel = params.get('group_model');
    const model = params.get('model');
    const tahunawal = params.get('tahunawal');
    const tahunakhir = params.get('tahunakhir');
    const p = `brand=${brand}&group_model=${groupModel}&model=${model}&tahunawal=${tahunawal}&tahunakhir=${tahunakhir}`;
    this.props.getDetailViewProductByVariousParameter(p);
  }

  render() {
    const { ProductReducer } = this.props;
    const detailGroup = ProductReducer.listDetailViewGroupProduct || [];
    const DetailView = () => (
      <div className="container">
        {detailGroup &&
          detailGroup.map(products => (
            <div
              className="row product-detail-header mb-5"
              key={products.id}
              style={{ borderBottom: '1px solid' }}
            >
              <div className="col-md-8 text-center mb-5">
                <h2 className="text-left product-title">
                  {`${products.brand && products.brand.name} ${products.group_model &&
                    products.group_model.name} - ${products.model && products.model.name}`}
                  <br />
                  <small>{products ? formatDate(products.product_year_build, 'YYYY') : null}</small>
                </h2>
                <div className="star-box text-left">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <br />
                <Carousel className="product-img-carousel">
                  {products.product_images &&
                    products.product_images.map(img => (
                      <div key={img.id} className="img-product">
                        <img
                          src={img.link}
                          alt="imgProduct"
                          style={{
                            width: '100%',
                            height: '500px',
                            display: 'block',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                          }}
                        />
                      </div>
                    ))}
                </Carousel>
              </div>
              <div className="col-md-4">
                <div className="mt-3">
                  <div className="jual-box br-yellow">
                    <span className="jual-text">Penawaran Tertinggi</span>
                    <br />
                    <p className="jual-box-range text-center mb-0">
                      {formatCurrency(highestBid(products.bids))}
                    </p>
                  </div>
                  <Link to={`/tawar/${products.id}`}>
                    <button type="button" className="btn col-12 bg-yellow cl-dark-green txt-bold">
                      {`Tawar Harga`}
                    </button>
                  </Link>
                </div>
                <div className="mt-3">
                  <div className="jual-box br-green">
                    <span className="jual-text">Harga Jual</span>
                    <br />
                    <p className="jual-box-range text-center mb-0">
                      {products ? formatCurrency(products.product_sell_price) : null}
                    </p>
                  </div>
                  <Link to={`/beli?id=${products.id}`}>
                    <button className="btn bg-green col-12 txt-bold" type="button">
                      {`BELI`}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
    return (
      <div className="productDetail">
        {ProductReducer.loading ? (
          <div className="row text-center">
            <div className="col-md-12">
              <Spin tip="Loading..." />
            </div>
          </div>
        ) : (
          <DetailView />
        )}
      </div>
    );
  }
}

ProductDetailViewGroup.propTypes = {
  getDetailViewProductByVariousParameter: PropTypes.func.isRequired,
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired
};

function mapStateToProps({ ProductReducer }) {
  return { ProductReducer };
}

export default connect(
  mapStateToProps,
  { getDetailViewProductByVariousParameter }
)(ProductDetailViewGroup);
