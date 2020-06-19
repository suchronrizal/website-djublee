import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Modal, Select } from 'antd';
import InputRange from 'react-input-range';
import { currentDate, formatCurrency } from './helpers/commons';
import { showMerk, showBrand, showType, showWilayah, showFilter } from '../actions/filterAction';

const Options = Select.Option;

class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterPrice: { min: 0, max: 1000000000 },
      filterYear: { min: 1990, max: currentDate('YYYY') },
      filterKM: { min: 0, max: 200000 }
    };
  }

  componentDidMount = () => {
    this.props.showBrand();
    this.props.showWilayah();
  };

  subBrand = idBrand => {
    this.setState({ brand: idBrand });
    idBrand && this.props.showMerk(idBrand);
  };

  subModel = idSubModel => {
    this.setState({ groupModel: idSubModel });
    idSubModel && this.props.showType(idSubModel);
  };

  model = idModel => {
    this.setState({ model: idModel });
  };

  handleOk = () => {
    const { brand, groupModel, model, filterPrice, filterKM, filterYear, wilayah } = this.state;
    const { history } = this.props;
    history.push(
      `/search?brand=${brand || ''}&group_model=${groupModel || ''}&model=${model ||
        ''}&wilayah=${wilayah || ''}&hargaawal=${filterPrice.min}&hargaakhir=${
        filterPrice.max
      }&kiloawal=${filterKM.min}&kiloakhir=${filterKM.max}&tahunawal=${filterYear.min}&tahunakhir=${
        filterYear.max
      }`
    );
    this.props.showFilter(false);
  };

  handleCancel = () => {
    this.props.showFilter(false);
  };

  render() {
    const { Filter } = this.props;
    const { brand, groupModel, model, filterPrice, filterYear, filterKM, wilayah } = this.state;
    const data = Filter.showFilterModal || null;
    return (
      <div>
        <Modal
          title="CARI MOBIL"
          visible={data}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className="search-popup"
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              {`Batal`}
            </Button>,
            <Button htmlType="submit" key="submit" type="primary" onClick={this.handleOk}>
              {`Cari`}
            </Button>
          ]}
        >
          <div className="row">
            <div className="col-md-12 bg-img-search">
              <img src="/public/img/djublee-car.png" alt="djublee-car" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p className="field-title">Merk</p>
              <Select
                style={{ width: '100%' }}
                placeholder="Pilih Merk"
                name="brand"
                className="mb-3"
                onChange={this.subBrand}
                value={brand}
              >
                <Options value="" selected="selected" disabled="true">
                  {'--Please Merk--'}
                </Options>
                {Filter.brand &&
                  Filter.brand.map(items => (
                    <Options key={items.id} value={items.id}>
                      {items.name}
                    </Options>
                  ))}
              </Select>
              <p className="field-title">Group Model</p>
              <Select
                style={{ width: '100%' }}
                placeholder="Pilih Group Model"
                name="group_model"
                onChange={this.subModel}
                className="mb-3"
                value={groupModel}
              >
                <Options value="" selected="selected" disabled="true">
                  {'--Please Group Model--'}
                </Options>
                {Filter.merk &&
                  Filter.merk.map(items => (
                    <Options key={items.id} value={items.id}>
                      {items.name}
                    </Options>
                  ))}
              </Select>
              <p className="field-title">Model</p>
              <Select
                style={{ width: '100%' }}
                name="model"
                onChange={this.model}
                placeholder="Pilih Model"
                className="mb-3"
                value={model}
              >
                {Filter.model &&
                  Filter.model.map(items => (
                    <Options key={items.id} value={items.id}>
                      {items.name}
                    </Options>
                  ))}
              </Select>
              <p className="field-title">Wilayah</p>
              <Select
                style={{ width: '100%' }}
                name="wilayah"
                value={wilayah}
                onChange={val => this.state({ wilayah: val.target.value })}
                placeholder="Pilih Wilayah"
                className="mb-3"
              >
                {Filter.wilayah &&
                  Filter.wilayah.map(items => (
                    <Options key={items.id} value={items.id}>
                      {items.name}
                    </Options>
                  ))}
              </Select>
            </div>
            <div className="col-md-6" style={{ marginTop: '5.25rem' }}>
              <p className="mt-2 field-title">Harga</p>
              <div className="range-box rangeslider mt-4 mb-4 col-md-12">
                <InputRange
                  formatLabel={val => formatCurrency(val)}
                  maxValue={1000000000}
                  minValue={0}
                  value={filterPrice}
                  step={500}
                  onChange={val => this.setState({ filterPrice: val })}
                />
              </div>
              <p className="mt-1 field-title">Tahun</p>
              <div className="range-box mt-4 mb-4 col-12">
                <InputRange
                  maxValue={currentDate('YYYY')}
                  minValue={1990}
                  value={filterYear}
                  step={1}
                  onChange={val => this.setState({ filterYear: val })}
                />
              </div>
              <p className="mt-1 field-title">Km</p>
              <div className="range-box mt-4 mb-4 col-12">
                <InputRange
                  formatLabel={val => formatCurrency(val, '')}
                  maxValue={200000}
                  minValue={0}
                  value={filterKM}
                  step={1}
                  onChange={val => this.setState({ filterKM: val })}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

SearchModal.propTypes = {
  Filter: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  showBrand: PropTypes.func.isRequired,
  showMerk: PropTypes.func.isRequired,
  showType: PropTypes.func.isRequired,
  showWilayah: PropTypes.func.isRequired,
  showFilter: PropTypes.func.isRequired
};

function mapStateToProps({ Filter }) {
  return { Filter };
}

export default connect(
  mapStateToProps,
  { showMerk, showBrand, showType, showWilayah, showFilter }
)(withRouter(SearchModal));
