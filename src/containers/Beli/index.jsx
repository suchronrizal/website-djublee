import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { swal } from 'react-redux-sweetalert';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Select, Radio, Button, Input, Form, DatePicker } from 'antd';
import { getProductByIdAction } from '../../actions/productAction';
import { getMyProfileDataAction } from '../../actions/profileAction';
import {
  getBankLeasingList,
  getBankCreditList,
  getBankCreditCalculation,
  postUserCreditCard,
  postBuyProductAction
} from '../../actions/beliAction';
import {
  formatDate,
  formatCurrency,
  getParams,
  formatNumber
} from '../../components/helpers/commons';

const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY/MM';
const newDate = new Date();
const defaultMonth = newDate.getMonth() + 1;
const defaultYear = newDate.getFullYear();
const Options = Select.Option;

class BeliForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kk: 'none',
      angsuran: 'none',
      loadingCC: false,
      loadingBank: false,
      loadingBuy: false,
      disable: false
    };
  }

  componentDidMount() {
    const { isSigedIn } = this.props.AuthReducer;
    const params = getParams(window.location.search);
    const id = params.get('id');
    if (isSigedIn) {
      this.props.getMyProfileDataAction();
      this.props.getProductByIdAction(id);
      this.props.getBankLeasingList();
    } else {
      this.props.swal({
        title: 'Error!',
        text: 'Anda harus login terlebih dahulu untuk membeli mobil di djubee',
        type: 'error',
        timer: 3000,
        showConfirmButton: false
      });
      this.props.history.push(`/login`);
    }
  }

  componentWillReceiveProps = nextProps => {
    const { BeliReducer } = this.props;
    if (nextProps.BeliReducer.buySuccess !== BeliReducer.buySuccess) {
      this.props.swal({
        title: 'Success',
        text: 'Produk berhasil dibeli',
        type: 'success',
        timer: 3000,
        showConfirmButton: false
      });
      this.props.history.push(`/`);
    }
    if (nextProps.BeliReducer.cardSuccess !== BeliReducer.cardSuccess) {
      this.props.swal({
        title: 'Success',
        text: 'Kartu Kredit berhasil di update',
        type: 'success',
        timer: 3000,
        showConfirmButton: false
      });
      this.setState({
        disable: false,
        loadingCC: false
      });
    }
  };

  onClick = e => {
    if (e.target.value === `2`) {
      this.setState({
        kk: 'block',
        angsuran: 'none'
      });
    } else if (e.target.value === `3`) {
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

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loadingBuy: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          product_id: values.idProduct,
          bid_payment: values.paymentMethod,
          bank_id: values.bankLeasing ? values.bankLeasing : '',
          bank_credit_id: values.bankCredit ? values.bankCredit : '',
          address: values.shipAddress,
          kota_id: '',
          kode_pos: '',
          bid_day: 1
        };
        this.props.postBuyProductAction(data);
      }
    });
  };

  handleValueCreditcard = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loadingCC: true });
        const expCC = moment(values.expCreditCard).format('MM/YY');
        const expData = expCC.split('/');
        const data = {
          card_number: values.nomorCC,
          month: expData[0],
          year: expData[1],
          cvv: values.cvv
        };
        const id = values.idUser;
        this.props.postUserCreditCard(id, data);
      }
    });
  };

  handleBank = id => {
    this.props.getBankCreditList(id);
  };

  handleValueBank = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loadingBank: true });
        const value = values.hargaBeli;
        const id = values.bankCredit;
        this.props.getBankCreditCalculation(id, value);

        setTimeout(() => {
          this.setState({ loadingBank: false });
        }, 1000);
      }
    });
  };

  render() {
    const { loadingBank, loadingCC, kk, loadingBuy, angsuran, disable } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { myUserData } = this.props.ProfileReducer;
    const { listBankLeasing, listBankCredit, totalBankCalculation } = this.props.BeliReducer;
    const { listById } = this.props.ProductReducer;
    const products = (listById !== undefined && listById) || [];
    const bankLeasing = (listBankLeasing !== undefined && listBankLeasing) || [];
    const bankCredit = (listBankCredit !== undefined && listBankCredit) || [];
    const dataUser = (myUserData !== undefined && myUserData) || [];
    const creditCard = (dataUser && dataUser.credit_card) || null;
    return (
      <div className="productDetail beli-page">
        <Form onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="row product-detail-header">
              <div className="col-md-8">
                <div>
                  <h4 className="text-left product-title">
                    {`Pembelian Anda`}
                    <br />
                    <small>Silahkan isi data-data yang diperlukan</small>
                  </h4>
                  <div className="mb-3">
                    <strong>Shipping address </strong>
                    <br />
                    <Form.Item hasFeedback style={{ marginBottom: '0' }}>
                      {getFieldDecorator('shipAddress', {
                        rules: [{ required: true, message: 'Please select your ship address!' }]
                      })(
                        <Select className="col-md-6" initialValue="-">
                          {dataUser ? (
                            <Options value={dataUser.address}>{dataUser.address}</Options>
                          ) : null}
                          {dataUser ? (
                            <Options value={dataUser.other_address}>
                              {dataUser.other_address}
                            </Options>
                          ) : null}
                        </Select>
                      )}
                    </Form.Item>
                    <Link to="/profile"> Click here to go profile to add / edit address</Link>
                  </div>
                  <div className="payment-method">
                    <strong>Payment Method</strong>
                    <Form.Item style={{ marginTop: '10px' }}>
                      {getFieldDecorator('paymentMethod')(
                        <Radio.Group>
                          <p style={{ marginBottom: '0' }}>
                            <Radio value="1" onClick={this.onClick}>
                              <span className="payment-info">
                                <i className="fas fa-money-bill" />
                                <strong>Dengan Uang Tunai</strong>
                                <br />
                                {`Melakukan pembayaran dengan uang tunai`}
                              </span>
                              <span className="clearfix" />
                            </Radio>
                          </p>
                          <p style={{ marginBottom: '0' }}>
                            <Radio value="2" onClick={this.onClick}>
                              <span className="payment-info">
                                <i className="fas fa-credit-card" />
                                <strong>Dengan Kartu Kredit</strong>
                                <br />
                                {`Melakukan pembayaran dengan kartu kredit`}
                              </span>
                              <span className="clearfix" />
                            </Radio>
                          </p>
                          <div
                            style={{
                              display: kk,
                              background: '#f2f2f2',
                              padding: '10px',
                              marginTop: '-25px',
                              marginBottom: '10px'
                            }}
                            className="form-horizontal payment-form"
                          >
                            <div className="form-group row">
                              <div className="col-sm-12">
                                <Form.Item hasFeedback style={{ marginBottom: '0' }}>
                                  {getFieldDecorator('nomorCC', {
                                    initialValue: creditCard ? creditCard.card_number : null
                                  })(<Input disabled={disable} />)}
                                </Form.Item>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-sm-6">
                                <Form.Item style={{ marginBottom: '0' }}>
                                  {getFieldDecorator('expCreditCard', {
                                    rules: [{ type: 'object' }],
                                    initialValue: moment(
                                      `${(creditCard && creditCard.year) ||
                                        defaultYear}/${(creditCard && creditCard.month) ||
                                        defaultMonth}`,
                                      monthFormat
                                    )
                                  })(
                                    <MonthPicker format={monthFormat} style={{ width: '100%' }} />
                                  )}
                                </Form.Item>
                              </div>
                              <div className="col-sm-6">
                                <Form.Item hasFeedback style={{ marginBottom: '0' }}>
                                  {getFieldDecorator('cvv', {
                                    rules: [{ len: 3, message: 'Must 3 digits!' }]
                                  })(<Input disabled={disable} placeholder="CVV" />)}
                                </Form.Item>
                                <Form.Item style={{ display: 'none' }}>
                                  {getFieldDecorator('idUser', {
                                    initialValue: dataUser ? dataUser.id : null
                                  })(<Input />)}
                                </Form.Item>
                                <Form.Item style={{ display: 'none' }}>
                                  {getFieldDecorator('idProduct', {
                                    initialValue: products ? products.id : null
                                  })(<Input />)}
                                </Form.Item>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-sm-12">
                                <Button
                                  type="primary bg-yellow col-sm-12"
                                  disabled={disable}
                                  loading={loadingCC}
                                  htmlType="submit"
                                  onClick={this.handleValueCreditcard}
                                >
                                  {`SIMPAN`}
                                </Button>
                              </div>
                            </div>
                          </div>
                          <p style={{ marginBottom: '0' }}>
                            <Radio value="3" onClick={this.onClick}>
                              <span className="payment-info">
                                <i className="fas fa-calendar-check" />
                                <strong>Dengan Angsuran</strong>
                                <br />
                                {`Melakukan pembayaran dengan cicilan`}
                              </span>
                              <span className="clearfix" />
                            </Radio>
                          </p>
                          <div
                            style={{
                              display: angsuran,
                              background: '#f2f2f2',
                              padding: '10px',
                              marginTop: '-25px',
                              marginBottom: '10px'
                            }}
                            className="form-horizontal payment-form"
                          >
                            <div className="row">
                              <div className="col-sm-12">
                                <Form.Item hasFeedback style={{ marginBottom: '0' }}>
                                  {getFieldDecorator('bankLeasing', {})(
                                    <Select
                                      className="col-md-12"
                                      onChange={this.handleBank}
                                      placeholder="Select Bank"
                                    >
                                      {(bankLeasing &&
                                        bankLeasing.map(data => (
                                          <Options value={data.id} key={data.id}>
                                            {data.bank_leasing_name}
                                          </Options>
                                        ))) ||
                                        ''}
                                    </Select>
                                  )}
                                </Form.Item>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-12">
                                <Form.Item hasFeedback style={{ marginBottom: '0' }}>
                                  {getFieldDecorator('bankCredit', {})(
                                    <Select className="col-md-12" placeholder="Select Cicilan">
                                      {(bankCredit &&
                                        bankCredit.map(data => (
                                          <Options value={data.id} key={data.id}>
                                            {`DP `}
                                            {data.dp}
                                            {`%, Bunga `}
                                            {data.interest}
                                            {`% / tahun, `}
                                            {data.month}
                                            {` bulan`}
                                          </Options>
                                        ))) ||
                                        ''}
                                    </Select>
                                  )}
                                </Form.Item>
                                <Form.Item hasFeedback style={{ display: 'none' }}>
                                  {getFieldDecorator('hargaBeli', {
                                    initialValue: products ? products.product_sell_price : null
                                  })(<Input />)}
                                </Form.Item>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-sm-12">
                                <Button
                                  type="primary bg-yellow col-sm-12"
                                  loading={loadingBank}
                                  htmlType="submit"
                                  onClick={this.handleValueBank}
                                >
                                  {`SIMPAN`}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </div>
                </div>
              </div>
              {/* <!-- /.col-md-3 --> */}
              <div className="col-md-4">
                <div className="mt-3">
                  <div className="tawar-box mb-3">
                    <div className="text-center">
                      {products.product_images &&
                        products.product_images.map(img => (
                          <div
                            key={img.id}
                            style={{ backgroundImage: `url(${img.link})` }}
                            className="bg-img-produk"
                          />
                        ))}
                    </div>
                    <h5 className="title">
                      {`${products.brand ? products.brand.name : null} ${
                        products.group_model ? products.group_model.name : null
                      } - ${products.model ? products.model.name : null}`}
                      <br />
                      <small>{formatDate(products.product_year_build, 'YYYY')}</small>
                    </h5>
                    <span className="jual-text">Milage</span>
                    <span className="jual-listing">
                      {`${formatNumber(products.product_kilometer)} km`}
                    </span>
                    <br />
                    <span className="jual-text">Ext. Color</span>
                    <span className="jual-listing">
                      {products.exterior_color ? products.exterior_color.name : null}
                    </span>
                    <br />
                    <span className="jual-text">Int. Color</span>
                    <span className="jual-listing">
                      {products.interior_color ? products.interior_color.name : null}
                    </span>
                    <br />
                    <div className="text-center mt-5">
                      <a href="#j" className="cl-soft-blue text-center">
                        {`LIHAT DATA PEMBELIAN`}
                      </a>
                    </div>
                    <hr />
                    <span className="jual-text txt-bold">Harga Beli</span>
                    <span className="jual-listing txt-bold">
                      {formatCurrency(products.product_sell_price)}
                    </span>
                    <br />
                    <small>Expired in 30 days</small>
                    <div className="price-info wd-100 cl-green bg-yellow-light mt-3 mb-3">
                      <span className="box-key">atau cicil melalui KKB</span>
                      <span className="box-value">
                        {`Total DP : `}
                        {(totalBankCalculation.credit_dp &&
                          formatCurrency(totalBankCalculation.credit_dp)) ||
                          '-'}
                      </span>
                      <br />
                      <span className="box-key">*Harga Awal</span>
                      <span className="box-value">
                        {`Angsuran : `}
                        {(totalBankCalculation.credit_monthly &&
                          formatCurrency(totalBankCalculation.credit_monthly)) ||
                          '-'}
                      </span>
                      <br />
                    </div>
                  </div>
                  <Button
                    type="btn bg-green col-12 txt-bold"
                    loading={loadingBuy}
                    htmlType="submit"
                  >
                    {`BELI`}
                  </Button>
                </div>
              </div>
            </div>
            {/* {responseCreditCard ? (
              <Modal
                visible={statusModal}
                title={`${responseCreditCard.status}  - ${responseCreditCard.message}`}
                onOk={() => this.handleSuccessModal(responseCreditCard.status)}
                footer={[
                  <Button
                    key="submit"
                    type="primary"
                    loading={loadingModal}
                    onClick={() => this.handleSuccessModal(responseCreditCard.status)}
                  >
                    {`Tutup`}
                  </Button>
                ]}
              >
                <p>{responseCreditCard.message}</p>
              </Modal>
            ) : (
              ''
            )} */}
            {/* {responseBuyProduct ? (
              <Modal
                visible={buyModal}
                title={`${responseBuyProduct.status}  -  ${responseBuyProduct.message}`}
                onOk={this.handleBuyModal}
                footer={[
                  <Button
                    key="submit"
                    type="primary"
                    loading={loadingModal}
                    onClick={this.handleBuyModal}
                  >
                    {`Tutup`}
                  </Button>
                ]}
              >
                <p>{responseBuyProduct.message}</p>
              </Modal>
            ) : (
              ''
            )} */}
          </div>
        </Form>
      </div>
    );
  }
}

BeliForm.propTypes = {
  getProductByIdAction: PropTypes.func.isRequired,
  getBankLeasingList: PropTypes.func.isRequired,
  getBankCreditCalculation: PropTypes.func.isRequired,
  getBankCreditList: PropTypes.func.isRequired,
  postBuyProductAction: PropTypes.func.isRequired,
  postUserCreditCard: PropTypes.func.isRequired,
  swal: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  ProfileReducer: PropTypes.objectOf(PropTypes.any).isRequired,
  BeliReducer: PropTypes.objectOf(PropTypes.any).isRequired,
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired,
  AuthReducer: PropTypes.objectOf(PropTypes.any).isRequired,
  getMyProfileDataAction: PropTypes.objectOf(PropTypes.any).isRequired
};

const ProductBeli = Form.create({ name: 'beliform' })(BeliForm);

function mapStateToProps({ ProductReducer, BeliReducer, ProfileReducer, AuthReducer }) {
  return { ProductReducer, BeliReducer, ProfileReducer, AuthReducer };
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      getMyProfileDataAction,
      getProductByIdAction,
      getBankLeasingList,
      getBankCreditList,
      getBankCreditCalculation,
      postUserCreditCard,
      postBuyProductAction,
      swal
    }
  )(ProductBeli)
);
