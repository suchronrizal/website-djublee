import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import Penjualan from './components/Penjualan';
import Pembelian from './components/Pembelian';

const TabsPane = Tabs.TabPane;

class MyTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'Penjualan'
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { path } = this.props.match;
    if (path === '/penjualan') {
      this.setState({ activeTab: 'Penjualan' });
    } else {
      this.setState({ activeTab: 'Pembelian' });
    }
  }

  callback = activeTab => {
    this.setState({ activeTab });
    if (activeTab === 'Penjualan') {
      this.props.history.push('/penjualan');
    } else {
      this.props.history.push('/pembelian');
    }
  };

  render() {
    const { activeTab } = this.state;
    return (
      <div className="mt-5">
        <div className="container">
          <div className="row">
            <h4 className="product-header mt-3">{activeTab}</h4>
            <div className="col-md-12" id="transactionBox">
              <Tabs
                activeKey={activeTab}
                onChange={this.callback}
                tabBarStyle={{ color: '#00967e' }}
              >
                <TabsPane tab="Penjualan" key="Penjualan">
                  <Penjualan />
                </TabsPane>
                <TabsPane tab="Pembelian" key="Pembelian">
                  <Pembelian />
                </TabsPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyTransaction.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired
};
function mapStateToProps({ Trans }) {
  return { Trans };
}
export default connect(
  mapStateToProps,
  null
)(withRouter(MyTransaction));
