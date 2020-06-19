import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Spin } from 'antd';
import PropTypes from 'prop-types';
import {
  getViewProductByVariousParameter,
  getProductSearchGroupByParamsAction
} from '../../../actions/productAction';
import ProductRelated from '../ListProduct/components/ProductRelated';
import { formatDate, formatCurrency, getParams } from '../../../components/helpers/commons';
import NotFound from '../../../components/404';

class ProductViewGroup extends React.Component {
  componentDidMount = () => {
    window.scrollTo(0, 0);
    const params = getParams(window.location.search);
    const brand = params.get('brand');
    const groupModel = params.get('group_model');
    const model = params.get('model');
    const tahun = params.get('tahun');
    const paramByVarious = `hargaawal&hargaakhir=&kiloawal=&kiloakhir=&tahun=${tahun}&brand=${brand}&group_model=${groupModel}&model=${model}`;
    const paramByGroup = `brand=${brand}&group_model=${groupModel}&model=${model}`;
    this.props.getViewProductByVariousParameter(paramByVarious);
    this.props.getProductSearchGroupByParamsAction(paramByGroup);
  };

  render() {
    const { ProductReducer } = this.props;
    const detail =
      (ProductReducer.listViewProductByVariousParam &&
        ProductReducer.listViewProductByVariousParam.data) ||
      null;
    const ProductDetail = () => (
      <div>
        {detail !== null ? (
          <div className="container">
            <div className="row product-detail-header mb-5">
              <div className="col-md-8 text-center">
                <h2 className="text-left product-title">
                  {`${detail ? detail.brandName : null} ${
                    detail ? detail.groupModelName : null
                  } - ${detail ? detail.modelName : null}`}
                  <br />
                  <small>
                    {detail && detail.product_year_build
                      ? formatDate(detail.product_year_build, 'YYYY')
                      : null}
                  </small>
                </h2>
                <div className="star-box text-left">
                  <div>
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                </div>
                <br />
                <Carousel className="product-img-carousel">
                  {detail ? (
                    <div>
                      <img src={detail.link} className="img-product" alt="" />
                    </div>
                  ) : null}
                </Carousel>
              </div>
              <div className="col-md-4">
                <div className="mt-3">
                  <div className="jual-box br-dark">
                    <span className="jual-text">Transaksi Terakhir</span>
                    <span className="jual-listing">
                      {detail ? formatDate(detail.last_transaction_date, 'DD-MM-YYYY') : '-'}
                    </span>
                    <br />
                    <p className="jual-box-range text-center mb-0 cl-green">
                      {detail ? formatCurrency(detail.last_transaction) : null}
                    </p>
                  </div>
                  <button type="button" className="btn col-12 bg-dark txt-bold">
                    {`LIHAT DATA TRANSAKSI`}
                  </button>
                </div>
                <div className="mt-3">
                  <div className="jual-box br-yellow">
                    <span className="jual-text">Harga Jual</span>
                    <span className="jual-listing">
                      <Link
                        className="cl-soft-blue"
                        to={`/listing?tahunawal=${formatDate(
                          detail && detail.product_year_build,
                          'YYYY'
                        )}&tahunakhir=${formatDate(
                          detail && detail.product_year_build,
                          'YYYY'
                        )}&model=${detail && detail.model}&brand=${detail &&
                          detail.brand}&group_model=${detail && detail.groupModel}`}
                      >
                        {`Lihat Listing`}
                      </Link>
                    </span>
                    <br />
                    <p className="jual-box-range text-center mb-0">
                      {`${(detail && formatCurrency(detail.lowest_price)) || 'Loading...'} -
                      ${(detail && formatCurrency(detail.highest_price)) || 'Loading...'}`}
                    </p>
                  </div>
                  <Link to="/jual">
                    <button type="button" className="btn col-12 bg-yellow cl-dark-green txt-bold">
                      {`JUAL MOBIL ANDA`}
                    </button>
                  </Link>
                </div>
                <div className="mt-3">
                  <div className="jual-box br-green">
                    <span className="jual-text">Harga Penawaran</span>
                    <span className="jual-listing">
                      <Link
                        className="cl-soft-blue"
                        to={`/listing-penawaran?tahunawal=${formatDate(
                          detail && detail.product_year_build,
                          'YYYY'
                        )}&tahunakhir=${formatDate(
                          detail && detail.product_year_build,
                          'YYYY'
                        )}&model=${detail && detail.model}&brand=${detail &&
                          detail.brand}&group_model=${detail && detail.groupModel}`}
                      >
                        {`Lihat Listing`}
                      </Link>
                    </span>
                    <br />
                    <p className="jual-box-range text-center mb-0">
                      {detail.loading}
                      {`${formatCurrency(detail.highest_bid)} - ${formatCurrency(
                        detail.lowest_bid
                      )}`}
                    </p>
                  </div>
                  <Link
                    to={`/product/groupdetail?tahunawal=${formatDate(
                      detail && detail.product_year_build,
                      'YYYY'
                    )}&tahunakhir=${formatDate(
                      detail && detail.product_year_build,
                      'YYYY'
                    )}&brand=${detail && detail.brand}&model=${detail &&
                      detail.model}&group_model=${detail && detail.groupModel}`}
                  >
                    <button className="btn bg-green col-12 txt-bold" type="button">
                      {`BELI atau TAWAR`}
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <ProductRelated listItem={ProductReducer} />

            <div className="mt-5">
              <h2 className="product-header">ULASAN PRODUK ( 3 )</h2>
            </div>
            <hr className="detail-product-line cl-hr-grey" />
            <div className="row mt-2">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-xs-2 col-sm-1">
                    <img
                      className="rounded mb-3 img-fluid"
                      src="/public/img/car-1.png"
                      alt="Generic placeholder"
                    />
                  </div>
                  <div className="col-xs-10 col-sm-11">
                    <span className="text-left user-name">Vanny Olvia </span>
                    <span className="text-left user-date">8 Nov 2018 </span>
                    <br />
                    <div className="star-box text-left">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star empty" />
                    </div>
                    <p className="mt-3">Mobilnya bagus</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-2 col-sm-1">
                    <img
                      className="rounded mb-3 img-fluid"
                      src="/public/img/car-1.png"
                      alt="Generic placeholder"
                    />
                  </div>
                  <div className="col-xs-10 col-sm-11">
                    <span className="text-left user-name">Ivan Satya </span>
                    <span className="text-left user-date">10 Okt 2018 </span>
                    <br />
                    <div className="star-box text-left">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star empty" />
                    </div>
                    <p className="mt-3">Sipppp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NotFound />
        )}
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
          <ProductDetail />
        )}
      </div>
    );
  }
}

ProductViewGroup.propTypes = {
  getViewProductByVariousParameter: PropTypes.func.isRequired,
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired,
  getProductSearchGroupByParamsAction: PropTypes.func.isRequired
};

function mapStateToProps({ ProductReducer, ProfileReducer }) {
  return { ProductReducer, ProfileReducer };
}

export default connect(
  mapStateToProps,
  { getViewProductByVariousParameter, getProductSearchGroupByParamsAction }
)(ProductViewGroup);
