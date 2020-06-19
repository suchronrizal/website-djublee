import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, Spin } from 'antd';
import { listBuyByType } from '../../../../actions/transAction';
import { formatDate, formatCurrency } from '../../../../components/helpers/commons';

class ListTableBuy extends Component {
  componentDidMount = () => {
    const { search } = this.props.location;
    const val = new URLSearchParams(search);
    const params = `model=${val.get('model')}&year=${val.get('tahunawal')}`;
    this.props.listBuyByType(params);
  };

  render() {
    const { Trans } = this.props;
    const listDetail = Trans.listBuyByType || [];
    const columns = [
      {
        sorter: true,
        dataIndex: 'name',
        key: 'name'
      },
      {
        dataIndex: 'date',
        key: 'date'
      },
      {
        dataIndex: 'price',
        key: 'price'
      }
    ];
    const data = [];
    listDetail.map(val =>
      data.push({
        key: val.id,
        name: (
          <div className="media">
            <img
              src={(val.customer && val.customer.link) || 'https://via.placeholder.com/150'}
              className="rounded-circle mr-2"
              alt="cutomerImg"
              style={{ width: '40px', height: '40px' }}
            />
            <span className="mt-2">{val.customer && val.customer.name}</span>
          </div>
        ),
        date: formatDate(val.updatedAt),
        price: formatCurrency(val.transaction_total || 0)
      })
    );
    return (
      <div>
        {Trans.loading ? (
          <Spin tip="Loading..." />
        ) : (
          <Table
            dataSource={data}
            loading={Trans.loading}
            columns={columns}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 240 }}
            className="listing-table"
          />
        )}
      </div>
    );
  }
}
ListTableBuy.propTypes = {
  listBuyByType: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  Trans: PropTypes.objectOf(PropTypes.any).isRequired
};
function mspStateToProps({ Trans }) {
  return { Trans };
}
export default connect(
  mspStateToProps,
  { listBuyByType }
)(withRouter(ListTableBuy));
