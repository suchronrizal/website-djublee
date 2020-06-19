import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import { getProductLuxuryCarsAction } from '../../../../actions/productAction';
import { formatDate, formatCurrency } from '../../../../components/helpers/commons';
import NotFound from '../../../../components/404';

class ProductByLuxury extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.getProductLuxuryCarsAction();
    this.setState({
      loading: false
    });
  }

  setBgImage = url => ({ backgroundImage: `url(${url})` });

  render() {
    const response = this.props.ProductReducer.listLuxuryCars.data;
    const { status } = this.props.ProductReducer.listLuxuryCars.status;
    const data = status === '200' && response ? response : [];
    const { loading } = this.state;
    const Luxury = () => (
      <div>
        {status === 200 ? (
          <div>
            <div className="mb-5">
              <div className="row">
                <h2 className="product-header col-md-6">Luxury</h2>
                <nav aria-label="Page navigation" className="col-md-6">
                  <ul className="pagination" style={{ float: 'right' }}>
                    <li className="page-item">
                      <a className="page-link" href="#previous" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#1">
                        {`1`}
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#2">
                        {`2`}
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#3">
                        {`3`}
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#4" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <hr />
            </div>
            <div className="row">
              {data.map((data, i) => (
                <div className="col-md-3 text-center mb-3" key={i}>
                  <div className="product-box">
                    <Link
                      to={`/product?brand=${data.brand}&group_model=${data.groupModel}&model=${
                        data.model
                      }&tahun=${formatDate(data.product_year_build, 'YYYY')}`}
                    >
                      <div className="bg-image rounded mb-3" style={this.setBgImage(data.link)} />
                      <h2 className="text-left product-title">
                        {`${data.brandName} ${data.groupModelName} ${data.modelName}`}
                        <br />
                        <small>{formatDate(data.product_year_build, 'YYYY')}</small>
                      </h2>
                      <p className="text-left" style={{ marginBottom: '3px' }}>
                        <span className="product-info">
                          <span className="product-label">Harga Jual</span>
                          <span className="product-price">{formatCurrency(data.lowest_price)}</span>
                        </span>
                      </p>
                      <p className="text-left">
                        <span className="product-info">
                          <span className="product-label">Transaksi Terakhir</span>
                          <span className="product-price">
                            {formatCurrency(data.last_transaction)}
                          </span>
                        </span>
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    );
    return <div className="page">{loading ? <Spin /> : <Luxury />}</div>;
  }
}
ProductByLuxury.propTypes = {
  getProductLuxuryCarsAction: PropTypes.func.isRequired,
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired
};
function mapStateToProps({ ProductReducer }) {
  return { ProductReducer };
}

export default connect(
  mapStateToProps,
  { getProductLuxuryCarsAction }
)(ProductByLuxury);
