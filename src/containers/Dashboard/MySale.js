import React from 'react';
import Sidebar from '../../components/sidebar';
import { setBgImage, formatCurrency } from '../../components/helpers/commons';

class MySale extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container marketing">
        <div className="page">
          <div className="row">
            <div className="col-md-3">
              <Sidebar activeSidebar="my-sale" />
            </div>
            <div className="col-md-9">
              <div className="row mb-4">
                <div className="profile-label col-12">
                  <div className="form-group">
                    <h4><strong>Jualan Anda</strong></h4>
                    <a href="#add"><i className="fas fa-plus-circle"></i> Ingin jual mobil lagi?</a>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className="product-box" onClick={() => window.location.href='/product-detail'}>
                    <div className="bg-image rounded mb-3" style={setBgImage("../img/car-1.png")}></div>
                    <h2 className="text-left product-title">Wuling Cortez 1.5 <br /><small>2018</small></h2>
                    <p className="text-left">
                      <span className="product-price">{formatCurrency(196000000)}</span> <br />
                      <i className="total-bid far fa-user"></i> 3 Penawaran
                    </p>
                  </div>
                </div>
                {/* <!-- /.col-md-3 --> */}
                <div className="col-md-4 text-center">
                  <div className="product-box" onClick={() => window.location.href='/product-detail'}>
                    <div className="bg-image rounded mb-3" style={setBgImage("../img/car-1.png")}></div>
                    <h2 className="text-left product-title">Wuling Cortez 1.5 <br /><small>2018</small></h2>
                    <p className="text-left">
                      <span className="product-price">{formatCurrency(196000000)}</span> <br />
                      <i className="total-bid far fa-user"></i> 1 Penawaran
                    </p>
                  </div>
                </div>
                {/* <!-- /.col-md-3 --> */}
                <div className="col-md-4 text-center">
                  <div className="product-box" onClick={() => window.location.href='/product-detail'}>
                    <div className="bg-image rounded mb-3" style={setBgImage("../img/car-1.png")}></div>
                    <h2 className="text-left product-title">Wuling Cortez 1.5 <br /><small>2018</small></h2>
                    <p className="text-left">
                      <span className="product-price">{formatCurrency(196000000)}</span> <br />
                      <i className="total-bid far fa-user"></i> 1 Penawaran
                    </p>
                  </div>
                </div>
                {/* <!-- /.col-md-3 --> */}
              </div>
            </div>
        </div>
      </div>
    </div>
    );
  }
}

export default MySale;