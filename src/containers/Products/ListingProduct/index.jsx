import React, { Component } from 'react';
import { Table, Select, Modal, Spin } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import {
  getDetailViewProductByVariousParameter,
  getViewProductByVariousParameter
} from '../../../actions/productAction';
import { formatDate, formatCurrency, getParams } from '../../../components/helpers/commons';

const Options = Select.Option;

class ListingProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: '',
      filterPrice: { min: 0, max: 1000000000 },
      filterKM: { min: 0, max: 200000 },
      visible: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    const params = getParams(window.location.search);
    const model = params.get('model');
    const brand = params.get('brand');
    const groupModel = params.get('group_model');
    const tahunawal = params.get('tahunawal');
    const tahunakhir = params.get('tahunakhir');
    const param = `model=${model}&tahunawal=${tahunawal}&tahunakhir=${tahunakhir}`;
    const paramByVarious = `hargaawal&hargaakhir=&kiloawal=&kiloakhir=&tahun=${tahunawal}&brand=${brand}&group_model=${groupModel}&model=${model}`;
    this.props.getDetailViewProductByVariousParameter(param);
    this.props.getViewProductByVariousParameter(paramByVarious);
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
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

  render() {
    const { history } = this.props;
    const { ProductReducer } = this.props;
    const detail =
      ProductReducer.listViewProductByVariousParam &&
      ProductReducer.listViewProductByVariousParam.data;
    const listDetail =
      (ProductReducer !== undefined && ProductReducer.listDetailViewGroupProduct) || [];
    const columns = [
      {
        title: 'Tanggal',
        dataIndex: 'tanggal',
        width: 250
      },
      {
        title: 'Harga',
        dataIndex: 'harga',
        width: 250
      },
      {
        title: (
          <div>
            {`Wilayah`}
            <i
              role="link"
              tabIndex="0"
              className="fas fa-cogs"
              style={{ float: 'right', fontSize: 18, cursor: 'pointer' }}
              onClick={this.showModal}
              onKeyDown={this.handleClick}
            />
          </div>
        ),
        dataIndex: 'wilayah'
      }
    ];
    const data = [];
    listDetail.map(value =>
      data.push({
        key: value.id,
        tanggal: formatDate(value.updatedAt),
        harga: formatCurrency(value.product_sell_price),
        wilayah: value.wilayah && value.wilayah.name
      })
    );

    return (
      <div className="container listing">
        <Modal
          title="Filter"
          visible={this.state.visible}
          okText="SIMPAN"
          cancelText="RESET"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className="search-popup"
        >
          <div className="row">
            <div className="col-md-12">
              <p className="field-title">Wilayah</p>
              <Select style={{ width: '100%' }} placeholder="Pilih Wilayah" className="mb-3">
                <Options value="honda">Honda</Options>
              </Select>
              <p className="field-title">Warna Eksterior</p>
              <Select
                style={{ width: '100%' }}
                placeholder="Pilih Warna Eksterior"
                className="mb-3"
              >
                <Options value="honda">Honda</Options>
              </Select>
              <p className="field-title">Warna Interior</p>
              <Select style={{ width: '100%' }} placeholder="Pilih Warna Interior" className="mb-3">
                <Options value="honda">Honda</Options>
              </Select>
              <p className="field-title">Kondisi</p>
              <Select style={{ width: '100%' }} placeholder="Pilih Kondisi" className="mb-3">
                <Options value="honda">Honda</Options>
              </Select>
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
              <p className="field-title">Urutkan dari</p>
              <Select style={{ width: '100%' }} placeholder="-" className="mb-3">
                <Options value="honda">Honda</Options>
              </Select>
            </div>
          </div>
        </Modal>
        {ProductReducer.loading ? (
          <div className="row text-center">
            <div className="col-md-12">
              <Spin tip="Loading..." />
            </div>
          </div>
        ) : (
          <div className="page">
            <div className="row">
              <div className="col-md-12">
                <h3 style={{ fontWeight: 'bold' }}>
                  {`${detail && detail.brandName} ${detail && detail.groupModelName} ${detail &&
                    detail.modelName}`}
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{ pageSize: 50 }}
                  scroll={{ y: 240 }}
                  className="listing-table"
                  onRow={record => ({
                    onClick: () => history.push(`/product/detail-product/${record.key}`)
                  })}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
ListingProduct.propTypes = {
  getDetailViewProductByVariousParameter: PropTypes.func.isRequired,
  getViewProductByVariousParameter: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired
};

function mapStateToProps({ ProductReducer }) {
  return { ProductReducer };
}
export default connect(
  mapStateToProps,
  {
    getDetailViewProductByVariousParameter,
    getViewProductByVariousParameter
  }
)(withRouter(ListingProduct));
