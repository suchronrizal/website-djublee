import React, { Component } from 'react';
import { Tabs } from 'antd';
import Penawaran from './components/ListTableBids';
import Pembelian from './components/ListTableBuy';

const TabsPane = Tabs.TabPane;

class ListingPenawaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Penawaran'
    };
  }

  callback = key => {
    this.setState({
      title: key
    });
  };

  render() {
    const { title } = this.state;
    return (
      <div className="productDetail">
        <div className="container">
          <div className="row product-detail-header mb-5">
            <h2 className="text-left product-title">{`Data ${title}`}</h2>
            <div className="col-md-12">
              <Tabs
                defaultActiveKey="Penawaran"
                onChange={this.callback}
                tabBarStyle={{ color: '#00967e' }}
              >
                <TabsPane tab="Penawaran" key="Penawaran">
                  <Penawaran />
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

export default ListingPenawaran;
