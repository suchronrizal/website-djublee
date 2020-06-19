import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showFilter } from '../../../actions/filterAction';

class HomeBannerSearch extends Component {
  showFilter = () => {
    this.props.showFilter(true);
  };

  render() {
    return (
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="third-slide" src="/public/img/banner-bg.png" alt="slide" />
            <div className="container">
              <div className="carousel-caption text-center" id="search-box">
                <h1 className="mb-4">Jual Beli Mobil Bekas</h1>
                <button
                  type="button"
                  onClick={this.showFilter}
                  className="btn bg-green my-2 my-sm-0 col-md-3 ml-auto"
                >
                  {`Cari`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
HomeBannerSearch.propTypes = {
  showFilter: PropTypes.func.isRequired
};

export default connect(
  null,
  { showFilter }
)(HomeBannerSearch);
