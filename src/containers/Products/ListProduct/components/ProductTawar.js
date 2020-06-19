import React from 'react';

class ProductTawar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
    <div className="page">
      <div className="row product-detail-header">
        <div className="col-md-8 text-center">
          <div>
            <div id="carouselProductDetailIndicators" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselProductDetailIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselProductDetailIndicators" data-slide-to="1"></li>
                <li data-target="#carouselProductDetailIndicators" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="rounded img-fluid" src="img/car-1.png" alt="Generic placeholder image" />
                </div>
                <div className="carousel-item">
                  <img className="rounded img-fluid" src="img/car-1.png" alt="Generic placeholder image" />
                </div>
                <div className="carousel-item">
                  <img className="rounded img-fluid" src="img/car-1.png" alt="Generic placeholder image" />
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselProductDetailIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselProductDetailIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="product-box col-md-6">
              <p className="text-center">
                Harga Jual Terakhir<br />
                <span className="product-price2">Rp 194.000.000</span> <br />
                08 November 2018 <br />
                <span className="product-link cl-soft-blue">LIHAT DATA PENAWARAN</span> <br />
              </p>
            </div>
            <div className="product-box col-md-6">
              <p className="text-center">
                Harga Tawar Tertinggi<br />
                <span className="product-price2">Rp 194.000.000</span> <br />
                08 November 2018 <br />
                <span className="product-link cl-soft-blue">LIHAT DATA PENAWARAN</span> <br />
              </p>
            </div>
          </div>
        </div>
        {/* <!-- /.col-md-3 --> */}
        <div className="col-md-4">
          <h2 className="text-left product-title">Wuling Cortez 1.5 <br /><small>2018</small></h2>
          <div className="product-box-tawar">
            Milage: &ensp;&ensp;&ensp;&ensp;<strong>112.000 km</strong> <br />
            Ext. Color: &nbsp;&nbsp;&nbsp;<strong>Hitam</strong> <br />
            Int. Color: &nbsp;&nbsp;&nbsp;&nbsp;<strong>Hitam</strong> <br />
          </div>
          <div className="product-box mt-3 bg-yellow">
            <p className="text-center cl-dark">
              Tawar
            </p>
          </div>
          <div className="product-box mt-3 bg-green">
            <p className="text-center">
              Beli Sekarang
            </p>
          </div>
          {/* <div className="product-box-tawar mt-5">
            Total: &ensp;&ensp;&ensp;&ensp;<strong>Rp 194.000.000</strong> <br />
            Payment Method: &nbsp;&nbsp;&nbsp;<strong>Cash</strong> <br />
            Shipping Address: &nbsp;&nbsp;&nbsp;<strong>-</strong> <br />
          </div> */}
        </div>  
      </div>

      <div className="row mt-5">
        <h2 className="product-header">Lihat Ulasan (2) </h2>
      </div>
      <hr className="detail-product-line cl-hr-grey"/>
      <div className="row mt-2">
        <div className="col-md-12">
          <div className="row">
            <div className="col-xs-2 col-sm-1">
              <img className="rounded mb-3 img-fluid" src="img/car-1.png" alt="Generic placeholder image" />
            </div>
            <div className="col-xs-10 col-sm-11">
              <span className="text-left user-name">Vanny Olvia </span>
              <span className="text-left user-date">8 Nov 2018 </span><br/>
              <span className="text-left">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </span>
              <p className="user-date">
                Mobilnya bagus
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-2 col-sm-1">
              <img className="rounded mb-3 img-fluid" src="img/car-1.png" alt="Generic placeholder image" />
            </div>
            <div className="col-xs-10 col-sm-11">
              <span className="text-left user-name">Ivan Satya </span>
              <span className="text-left user-date">10 Okt 2018 </span><br/>
              <span className="text-left">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
              </span>
              <p className="user-date">
                Sipppp
              </p>
            </div>
          </div>
        </div>`
      </div>

      {/* <!-- /END THE FEATURETTES --> */}
    </div>
    );
  }
}

export default ProductTawar;