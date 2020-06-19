import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductSearchGroupByParamsAction } from '../../../actions/productAction';
import { formatDate, formatCurrency, setBgImage, setSlug } from '../../../components/helpers/commons';
import FilterBrand from '../../../components/filter/filterBrand';
import FilterMerk from '../../../components/filter/filterMerk';
import FilterModel from '../../../components/filter/filterModel';
import FilterCity from '../../../components/filter/filterCity';
import FilterRange from '../../../components/filter/filterRange';

class AllProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  setBgImage(url) {
    return { backgroundImage: "url("+url+")" }
  }

  componentDidMount(){
    let q = `brand=&group_model=&model=&wilayah&exterior_color&interior_color&page=1`;
    // console.log(q);
    this.props.getProductSearchGroupByParamsAction(q);
  }

  render() {
    let data = (this.props.ProductReducer) ? this.props.ProductReducer.listSearchGroupByParams : [];
    // console.log(data);
    return (
    <div className="container">
      <div className="page">
        <div className="mb-5">
          <div className="row">
            <h2 className="product-header col-md-6">All Products</h2>
            <nav aria-label="Page navigation" className="col-md-6">
              <ul className="pagination" style={{ float: "right" }}>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <hr />
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="mb-2">
              {/* filter by city */}
              <FilterCity />
              {/* filter by range */}
              <FilterRange />
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
            {(data) ?
              data.map((dt, i) => 
              <div className="col-md-3 text-center mb-3" key={i}>
              <div className="product-box">
              <Link to={`/product?brand=${dt.brand}&group_model=${dt.groupModel}&model=${dt.model}&tahun=${formatDate(dt.product_year_build, 'YYYY')}`}>
                <div className="bg-image rounded mb-3" style={this.setBgImage(dt.link)}></div>
                <h2 className="text-left product-title">{dt.brandName+' '+dt.groupModelName+' '+dt.modelName} <br /><small>{formatDate(dt.product_year_build, 'YYYY')}</small></h2>
                <p className="text-left" style={{marginBottom:'3px'}}>
                <span className="product-info">
                    <span className="product-label">Harga Jual</span>
                    <span className="product-price">{formatCurrency(dt.lowest_price)}</span>
                </span>
                </p>
                <p className="text-left">
                  <span className="product-info">
                    <span className="product-label">Transaksi Terakhir</span>
                    <span className="product-price">{formatCurrency(dt.last_transaction)}</span>
                  </span>
                </p>
                </Link>
                {/* <a className="btn bg-green btn-beli" href="/beli">Beli</a> <a className="btn bg-yellow btn-tawar" href="/beli">Tawar</a> */}
              </div>
            </div>
          ) 
              : null }
            </div>
          </div>
        </div>
     </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  getProductSearchGroupByParamsAction: (q) => dispatch(getProductSearchGroupByParamsAction(q))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);