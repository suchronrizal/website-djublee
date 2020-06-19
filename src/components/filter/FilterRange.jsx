import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import { currentDate, formatCurrency } from '../helpers/commons';

class FilterRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterPrice: { min: 0, max: 5000000000 },
      filterYear: { min: 1990, max: currentDate('YYYY') },
      filterKM: { min: 0, max: 300000 }
    };
  }

  handlePrice = val => {
    this.setState({ filterPrice: val });
    const { byMerk, byGroupModel, byModel, byWilayah } = this.props.ProductReducer;
    const { history } = this.props;
    history.push({
      search: `brand=${byMerk}&group_model=${byGroupModel}&model=${byModel}&wilayah=${byWilayah}&hargaawal=${val.min ||
        0}&hargaakhir=${val.max || 5000000000}`
    });
  };

  handleYears = val => {
    this.setState({ filterYear: val });
    const { byMerk, byGroupModel, byModel, byWilayah } = this.props.ProductReducer;
    const { history } = this.props;
    history.push({
      search: `brand=${byMerk}&group_model=${byGroupModel}&model=${byModel}&wilayah=${byWilayah}&hargaawal=${val.min ||
        0}&hargaakhir=${val.max || 5000000000}&tahunawal=${val.min}&tahunakhir=${val.max}`
    });
  };

  handleKilo = val => {
    this.setState({ filterKM: val });
    const { byMerk, byGroupModel, byModel, byWilayah } = this.props.ProductReducer;
    const { history } = this.props;
    history.push({
      search: `brand=${byMerk}&group_model=${byGroupModel}&model=${byModel}&wilayah=${byWilayah}&hargaawal=${val.min ||
        0}&hargaakhir=${val.max || 5000000000}&tahunawal=${val.min}&tahunakhir=${
        val.max
      }&kiloawal=${val.min}&kiloakhir=${val.max}`
    });
  };

  render() {
    return (
      <div>
        <h5 className="product-filter-label mb-3">
          <strong>HARGA</strong>
        </h5>
        <div className="range-box rangeslider col-12">
          <InputRange
            formatLabel={val => `${formatCurrency(val)}`}
            maxValue={5000000000}
            minValue={0}
            value={this.state.filterPrice}
            step={500}
            onChange={val => this.handlePrice(val)}
          />
        </div>
        <hr />
        <h5 className="product-filter-label mb-3">
          <strong>TAHUN</strong>
        </h5>
        <div className="range-box col-12">
          <InputRange
            maxValue={currentDate('YYYY')}
            minValue={1990}
            value={this.state.filterYear}
            step={1}
            onChange={val => this.handleYears(val)}
          />
        </div>
        <hr />
        <h5 className="product-filter-label mb-3">
          <strong>KM</strong>
        </h5>
        <div className="range-box col-12">
          <InputRange
            formatLabel={val => formatCurrency(val, '')}
            maxValue={300000}
            minValue={0}
            value={this.state.filterKM}
            step={1}
            onChange={val => this.handleKilo(val)}
          />
        </div>
      </div>
    );
  }
}

FilterRange.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired
};

function mapStateToProps({ ProductReducer }) {
  return { ProductReducer };
}
export default connect(
  mapStateToProps,
  {}
)(withRouter(FilterRange));
