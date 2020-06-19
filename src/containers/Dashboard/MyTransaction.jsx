import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import Sidebar from '../../components/sidebar';
import { setBgImage, formatCurrency, formatDate } from '../../components/helpers/commons';
import { getMyProfileDataAction } from '../../actions/profileAction';
import { getMyTransAction } from '../../actions/transAction';
import NotFound from '../../components/404';

class MyTransaksi extends React.Component {
  componentDidMount = () => {
    const token = localStorage.getItem('tokenData');
    this.props.getMyProfileDataAction(token);
    this.props.getMyTransAction(token);
  };

  render() {
    const { myUserData } = this.props.ProfileReducer;
    const detail = myUserData || [];
    const { listMyTransaction } = this.props.Trans;
    return (
      <div className="container marketing">
        <div className="page">
          <div className="row">
            <div className="col-md-3">
              <Sidebar
                activeSidebar="my-transaction"
                name={detail.name}
                email={detail.email}
                image={detail.link}
              />
            </div>
            <div className="col-md-9">
              <div className="row mb-4">
                <div className="profile-label col-12">
                  <div className="form-group">
                    <h4>
                      <strong>Riwayat Transaksi</strong>
                    </h4>
                  </div>
                </div>
                {listMyTransaction !== undefined ? (
                  listMyTransaction.map((data, i) => (
                    <div className="col-md-4 text-center" key={i}>
                      <div className="product-box">
                        <div
                          className="bg-image rounded mb-3"
                          style={setBgImage(data.product.model.link)}
                        />
                        <h2 className="text-left product-title">
                          {`${data.product.brand.name} ${data.product.group_model.name}`}
                          <br />
                          {data.product.model.name}
                          <br />
                          <small>{formatDate(data.product.product_year_build, 'YYYY')}</small>
                        </h2>
                        <p className="text-left">
                          <span className="product-price">
                            {(data.bid_price && formatCurrency(data.bid_price)) || `Rp. -`}
                          </span>
                          <br />
                          {`Kode Transaksi:`}
                          <br />
                          {data.transaction_invoice}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <Spin tip="Loading..." />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
MyTransaksi.propTypes = {
  getMyProfileDataAction: PropTypes.func.isRequired,
  getMyTransAction: PropTypes.func.isRequired,
  ProfileReducer: PropTypes.objectOf(PropTypes.any).isRequired,
  Trans: PropTypes.objectOf(PropTypes.any).isRequired
};

function mapStateToProps({ Trans, ProfileReducer }) {
  return { Trans, ProfileReducer };
}

export default connect(
  mapStateToProps,
  { getMyProfileDataAction, getMyTransAction }
)(MyTransaksi);
