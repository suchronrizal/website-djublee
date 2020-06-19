import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { getProductByIdAction } from '../../../actions/productAction';
import isEmpty from '../../../components/helpers/isEmptyChecker';
import SliderImages from '../../../components/SliderImages';
import {
  formatDate,
  formatCurrency,
  highestBid,
  formatNumber
} from '../../../components/helpers/commons';

class ViewProductDetailIndi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthImg: '89%',
      heightImg: '400px',
      marginLeft: '40px'
    };
  }

  componentWillMount = () => {
    window.scrollTo(0, 0);
    const prodId = this.props.match.params.id;
    this.setState({ prodId });
    !isEmpty(prodId) && this.props.getProductByIdAction(prodId);
  };

  render() {
    const { widthImg, heightImg, marginLeft, prodId } = this.state;
    const { ProductReducer } = this.props;
    const data = ProductReducer.listById || [];
    const ProductDetail = () => (
      <div className="container">
        <div className="row product-detail-header mb-5">
          <div className="col-md-8 text-center">
            <h2 className="text-left product-title">
              {`${(data.brand && data.brand.name) || ''} ${(data.group_model &&
                data.group_model.name) ||
                ''} - ${(data.model && data.model.name) || ''}`}
              <br />
              <small>{(data && formatDate(data.product_year_build, 'YYYY')) || null}</small>
            </h2>
            <br />
            <SliderImages
              data={data}
              widthImg={widthImg}
              heightImg={heightImg}
              marginLeft={marginLeft}
            />
          </div>
          <div className="col-md-4">
            <dl className="row">
              <dd className="col-sm-7">Warna</dd>
              <dd className="col-sm-5">{data.interior_color && data.interior_color.name}</dd>
              <dd className="col-sm-7">Status</dd>
              <dd className="col-sm-5">{data.product_condition === 1 ? 'Baru' : 'Bekas'}</dd>
              <dd className="col-sm-7">KM</dd>
              <dd className="col-sm-5">{`${formatNumber(data.product_kilometer)} KM`}</dd>
              <dd className="col-sm-7">Lokasi</dd>
              <dd className="col-sm-5">{data.wilayah && data.wilayah.name}</dd>
              <dd className="col-sm-7">Harga Jual</dd>
              <dd className="col-sm-5">
                {data.product_sell_price && formatCurrency(data.product_sell_price)}
              </dd>
              <dd className="col-sm-7">Harga Penawaran Tertinggi</dd>
              <dd className="col-sm-5">{formatCurrency(highestBid(data.bids))}</dd>
            </dl>
            <button className="btn bg-green col-12 txt-bold" type="button">
              {`Djublee Report`}
            </button>
            <div className="row mt-2">
              <div className="col-md-6">
                <Link
                  to={`/beli?id=${prodId}`}
                  className="btn col-12 br-yellow cl-dark-grey txt-bold"
                >
                  {`Beli`}
                </Link>
              </div>
              <div className="col-md-6">
                <Link
                  to={`/tawar?id=${prodId}`}
                  className="btn col-12 bg-yellow cl-dark-green txt-bold"
                >
                  {`Tawar`}
                </Link>
              </div>
            </div>
          </div>
        </div>
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
ViewProductDetailIndi.propTypes = {
  getProductByIdAction: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired
};
function mapStateToProp({ ProductReducer }) {
  return { ProductReducer };
}
export default connect(
  mapStateToProp,
  { getProductByIdAction }
)(withRouter(ViewProductDetailIndi));
