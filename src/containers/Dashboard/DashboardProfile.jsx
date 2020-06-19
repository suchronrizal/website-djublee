import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import Sidebar from '../../components/sidebar';
import { getMyProfileDataAction, postMyProfileUserAction } from '../../actions/profileAction';

const { TextArea } = Input;
const { MonthPicker } = DatePicker;
const monthFormat = 'YY/MM';

class DashboardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      loadingSubmit: false
    };
  }

  componentDidMount() {
    this.props.getMyProfileDataAction();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = values;
        this.props.postMyProfileUserAction(data);
        this.setState({
          loadingSubmit: true
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target.value;
    this.setState(prevState => {
      const confirm = { ...(prevState.confirmDirty || !!value) };
      return { confirm };
    });
  };

  compareToFirstPassword = (value, callback) => {
    const { form } = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (value, callback) => {
    const { form } = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmNewPassword'], { force: true });
    }
    callback();
  };

  render() {
    const { loadingSubmit } = this.state;
    const { myUserData } = this.props.ProfileReducer;
    const detail = myUserData || {};
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div className="container marketing profile-dashboard">
        <div className="page">
          <div className="row">
            <div className="col-md-3">
              <Sidebar
                name={detail.name}
                email={detail.email}
                image={detail.link}
                activeSidebar="my-profile"
              />
            </div>
            <div className="col-md-9">
              <p className="page-title">UBAH PROFIL</p>
              <Form onSubmit={this.handleSubmit} className="profile-form">
                <Form.Item {...formItemLayout} style={{ display: 'none' }}>
                  {getFieldDecorator('id', {
                    initialValue: detail.id
                  })(<Input />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Nama">
                  {getFieldDecorator('userName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your name!'
                      }
                    ],
                    initialValue: detail.name
                  })(<Input />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="E-mail">
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!'
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!'
                      }
                    ],
                    initialValue: detail.email
                  })(<Input />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="No Telepon">
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                    initialValue: detail.phone
                  })(<InputNumber style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Alamat 1 [Utama]">
                  {getFieldDecorator('mainAddress', {
                    rules: [{ required: true, message: 'Please input your address!' }],
                    initialValue: detail.address
                  })(<TextArea rows={4} style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Alamat 2">
                  {getFieldDecorator('secondAddress', {
                    initialValue: detail.other_address
                  })(<TextArea rows={4} style={{ width: '100%' }} />)}
                </Form.Item>
                <p className="page-subtitle">UBAH INFORMASI KARTU KREDIT</p>
                <Form.Item {...formItemLayout} label="Nomor Kartu Kredit">
                  {getFieldDecorator('noCreditCard', {
                    rules: [{ required: true, message: 'Please input your credit card number!' }],
                    initialValue: detail.credit_card ? detail.credit_card.card_number : null
                  })(<InputNumber style={{ width: '100%' }} />)}
                </Form.Item>
                <div className="row">
                  <div className="col-md-4">
                    <Form.Item label="Tanggal Kadaluarsa">
                      {getFieldDecorator('expCreditCard', {
                        rules: [{ type: 'object', required: true, message: 'Please select date!' }],
                        initialValue: moment('2018/01', monthFormat)
                      })(<MonthPicker format={monthFormat} style={{ width: '100%' }} />)}
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <Form.Item label="CVV">
                      {getFieldDecorator('cvv', {
                        rules: [
                          { required: true, message: 'Please input your cvv!' },
                          { len: 3, message: 'Must 3 digits!' }
                        ]
                      })(<Input style={{ width: '100%' }} />)}
                    </Form.Item>
                  </div>
                </div>
                <p className="page-subtitle">UBAH KATA SANDI</p>
                <Form.Item {...formItemLayout} label="Password Lama">
                  {getFieldDecorator('oldPassword')(<Input type="password" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Password Baru">
                  {getFieldDecorator('newPassword', {
                    rules: [
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(<Input type="password" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Konfirmasi Password Baru">
                  {getFieldDecorator('confirmNewPassword', {
                    rules: [
                      {
                        validator: this.compareToFirstPassword
                      }
                    ]
                  })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loadingSubmit}
                    className="save-button"
                  >
                    {`Simpan`}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const DashboardProfile = Form.create({ name: 'register' })(DashboardForm);

function mapStateToProps({ ProfileReducer }) {
  return { ProfileReducer };
}

export default connect(
  mapStateToProps,
  { getMyProfileDataAction, postMyProfileUserAction }
)(DashboardProfile);
