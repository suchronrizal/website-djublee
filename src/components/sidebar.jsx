import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { logoutAction } from '../actions/authAction';

class Sidebar extends Component {
  doLogout = () => {
    this.props.logoutAction();
    window.location.href = '/';
  };

  render() {
    const { userLogin } = this.props.AuthReducer;
    const { activeSidebar, name, email, image } = this.props;
    return (
      <div className="mb-2 sidebar-dashboard">
        <div className="row">
          <div className="col-md-4 img-container mt-2">
            <img
              alt="img-profile"
              src={image || 'https://via.placeholder.com/150'}
              className="img-profile"
            />
          </div>
          <div className="col-md-8 data-container">
            <p className="username">{name || `Loading...`}</p>
            <p className="useremail">{email || `Loading...`}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 menu-container">
            <ul className="profile-menu">
              <li>
                <Link className={activeSidebar === 'my-profile' ? 'active' : ''} to="/profile">
                  {'My Profile'}
                </Link>
              </li>
              <li>
                <Link
                  className={activeSidebar === 'my-transaction' ? 'active' : ''}
                  to="/my-transaction"
                >
                  {'Riwayat Transaksi'}
                </Link>
              </li>
              <li>
                <Link className={activeSidebar === 'my-bid' ? 'active' : ''} to="/my-bid">
                  {'Riwayat Bid'}
                </Link>
              </li>
              {userLogin.role === 'user' && (
                <li>
                  <Link
                    className={activeSidebar === 'request-mitra' ? 'active' : ''}
                    to="/request-mitra"
                  >
                    {'Request Mitra'}
                  </Link>
                </li>
              )}
              <li>
                <Link to="/" className="active-logout" onClick={this.doLogout}>
                  {'Logout'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
Sidebar.propTypes = {
  activeSidebar: PropTypes.string.isRequired,
  logoutAction: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  AuthReducer: PropTypes.objectOf(PropTypes.any).isRequired
};
function mapStateToProps({ AuthReducer }) {
  return { AuthReducer };
}

export default connect(
  mapStateToProps,
  { logoutAction }
)(withRouter(Sidebar));
