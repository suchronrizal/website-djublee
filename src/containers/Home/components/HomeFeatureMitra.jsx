import React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { getMitraAction } from '../../../actions/mitraAction';
import { SlickSettings } from '../../../components/helpers/slick';
import { setBgImage, setSlug } from '../../../components/helpers/commons';

class MitraFeatured extends React.Component {
  componentDidMount = () => {
    this.props.getMitraAction();
  };

  render() {
    const { list, loading } = this.props.MitraReducer;
    const settings = SlickSettings;
    const Mitra = () => (
      <div>
        <div className="mb-5">
          <h4 className="product-header">PRODUK PILIHAN MITRA DJUBLEE</h4>
        </div>
        <Slider {...settings}>
          {list &&
            list.map(mitra => (
              <div className="text-center slick-box" key={mitra.id}>
                <div
                  className="img-thumbnail mb-3 mx-auto"
                  style={setBgImage(mitra.image)}
                  width="140"
                >
                  <p style={{ marginTop: '160px' }}>
                    <Link
                      to={`/mitra/${mitra.id}/${setSlug(mitra.name)}`}
                      style={{ fontSize: '20px' }}
                    >
                      {mitra.name}
                    </Link>
                  </p>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    );
    return (
      <div>
        {loading ? (
          <div className="row text-center">
            <div className="col-md-12">
              <Spin tip="Loading..." />
            </div>
          </div>
        ) : (
          <Mitra />
        )}
      </div>
    );
  }
}

MitraFeatured.propTypes = {
  getMitraAction: PropTypes.func.isRequired,
  MitraReducer: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getMitraAction: () => dispatch(getMitraAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MitraFeatured);
