import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import {
  getProductSearchGroupByNameAction,
  getProductSearchGroupByParamsAction,
  getProductBrandAction,
  getProductMerkAction,
  getProductModelAction,
  getProductWilayahAction
} from '../../../../actions/productAction';
import Paginations from '../../../../components/helpers/Pagination';
import BrandFilter from '../../../../components/filter/FilterBrand';
import MerkFilter from '../../../../components/filter/FilterMerk';
import ModelFilter from '../../../../components/filter/FilterModel';
import CityFilter from '../../../../components/filter/FilterCity';
import RangeFilter from '../../../../components/filter/FilterRange';
import NotFound from '../../../../components/404';
import { formatDate, setBgImage, formatCurrency } from '../../../../components/helpers/commons';

import 'react-input-range/lib/css/index.css';

class SearchProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBrand: '',
      currentGroupModel: '',
      currentModel: '',
      currentWilayah: '',
      currentPrice: { min: '', max: '' },
      currentYear: { min: '', max: '' },
      currentKM: { min: '', max: '' }
    };
  }

  componentDidMount() {
    const { search } = this.props.location;
    const val = new URLSearchParams(search);
    this.setState({
      currentBrand: val.get('brand'),
      currentGroupModel: val.get('group_model'),
      currentModel: val.get('model'),
      currentWilayah: val.get('wilayah'),
      currentPrice: { min: val.get('hargaawal'), max: val.get('hargaakhir') },
      currentYear: { min: val.get('tahunawal'), max: val.get('tahunakhir') },
      currentKM: { min: val.get('kiloawal'), max: val.get('kiloakhir') }
    });
    const params = `brand=${val.get('brand') || ''}&group_model=${val.get('group_model') ||
      ''}&model=${val.get('model') || ''}&tahunawal=${val.get('tahunawal') ||
      ''}&tahunakhir=${val.get('tahunakhir') || ''}&wilayah=${val.get('wilayah') ||
      ''}&hargaawal=${val.get('hargaawal') || ''}&hargaakhir=${val.get('hargaakhir') ||
      ''}&kiloawal=${val.get('kiloawal') || ''}&kiloakhir=${val.get('kiloakhir') || ''}`;
    this.props.getProductMerkAction(val.get('brand'));
    this.props.getProductModelAction(val.get('group_model'));
    this.props.getProductSearchGroupByParamsAction(params);
  }

  componentDidUpdate = prevProps => {
    if (this.props.location.search !== prevProps.location.search) {
      const { search } = this.props.location;
      const val = new URLSearchParams(search);
      const params = `brand=${val.get('brand') || ''}&group_model=${val.get('group_model') ||
        ''}&model=${val.get('model') || ''}&tahunawal=${val.get('tahunawal') ||
        ''}&tahunakhir=${val.get('tahunakhir') || ''}&wilayah=${val.get('wilayah') ||
        ''}&hargaawal=${val.get('hargaawal') || ''}&hargaakhir=${val.get('hargaakhir') ||
        ''}&kiloawal=${val.get('kiloawal') || ''}&kiloakhir=${val.get('kiloakhir') || ''}`;
      this.props.getProductBrandAction();
      this.props.getProductMerkAction(val.get('brand'));
      this.props.getProductModelAction(val.get('group_model'));
      this.props.getProductWilayahAction();
      this.props.getProductSearchGroupByParamsAction(params);
    }
  };

  render() {
    const {
      currentBrand,
      currentGroupModel,
      currentModel,
      currentWilayah,
      currentPrice,
      currentYear,
      currentKM
    } = this.state;
    const res = this.props.ProductReducer;
    const pages = (res.listSearchGroupByParams && res.listSearchGroupByParams.page) || null;
    const products = (res.listSearchGroupByParams && res.listSearchGroupByParams.data) || [];
    return (
      <div>
        <div className="row">
          <div className="col-md-3 mb-2">
            {res.loading ? (
              <div className="col-md-12 text-center mt-5">
                <Spin tip="Loading..." />
              </div>
            ) : (
              <div>
                <BrandFilter currentBrand={currentBrand} />
                <MerkFilter groupModel={currentGroupModel} />
                <ModelFilter currentModel={currentModel} />
                <CityFilter currentWilayah={currentWilayah} />
                <RangeFilter
                  currentPrice={currentPrice}
                  currentYear={currentYear}
                  currentKM={currentKM}
                />
              </div>
            )}
          </div>
          <div className="col-md-9">
            <div className="row mb-4">
              <div className="search-sorting col-12">
                <div className="sorting-label">
                  <div className="form-group row">
                    <label htmlFor="sort-label col-md-4">Atur Berdasarkan: </label>
                    <select className="form-control col-md-4">
                      <option value="terbaru">Listing Terbaru</option>
                      <option value="harga">Listing Harga</option>
                    </select>
                    <div className="col-md-5">
                      {res.loading ? 'Loading...' : <Paginations pages={pages} />}
                    </div>
                  </div>
                </div>
              </div>
              {res.loading ? (
                <div className="col-md-12 text-center mt-5">
                  <Spin tip="Loading..." />
                </div>
              ) : (
                <div className="row col-md-12">
                  {(products.length > 0 &&
                    products.map((product, index) => (
                      <div className="col-md-3 text-center" key={index}>
                        <div className="product-box">
                          <span className="product-sticky-label">
                            {`${product.product_count} listing`}
                            <br />
                            {`${product.bid_count} penawar`}
                          </span>
                          <div className="bg-image rounded mb-3" style={setBgImage(product.link)} />
                          <h2 className="text-left product-title">
                            {`${product.brandName} ${product.groupModelName} ${product.modelName}`}
                            <br />
                            <small>{formatDate(product.product_year_build, 'YYYY')}</small>
                          </h2>
                          <p className="text-left">
                            {`Harga Jual Terendah`}
                            <br />
                            <span className="product-price">
                              {formatCurrency(product.lowest_price)}
                            </span>
                            <br />
                            {`Harga Tawar Tertinggi`}
                            <br />
                            <span className="product-sell">
                              {formatCurrency(product.last_transaction)}
                            </span>
                            <br />
                          </p>
                        </div>
                      </div>
                    ))) || (
                    <div className="col-md-12 text-center mt-5">
                      {`Ooops produk tidak ditemukan`}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchProduct.propTypes = {
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  getProductWilayahAction: PropTypes.func.isRequired,
  getProductMerkAction: PropTypes.func.isRequired,
  getProductModelAction: PropTypes.func.isRequired,
  getProductBrandAction: PropTypes.func.isRequired,
  getProductSearchGroupByParamsAction: PropTypes.func.isRequired
};

function mapStateToProps({ PaginationReducer, ProductReducer, Filter }) {
  return { PaginationReducer, ProductReducer, Filter };
}

export default connect(
  mapStateToProps,
  {
    getProductSearchGroupByNameAction,
    getProductSearchGroupByParamsAction,
    getProductBrandAction,
    getProductMerkAction,
    getProductModelAction,
    getProductWilayahAction
  }
)(withRouter(SearchProduct));
