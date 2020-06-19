import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { filterByModel } from '../../actions/filterAction';

class FilterModel extends Component {
  handleClick = modelId => {
    this.props.filterByModel(modelId);
  };

  render() {
    const { byMerk, byGroupModel } = this.props.Filter;
    const res = this.props.ProductReducer;
    const models = res.listModel ? res.listModel : [];
    return (
      <div>
        <h5 className="product-filter-label mb-3">
          <strong>MODEL</strong>
        </h5>
        <ul className="filter">
          {models.map(model => (
            <li key={model.id}>
              <Link
                to={{
                  search: `brand=${byMerk}&group_model=${byGroupModel}&model=${model.id}`
                }}
                onClick={() => this.handleClick(model.id)}
              >
                {model.name}
              </Link>
            </li>
          ))}
        </ul>
        <hr />
      </div>
    );
  }
}
FilterModel.propTypes = {
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired,
  Filter: PropTypes.objectOf(PropTypes.any).isRequired,
  filterByModel: PropTypes.func.isRequired
};

function mapStateToProps({ Filter, ProductReducer }) {
  return { Filter, ProductReducer };
}
export default connect(
  mapStateToProps,
  { filterByModel }
)(withRouter(FilterModel));
