import React from 'react';

class ProductStar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  setBgImage = url => {
    return { backgroundImage: `url(${url})`}
  };

  render() {
    return (
      <div>
        <div className="mb-5">
          <h2 className="product-header">SUPER CARS <a className="" href="/products">See All</a></h2>
        </div>
        <div className="row">
          <div className="col-md-3 text-center">
            <div className="product-box" onClick={() => (window.location.href = '/product-detail')}>
              <span className="product-sticky-label">
                {`100 listing`}
                <br />
                {`150 penawar`}
              </span>
              <div className="bg-image rounded mb-3" style={this.setBgImage('img/car-1.png')} />
              <h2 className="text-left product-title">
                {`Wuling Cortez 1.5`} 
                <br />
                <small>2018</small>
              </h2>
              <p className="text-left">
                {`Harga Jual Terendah`}
                <br />
                <span className="product-price">Rp 194.000.000</span>
                <br />
                {`Harga Tawar Tertinggi`}
                <br />
                <span className="product-sell">Rp 194.000.000</span>
                <br />
              </p>
            </div>
          </div>
          {/* <!-- /.col-md-3 --> */}
          <div className="col-md-3 text-center">
            <div className="product-box" onClick={() => (window.location.href = '/product-detail')}>
              <span className="product-sticky-label">
                100 listing <br />
                150 penawar
              </span>
              <div className="bg-image rounded mb-3" style={this.setBgImage('img/car-1.png')}></div>
              <h2 className="text-left product-title">Wuling Cortez 1.5 <br /><small>2018</small></h2>
              <p className="text-left">
                Harga Jual Terendah<br />
                <span className="product-price">Rp 194.000.000</span> <br />
                Harga Tawar Tertinggi <br />
                <span className="product-sell">Rp 194.000.000</span> <br />
              </p>
            </div>
          </div>
          {/* <!-- /.col-md-3 --> */}
          <div className="col-md-3 text-center">
            <div className="product-box" onClick={() => window.location.href='/product-detail'}>
              <span className="product-sticky-label">
                100 listing <br />
                150 penawar
              </span>
              <div className="bg-image rounded mb-3" style={this.setBgImage('img/car-1.png')}></div>
              <h2 className="text-left product-title">Wuling Cortez 1.5 <br /><small>2018</small></h2>
              <p className="text-left">
                Harga Jual Terendah<br />
                <span className="product-price">Rp 194.000.000</span> <br />
                Harga Tawar Tertinggi <br />
                <span className="product-sell">Rp 194.000.000</span> <br />
              </p>
            </div>
          </div>
          {/* <!-- /.col-md-3 --> */}
          <div className="col-md-3 text-center">
            <div className="product-box" onClick={() => window.location.href='/product-detail'}>
              <span className="product-sticky-label">
                100 listing <br />
                150 penawar
              </span>
              <div className="bg-image rounded mb-3" style={this.setBgImage('img/car-1.png')}></div>
              <h2 className="text-left product-title">Wuling Cortez 1.5 <br /><small>2018</small></h2>
              <p className="text-left">
                Harga Jual Terendah<br />
                <span className="product-price">Rp 194.000.000</span> <br />
                Harga Tawar Tertinggi <br />
                <span className="product-sell">Rp 194.000.000</span> <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductStar;