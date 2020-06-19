import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { swal } from 'react-redux-sweetalert';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { getProductByIdAction } from '../../actions/productAction';
import { createTawar, bankLeasing, bankKredit } from '../../actions/tawarAction';
import ChangeFormCard from './components/ChangeCC';
import { formatDate, formatNumber } from '../../components/helpers/commons';

const Options = Select.Option;

class ProductTawar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kk: 'none',
      angsuran: 'none',
      bidPrice: '',
      bidPayment: null,
      banks: null,
      bankCreditId: null
    };
  }

  componentDidMount = () => {
    this.props.bankLeasing();
    const { id } = this.props.match.params;
    id && this.props.getProductByIdAction(id);
  };

  componentWillReceiveProps = nextProps => {
    const { Tawar } = this.props;
    if (nextProps.Tawar.success !== Tawar.success) {
      this.props.swal({
        title: 'Success',
        type: 'success',
        timer: 3000,
        showConfirmButton: false
      });
      this.props.history.push('/pembelian');
    }
    if (Tawar.bankLeasing) {
      this.setState({
        banks: Tawar ? Tawar.bankLeasing : null
      });
    }
  };

  radioOnClick = e => {
    const val = e.target.value;
    if (val === '2') {
      this.setState({
        kk: 'block',
        angsuran: 'none'
      });
    } else if (val === '3') {
      this.setState({
        kk: 'none',
        angsuran: 'block'
      });
    } else {
      this.setState({
        kk: 'none',
        angsuran: 'none'
      });
    }
  };

  getCC = idLeasing => {
    this.setState({ bankId: idLeasing });
    idLeasing && this.props.bankKredit(idLeasing);
  };

  submitTawar = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { bidPayment, bidPrice, bankId, bankCreditId, bidDay } = this.state;
    const param = {
      product_id: id,
      bid_payment: bidPayment,
      bid_price: bidPrice,
      bank_id: bankId || null,
      bank_credit_id: bankCreditId || null,
      bid_day: bidDay || '7'
    };
    id && this.props.createTawar(param);
    this.props.match.params.id && this.props.getProductByIdAction(this.props.match.params.id);
  };

  handleChange = e => {
    // console.log(e.target)
    this.setState({ [e.target.name]: e.target.value });
  };

  selectCreditId = creditId => {
    this.setState({
      bankCreditId: creditId
    });
  };

  render() {
    const { listById } = this.props.ProductReducer;
    const produk = listById || [];
    const { Tawar } = this.props;
    const { banks } = this.state;

    return (
      <div className="productDetail">
        <div className="container">
          <form onSubmit={e => this.submitTawar(e)}>
            <div className="row product-detail-header">
              <div className="col-md-8">
                <div>
                  <h4 className="text-left product-title">
                    {'Penawaran Anda '}
                    <br />
                    <small>Silahkan isi data-data yang diperlukan</small>
                  </h4>
                  <br />
                  <div>
                    <strong>Harga penawaran anda </strong>
                    <small>
                      {'Expired in'}
                      <select
                        className="price-expiration"
                        name="bidDay"
                        onChange={this.handleChange}
                      >
                        <option value="7">7 days</option>
                        <option value="15">15 days</option>
                        <option value="30">30 days</option>
                      </select>
                    </small>
                    <br />
                    <div className="input-group input-group-lg mb-1 mt-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          {'Rp.'}
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control col-md-5"
                        name="bidPrice"
                        required
                        onChange={this.handleChange}
                      />
                    </div>
                    <br />
                    <div className="price-info cl-green bg-yellow-light mb-3">
                      <span className="box-key">atau cicil melalui KKB</span>
                      <span className="box-value">Total DP: Rp 88.200.000</span>
                      <br />
                      <span className="box-key">*Harga Awal</span>
                      <span className="box-value">Angsuran: Rp 17.836.000</span>
                      <br />
                    </div>
                  </div>
                  <div className="payment-method">
                    <strong>Payment Method</strong>
                    <ul>
                      <li>
                        <input
                          type="radio"
                          value="1"
                          onClick={this.radioOnClick}
                          name="bidPayment"
                          required
                          onChange={this.handleChange}
                        />
                        <span className="payment-info">
                          <i className="fas fa-money-bill" />
                          <strong>Dengan Uang Tunai</strong>
                          <br />
                          {'Melakukan pembayaran dengan uang tunai'}
                        </span>
                        <span className="clearfix" />
                      </li>
                      <li>
                        <input
                          type="radio"
                          value="2"
                          onClick={this.radioOnClick}
                          name="bidPayment"
                          required
                          onChange={this.handleChange}
                        />
                        <span className="payment-info">
                          <i className="fas fa-credit-card" />
                          <strong>Dengan Kartu Kredit</strong>
                          <br />
                          {'Melakukan pembayaran dengan kartu kredit'}
                        </span>
                        <span className="clearfix" />
                        <div style={{ display: this.state.kk }}>
                          <ChangeFormCard />
                        </div>
                      </li>
                      <li>
                        <input
                          type="radio"
                          value="3"
                          onClick={this.radioOnClick}
                          name="bidPayment"
                          required
                          onChange={this.handleChange}
                        />
                        <span className="payment-info">
                          <i className="fas fa-calendar-check" />
                          <strong>Dengan Angsuran</strong>
                          <br />
                          {'Melakukan pembayaran dengan cicilan'}
                        </span>
                        <span className="clearfix" />
                        <div
                          style={{ display: this.state.angsuran }}
                          className="form-horizontal payment-form mt-3"
                        >
                          <div className="form-group row col-6">
                            <div className="col-sm-12">
                              <Select
                                name="bankId"
                                placeholder="Bank"
                                onChange={e => this.getCC(e)}
                              >
                                {banks &&
                                  banks.map(items => (
                                    <Options key={items.id} value={items.id}>
                                      {items.bank_leasing_name}
                                    </Options>
                                  ))}
                              </Select>
                            </div>
                          </div>
                          <div className="form-group row col-6">
                            <div className="col-sm-12">
                              {Tawar.loadingBankKredit ? (
                                'Loading...'
                              ) : (
                                <Select
                                  name="bankCreditId"
                                  placeholder="Cicilan"
                                  onChange={this.selectCreditId}
                                >
                                  {Tawar.bankKredit &&
                                    Tawar.bankKredit.map(items => (
                                      <Options key={items.id} value={items.id}>
                                        {items.dp}
                                      </Options>
                                    ))}
                                </Select>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <!-- /.col-md-3 --> */}
              <div className="col-md-4">
                <div className="mt-3">
                  {this.props.ProductReducer.loading ? (
                    'Loading...'
                  ) : (
                    <div className="tawar-box mb-3">
                      <div className="text-center">
                        {produk.product_images && (
                          <img alt="" src={produk.product_images[0].link} className="img-fluid" />
                        )}
                      </div>
                      <h5 className="title">
                        {`${produk.brand && produk.brand.name} ${produk.group_model &&
                          produk.group_model.name} ${produk.model && produk.model.name}`}
                        <br />
                        <small>{formatDate(produk.product_year_build, 'YYYY')}</small>
                      </h5>
                      <span className="jual-text">Milage</span>
                      <span className="jual-listing">
                        {formatNumber(produk.product_kilometer)}
                        {'km'}
                      </span>
                      <br />
                      <span className="jual-text">Ext. Color</span>
                      <span className="jual-listing">
                        {produk.exterior_color ? produk.exterior_color.name : null}
                      </span>
                      <br />
                      <span className="jual-text">Int. Color</span>
                      <span className="jual-listing">
                        {produk.interior_color ? produk.interior_color.name : null}
                      </span>
                      <br />
                      <div className="text-center mt-5">
                        <a href="#j" className="cl-soft-blue text-center">
                          {'LIHAT DATA PENAWARAN'}
                        </a>
                      </div>
                    </div>
                  )}
                  <button className="btn bg-green col-12 txt-bold" type="submit">
                    {'TAWAR'}
                  </button>
                  {Tawar.error && (
                    <div
                      className="alert alert-danger alert-dismissible fade show mt-3"
                      role="alert"
                    >
                      <strong>Error</strong>
                      {` ${Tawar.errorMessages}`}
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
          {/* <!-- /END THE FEATURETTES --> */}
        </div>
        {/* <!-- /.container --> */}
      </div>
    );
  }
}
ProductTawar.propTypes = {
  createTawar: PropTypes.func.isRequired,
  bankLeasing: PropTypes.func.isRequired,
  bankKredit: PropTypes.func.isRequired,
  swal: PropTypes.func.isRequired,
  match: PropTypes.func.isRequired,
  getProductByIdAction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  listById: PropTypes.arrayOf(PropTypes.any).isRequired,
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired,
  Tawar: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};
function mapStateToProps({ Tawar, ProductReducer }) {
  return { Tawar, ProductReducer };
}
export default connect(
  mapStateToProps,
  { swal, createTawar, bankLeasing, bankKredit, getProductByIdAction }
)(withRouter(ProductTawar));
