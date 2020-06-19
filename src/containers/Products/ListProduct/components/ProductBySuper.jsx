import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Spin } from 'antd';
import { getProductSuperCarsAction } from '../../../../actions/productAction';
import { formatDate, formatCurrency } from '../../../../components/helpers/commons';
import NotFound from '../../../../components/404';

class ProductBySuper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.getProductSuperCarsAction();
    this.setState({
      loading: false
    });
  }

  setBgImage = url => ({ backgroundImage: `url(${url})` });

  render() {
    const { data } = this.props.ProductReducer.listSuperCars.data;
    const { status } = this.props.ProductReducer.listSuperCars.status;
    const produk = status === 200 && data ? data : [];
    const { loading } = this.state;
    const Super = () => (
      <div>
        {status === 200 ? (
          <div>
            <div className="mb-5">
              <div className="row">
                <h2 className="product-header col-md-6">Super</h2>
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
                      <a className="page-link" href="#next" aria-label="Next">
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
              {produk.map((data, i) => (
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
    // console.log(produk);
    return <div className="page">{loading ? <Spin /> : <Super />}</div>;
  }
}

ProductBySuper.propTypes = {
  getProductSuperCarsAction: PropTypes.func.isRequired,
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  getProductSuperCarsAction: () => dispatch(getProductSuperCarsAction())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductBySuper);
