import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { showFilter } from '../actions/filterAction';
import SearchModal from './SearchModal';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTop: true
    };

    this.onScroll = this.onScroll.bind(this);
    this.loggedInMenu = this.loggedInMenu.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 1;
      if (isTop !== this.state.isTop) {
        this.onScroll(isTop);
      }
    });
  }

  onScroll(isTop) {
    this.setState({ isTop });
  }

  showFilter = () => {
    this.props.showFilter(true);
  };

  loggedInMenu = () => {
    const { AuthReducer } = this.props;
    const { isTop } = this.state;
    const changeMenuItemColor = isTop ? 'nav-link cl-dark' : 'nav-link cl-white';
    const changeBtnSearch = isTop ? 'btn bg-green btn-jual' : 'btn bg-yellow btn-jual';
    if (AuthReducer.isSigedIn) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to="/" className={changeMenuItemColor}>
              {'Home'}
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/penjualan" className={changeMenuItemColor}>
              {'Penjualan / Pembelian'}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={this.state.isTop ? 'nav-link cl-dark' : 'nav-link cl-white'}
              to="/profile"
            >
              <i className="far fa-user" />
              {` ${(AuthReducer.userLogin && AuthReducer.userLogin.name) || `Loading...`}`}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jual">
              <button type="button" className={changeBtnSearch}>
                {'Jual'}
              </button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className={changeMenuItemColor}>
              <i className="far fa-bell" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className={changeMenuItemColor} onClick={this.showFilter}>
              <i className="fas fa-search" />
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link to="/" className={changeMenuItemColor}>
            {'Home'}
            <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={this.state.isTop ? 'nav-link cl-dark' : 'nav-link cl-white'} to="/login">
            {'Log In'}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={this.state.isTop ? 'nav-link cl-dark' : 'nav-link cl-white'}
            to="/signup"
          >
            {'Sign Up'}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login">
            <button type="button" className={changeBtnSearch}>
              {'Jual'}
            </button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className={changeMenuItemColor} onClick={this.showFilter}>
            <i className="fas fa-search" />
          </Link>
        </li>
      </ul>
    );
  };

  render() {
    const { isTop } = this.state;
    const changeMenuBGColor = isTop
      ? 'navbar navbar-expand-md navbar-dark fixed-top'
      : 'navbar navbar-expand-md navbar-dark fixed-top navbar-green';
    return (
      <div className="header">
        <header>
          <nav className={changeMenuBGColor}>
            <div className="container">
              <a className="navbar-brand" href="/">
                <img className="header-logo" src="/public/img/logo.png" alt="logo" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <SearchModal />
                {this.loggedInMenu()}
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  showFilter: PropTypes.func.isRequired,
  AuthReducer: PropTypes.objectOf(PropTypes.any).isRequired
};

function mapStateToProps({ AuthReducer, Filter }) {
  return { AuthReducer, Filter };
}

export default connect(
  mapStateToProps,
  { showFilter }
)(withRouter(Header));
