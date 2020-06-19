import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from '../../components/sidebar';
import { setBgImage, formatCurrency, formatDate } from '../../components/helpers/commons';
import { getMyProfileDataAction } from '../../actions/profileAction';
import { getMyBidAction, getMyBidDetail } from '../../actions/transAction';
import NotFound from '../../components/404';

class MyBid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      isShow: false,
      bgImg: ''
    };

    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
  }

  componentDidMount = () => {
    const token = localStorage.getItem('tokenData');
    this.props.getMyProfileDataAction(token);
    this.props.getMyBidAction(token);
  };

  handleHideModal = () => {
    this.setState({ modalShow: false });
    setTimeout(() => {
      this.setState({ isShow: false });
    }, 500);
  };

  handleShowModal = (id, img) => {
    const token = localStorage.getItem('tokenData');
    this.props.getMyBidDetail(token, id);
    this.setState({ isShow: true, bgImg: img });
    setTimeout(() => {
      this.setState({ modalShow: true });
    }, 100);
  };

  render() {
    const { myUserData } = this.props.ProfileReducer;
    const detail = myUserData || [];
    const { Trans } = this.props;
    const { bgImg } = this.state;
    const ListMyBid = props => (
      <div className="col-md-4 text-center">
        <div className="product-box">
          <a
            href="#modal"
            onClick={() => this.handleShowModal(props.product_id, props.product.model.link)}
          >
            <div className="bg-image rounded mb-3" style={setBgImage(props.product.model.link)} />
            <h2 className="text-left product-title">
              {`${props.product.brand.name} ${props.product.group_model.name}`}
              <br />
              {props.product.model.name}
              <br />
              <small>{formatDate(props.product.product_year_build, 'YYYY')}</small>
            </h2>
            <p className="text-left">
              <span className="product-price">{formatCurrency(props.bid_price)}</span>
              <br />
              <i className="total-bid far fa-user" />
              {props.product.bids.length}
              {`Penawaran`}
            </p>
          </a>
        </div>
      </div>
    );
    return (
      <div className="container marketing">
        <div className="page">
          <div className="row">
            <div className="col-md-3">
              <Sidebar
                activeSidebar="my-bid"
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
                      <strong>My Bid</strong>
                    </h4>
                  </div>
                </div>
                {Trans.loading ? (
                  'Loading...'
                ) : (
                  <div className="row pl-3">
                    {Trans.listMyBid !== undefined &&
                      Trans.listMyBid.map((data, i) => <ListMyBid key={i} {...data} />)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={this.state.modalShow ? 'modal fade show' : 'modal fade'}
          style={{ display: this.state.isShow ? 'block' : 'none' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.handleHideModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-image" style={setBgImage(bgImg)} />
                <ul className="purchase-history">
                  {Trans.listMyBidDetail !== undefined ? (
                    Trans.listMyBidDetail.map((data, i) => (
                      <li key={i}>
                        <span className="avatar" style={setBgImage(bgImg)} />
                        <span className="name">{data.bidder.name}</span>
                        <span className="price">
                          {formatCurrency(data.bid_price)}
                          <br />
                          <small>
                            {`Expired :`}
                            {formatDate(data.bid_expired_date, 'DD-MM-YYYY')}
                          </small>
                        </span>
                        <div className="clearfix" />
                      </li>
                    ))
                  ) : (
                    <NotFound />
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {this.state.modalShow ? <div className="modal-backdrop fade show" /> : ''}
      </div>
    );
  }
}

MyBid.propTypes = {
  getMyProfileDataAction: PropTypes.func.isRequired,
  getMyBidAction: PropTypes.func.isRequired,
  getMyBidDetail: PropTypes.func.isRequired,
  ProfileReducer: PropTypes.objectOf(PropTypes.any).isRequired
};

function mapStateToProps({ ProfileReducer, Trans }) {
  return { ProfileReducer, Trans };
}

export default connect(
  mapStateToProps,
  { getMyProfileDataAction, getMyBidAction, getMyBidDetail }
)(MyBid);
