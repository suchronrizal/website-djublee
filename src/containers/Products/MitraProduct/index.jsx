import React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Modal, Select, Spin } from 'antd';
import InputRange from 'react-input-range';
import PropTypes from 'prop-types';
import { getDetailMitraAction, getMitraAction } from '../../../actions/mitraAction';
import { getProductByIdMitraAction } from '../../../actions/productAction';
import NotFound from '../../../components/404';
import {
  currentDate,
  formatDate,
  formatCurrency,
  setBgImage,
  setSlug
} from '../../../components/helpers/commons';
import { SlickSettings } from '../../../components/helpers/slick';

const { Option } = Select.Option;

class MitraProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      params: '',
      filterPrice: { min: 0, max: 1000000000 },
      filterYear: { min: 1990, max: currentDate('YYYY') },
      filterKM: { min: 0, max: 200000 },
      visible: false,
      mitra: null,
      other: null,
      product: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const url = window.location.pathname.split('/');
    const idMitra = url[2];
    const q = `customerId=${idMitra}`;
    const { getDetailMitraAction, getProductByIdMitraAction, getMitraAction } = this.props;
    getMitraAction();
    getDetailMitraAction(idMitra);
    getProductByIdMitraAction(q);
  }

  componentWillReceiveProps = nextProps => {
    const { MitraReducer, ProductReducer } = this.props;
    console.log(ProductReducer);
    if (
      nextProps.MitraReducer.loading !== MitraReducer.loading ||
      nextProps.ProductReducer.loading !== ProductReducer.loading
    ) {
      const { detail, list } = nextProps.MitraReducer;
      const { listProdukMitra } = nextProps.ProductReducer;
      this.setState({
        mitra: detail,
        other: list,
        product: listProdukMitra
      });
    }
  };

  setBgImage(url) {
    return { backgroundImage: `url(${url})` };
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { params } = this.state.params;
    this.props.history.push(`/search?pname=${params}`);
  };

  handleChange = e => {
    this.setState({
      params: e.target.value
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    const { mitra, product, other } = this.state;
    const settings = SlickSettings;
    console.log(this.state);
    const MitraView = () => (
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        {mitra ? (
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="third-slide" src="/public/img/banner-bg.png" alt="slide" />
              <div className="container">
                <div className="carousel-caption text-center" id="search-box-mitra">
                  <img alt="" src={mitra.image} className="img-mitra rounded-circle mx-auto" />
                  <h1 className="mb-4">{mitra.name}</h1>
                  <Modal
                    title="CARI MOBIL"
                    visible={this.state.visible}
                    okText="Cari"
                    cancelText="Batal"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    className="search-popup"
                  >
                    <div className="row">
                      <div className="col-md-12 bg-img-search">
                        <img src="/public/img/djublee-car.png" alt="" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="field-title">Merek</p>
                        <Select style={{ width: '100%' }} placeholder="Pilih Merk" className="mb-3">
                          <Option value="honda">Honda</Option>
                        </Select>
                        <p className="field-title">Group Model</p>
                        <Select
                          style={{ width: '100%' }}
                          placeholder="Pilih Group Model"
                          className="mb-3"
                        >
                          <Option value="honda">Honda</Option>
                        </Select>
                        <p className="field-title">Model</p>
                        <Select
                          style={{ width: '100%' }}
                          placeholder="Pilih Model"
                          className="mb-3"
                        >
                          <Option value="honda">Honda</Option>
                        </Select>
                        <p className="field-title">Wilayah</p>
                        <Select
                          style={{ width: '100%' }}
                          placeholder="Pilih Wilayah"
                          className="mb-3"
                        >
                          <Option value="honda">Honda</Option>
                        </Select>
                      </div>
                      <div className="col-md-6" style={{ marginTop: '5.25rem' }}>
                        <p className="mt-2 field-title">Harga</p>
                        <div className="range-box rangeslider mt-4 mb-4 col-md-12">
                          <InputRange
                            formatLabel={value => `${formatCurrency(value)}`}
                            maxValue={1000000000}
                            minValue={0}
                            value={this.state.filterPrice}
                            step={500}
                            onChange={value => this.setState({ filterPrice: value })}
                          />
                        </div>
                        <p className="mt-1 field-title">Tahun</p>
                        <div className="range-box mt-4 mb-4 col-12">
                          <InputRange
                            maxValue={currentDate('YYYY')}
                            minValue={1990}
                            value={this.state.filterYear}
                            step={1}
                            onChange={value => this.setState({ filterYear: value })}
                          />
                        </div>
                        <p className="mt-1 field-title">Km</p>
                        <div className="range-box mt-4 mb-4 col-12">
                          <InputRange
                            formatLabel={value => `${formatCurrency(value, '')}`}
                            maxValue={200000}
                            minValue={0}
                            value={this.state.filterKM}
                            step={1}
                            onChange={value => this.setState({ filterKM: value })}
                          />
                        </div>
                      </div>
                    </div>
                  </Modal>
                  <button
                    type="button"
                    className="btn bg-green my-2 my-sm-0 col-md-3 ml-auto"
                    onClick={this.showModal}
                  >
                    {`Cari`}
                  </button>
                  {/* <form className="form-inline mt-2 mt-md-0 offset-md-3 col-md-6" method="get" action="/search" onSubmit={this.handleSubmit}>
                <input className="form-control mr-sm-2 col-md-8" onChange={this.handleChange} type="search" style={{fontSize: "20px"}} placeholder="Mulai pencarian mobil" aria-label="Search" />
                <button className="btn bg-green my-2 my-sm-0 col-md-3 ml-auto" type="submit">Cari</button>
              </form> */}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );

    const MitraProduct = () => (
      <div className="container">
        <div className="mb-5">
          <div className="row">
            <h2 className="product-header col-md-6">List Produk Mitra</h2>
            <nav aria-label="Page navigation" className="col-md-6">
              <ul className="pagination" style={{ float: 'right' }}>
                <li className="page-item">
                  <a className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <hr />
        </div>
        {product ? (
          <div className="row">
            {product.map(data => (
              <div className="col-md-3 text-center mb-3" key={data.id}>
                <div className="product-box">
                  <Link
                    to={`/product?brand=${data.brand.id}&group_model=${data.group_model.id}&model=${
                      data.model.id
                    }&tahun=${formatDate(data.product_year_build, 'YYYY')}`}
                  >
                    <div
                      className="bg-image rounded mb-3"
                      style={
                        data.product_images ? this.setBgImage(data.product_images[0].link) : null
                      }
                    />
                    <h2 className="text-left product-title">
                      {data.brand ? data.brand.name : null}
                      {''}
                      {data.group_model ? data.group_model.name : null}
                      {`-`}
                      {data.model ? data.model.name : null}
                      <br />
                      <small>{formatDate(data.product_year_build, 'YYYY')}</small>
                    </h2>
                    <p className="text-left" style={{ marginBottom: '3px' }}>
                      <span className="product-info">
                        <span className="product-label">Harga Jual</span>
                        <span className="product-price">
                          {formatCurrency(data.product_sell_price)}
                        </span>
                      </span>
                    </p>
                  </Link>
                  {/* <a className="btn bg-green btn-beli" href="/beli">Beli</a> <a className="btn bg-yellow btn-tawar" href="/beli">Tawar</a> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    );

    const MitraOther = () => (
      <div className="container mt-5">
        <div className="mb-5">
          <h2 className="product-header">MITRA DJUBLEE LAINNYA</h2>
        </div>
        <Slider {...settings}>
          {other
            ? other.map(mitra => (
                <div className="text-center slick-box" key={mitra.id}>
                  <div
                    className="rounded-circle mb-3 mx-auto"
                    style={setBgImage(mitra.image)}
                    width="140"
                  />
                  <p>
                    <Link
                      to={`/mitra/${mitra.id}/${setSlug(mitra.name)}`}
                      style={{ fontSize: '20px' }}
                    >
                      {mitra.name}
                    </Link>
                  </p>
                </div>
              ))
            : ''}
        </Slider>
      </div>
    );

    return (
      <div>
        {this.props.MitraReducer.loading ? (
          <div className="row">
            <div className="col-md-2 col-md-offset-5">
              <Spin />
            </div>
          </div>
        ) : (
          <div>
            <MitraView />
            <MitraProduct />
            <MitraOther />
          </div>
        )}
      </div>
    );
  }
}

MitraProduct.propTypes = {
  getDetailMitraAction: PropTypes.func.isRequired,
  getProductByIdMitraAction: PropTypes.func.isRequired,
  getMitraAction: PropTypes.func.isRequired,
  MitraReducer: PropTypes.objectOf(PropTypes.any).isRequired,
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getDetailMitraAction: idMitra => dispatch(getDetailMitraAction(idMitra)),
  getProductByIdMitraAction: q => dispatch(getProductByIdMitraAction(q)),
  getMitraAction: () => dispatch(getMitraAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MitraProduct);
