import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { getProductWilayahAction } from '../../actions/productAction';
import { filterByWilayah } from '../../actions/filterAction';

const Options = Select.Option;
class FilterCity extends Component {
  componentDidMount() {
    this.props.getProductWilayahAction();
  }

  handleChange = wilId => {
    const { byMerk, byGroupModel, byModel } = this.props.Filter;
    const { history } = this.props;
    history.push({
      pathname: '/search',
      search: `brand=${byMerk}&group_model=${byGroupModel}&model=${byModel}&wilayah=${wilId}`
    });
    this.props.filterByWilayah(wilId);
  };

  render() {
    const res = this.props.ProductReducer;
    const wilayah = res.listWilayah ? res.listWilayah : [];
    return (
      <div>
        <h5 className="product-filter-label mb-3">
          <strong>WILAYAH</strong>
        </h5>
        <ul className="filter">
          <Select style={{ width: '100%' }} name="wilayah" onChange={e => this.handleChange(e)}>
            {wilayah.map(wil => (
              <Options key={wil.id}>{wil.name}</Options>
            ))}
          </Select>
        </ul>
        <hr />
      </div>
    );
  }
}

FilterCity.propTypes = {
  getProductWilayahAction: PropTypes.func.isRequired,
  filterByWilayah: PropTypes.func.isRequired,
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired,
  Filter: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

function mapStateToProps({ Filter, ProductReducer }) {
  return { Filter, ProductReducer };
}
export default connect(
  mapStateToProps,
  { getProductWilayahAction, filterByWilayah }
)(withRouter(FilterCity));
