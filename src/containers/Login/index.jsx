import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { swal } from 'react-redux-sweetalert';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { loginAction, registerAction, loginRegisterFBAction } from '../../actions/authAction';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'login-tab',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confPassword: ''
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    if (window.location.href.indexOf('signup') > -1) {
      this.setState({
        activeTab: 'signup-tab'
      });
    }
    if (this.props.AuthReducer.isSigedIn) {
      window.location.href = '/profile';
    }
  }

  componentDidUpdate() {
    this.props.AuthReducer.isSigedIn && this.props.history.push('/profile');
  }

  loginAction = e => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginAction(data);
  };

  registerAction = e => {
    e.preventDefault();
    if (this.state.password !== this.state.confPassword) {
      this.props.swal({
        title: 'Confirmation password not match!',
        type: 'danger',
        timer: 3000,
        showConfirmButton: false
      });
      return;
    }
    const data = {
      name: `${this.state.firstName} ${this.state.lastName}`,
      phone: this.state.phone,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerAction(data);
  };

  handleChangeFName = e => {
    this.setState({
      firstName: e.target.value
    });
  };

  handleChangeLName = e => {
    this.setState({
      lastName: e.target.value
    });
  };

  handleChangePhone = e => {
    this.setState({
      phone: e.target.value
    });
  };

  handleChangeEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleChangeConfPassword = e => {
    this.setState({
      confPassword: e.target.value
    });
  };

  responseFacebook = response => {
    console.log(response);
  };

  changeTab = (e, tabName) => {
    e.preventDefault();
    if (tabName === 'signup') this.props.history.push(`/signup`);
    else this.props.history.push(`/login`);
  };

  render() {
    const { activeTab } = this.state;
    return (
      <div className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3" id="loginLogoutBox">
              <ul className="nav nav-tabs" id="loginlogoutTab" role="tablist">
                <li className="nav-item">
                  <a
                    onClick={e => this.changeTab(e, 'login')}
                    className={activeTab === 'login-tab' ? 'nav-link active' : 'nav-link'}
                    id="login-tab"
                    data-toggle="tab"
                    href="#login"
                    role="tab"
                    aria-controls="login"
                    aria-selected="true"
                  >
                    {`Login`}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={e => this.changeTab(e, 'signup')}
                    className={activeTab === 'signup-tab' ? 'nav-link active' : 'nav-link'}
                    id="signup-tab"
                    data-toggle="tab"
                    href="#signup"
                    role="tab"
                    aria-controls="signup"
                    aria-selected="false"
                  >
                    {`Sign Up`}
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myLoginLogoutContent">
                <div
                  className={
                    activeTab === 'login-tab' ? 'tab-pane fade show active' : 'tab-pane fade'
                  }
                  id="login"
                  role="tabpanel"
                  aria-labelledby="login-tab"
                >
                  <h3>Selamat Datang Kembali!</h3>
                  <FacebookLogin
                    appId="1616087575169529"
                    autoLoad={false}
                    fields="name,email,picture"
                    cssClass="btn bg-facebook col-12"
                    icon="fab fa-facebook-f"
                    textButton=" Lanjutkan Dengan Facebook"
                    callback={this.responseFacebook}
                  />
                  <div className="line-center-box">
                    <span className="line-text">atau</span>
                    <hr className="line" />
                  </div>
                  <form
                    onSubmit={this.loginAction}
                    className="form-horizontal text-left"
                    method="post"
                    action="#"
                  >
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={this.handleChangeEmail}
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        onChange={this.handleChangePassword}
                        placeholder="Password"
                      />
                      <span className="help-block">
                        <Link to="/lupa-password">Lupa Password?</Link>
                      </span>
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        name="submit"
                        className="btn bg-green col-12"
                        value="Masuk"
                      />
                    </div>
                  </form>
                </div>
                <div
                  className={
                    activeTab === 'signup-tab' ? 'tab-pane fade show active' : 'tab-pane fade'
                  }
                  id="signup"
                  role="tabpanel"
                  aria-labelledby="signup-tab"
                >
                  <h3>Ayo Mulai Bertransaksi di Djublee!</h3>
                  <FacebookLogin
                    appId="1616087575169529"
                    autoLoad={false}
                    fields="name,email,picture"
                    cssClass="btn bg-facebook col-12"
                    icon="fab fa-facebook-f"
                    textButton=" Mulai Dengan Facebook"
                    callback={this.responseFacebook}
                  />
                  <div className="line-center-box">
                    <span className="line-text">atau</span>
                    <hr className="line" />
                  </div>
                  <form
                    onSubmit={this.registerAction}
                    className="form-horizontal text-left"
                    method="post"
                    action="#"
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        name="first_name"
                        className="form-control"
                        onChange={this.handleChangeFName}
                        placeholder="Nama Depan"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="last_name"
                        className="form-control"
                        onChange={this.handleChangeLName}
                        placeholder="Nama Belakang"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="hp"
                        className="form-control"
                        onChange={this.handleChangePhone}
                        placeholder="No. HP"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        onChange={this.handleChangeEmail}
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        onChange={this.handleChangePassword}
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="conf_password"
                        className="form-control"
                        onChange={this.handleChangeConfPassword}
                        placeholder="Ulangi Password"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        name="submit"
                        className="btn bg-green col-12"
                        value="Daftar"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  AuthReducer: PropTypes.objectOf(PropTypes.any).isRequired,
  loginAction: PropTypes.func.isRequired,
  registerAction: PropTypes.func.isRequired,
  swal: PropTypes.func.isRequired
};

function mapStateToProps({ AuthReducer }) {
  return { AuthReducer };
}

export default connect(
  mapStateToProps,
  { swal, loginAction, registerAction, loginRegisterFBAction }
)(withRouter(Login));
