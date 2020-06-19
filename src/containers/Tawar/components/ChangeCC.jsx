import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeCC } from '../../../actions/tawarAction';

class ChangeCC extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeCC = () => {
    // const {} = this.state;
    this.props.changeCC();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="form-group row col-6 mt-1">
          <div className="col-sm-12">
            <input
              type="text"
              className="form-control"
              name="card_number"
              placeholder="Nomor Kartu kredit"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group row col-6">
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              name="date"
              placeholder="Tanggal Kadaluarsa"
              onChange={this.handleChange}
            />
          </div>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              name="vcc"
              placeholder="VCC"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group row col-6">
          <div className="col-sm-12">
            <input
              type="button"
              className="btn bg-yellow col-sm-12"
              value="SIMPAN"
              onClick={e => this.changeCC(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}
ChangeCC.propTypes = {
  changeCC: PropTypes.func.isRequired
};
function mapStateToProps({ Tawar }) {
  return { Tawar };
}
export default connect(
  mapStateToProps,
  { changeCC }
)(ChangeCC);
