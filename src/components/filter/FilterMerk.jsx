import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductMerkAction, getProductModelAction } from '../../actions/productAction';
import { filterByGroupModel } from '../../actions/filterAction';

class FilterMerk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merkId: this.props.groupModel
    };
  }

  handleMerk = merkId => {
    this.setState({ merkId });
    this.props.filterByGroupModel(merkId);
    merkId && this.props.getProductModelAction(merkId);
  };

  render() {
    const { merkId } = this.state;
    const { byMerk } = this.props.Filter;
    const res = this.props.ProductReducer;
    const merks = (res.listMerk && res.listMerk.data) || [];
    return (
      <div>
        <h5 className="product-filter-label mb-3">
          <strong>Group Model</strong>
        </h5>
        <ul className="filter">
          {merks.map(merk => (
            <li key={merk.id}>
              <Link
                className={merkId === merk.id ? 'active' : ``}
                to={{
                  search: `brand=${byMerk}&group_model=${merk.id}`
                }}
                onClick={() => this.handleMerk(merk.id)}
              >
                {merk.name}
              </Link>
            </li>
          ))}
        </ul>
        <hr />
      </div>
    );
  }
}

FilterMerk.propTypes = {
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired,
  Filter: PropTypes.objectOf(PropTypes.any).isRequired,
  filterByGroupModel: PropTypes.func.isRequired,
  getProductModelAction: PropTypes.func.isRequired,
  groupModel: PropTypes.string.isRequired
};

function mapStateToProps({ Filter, ProductReducer }) {
  return { Filter, ProductReducer };
}

export default connect(
  mapStateToProps,
  { getProductMerkAction, filterByGroupModel, getProductModelAction }
)(withRouter(FilterMerk));
