/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Form, Input, Button, InputNumber, Icon, Modal, Upload } from 'antd';
import Sidebar from '../../components/sidebar';
// import { setBgImage, formatCurrency } from '../../components/helpers/commons';

const { TextArea } = Input;

class MitraForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      previewVisible: false,
      previewImage: '',
      fileList: {
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target.value;
    const confirmDirty = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList } = this.state;
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

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="container marketing profile-dashboard">
        <div className="page">
          <div className="row">
            <div className="col-md-3">
              <Sidebar activeSidebar="request-mitra" />
            </div>
            <div className="col-md-9">
              <p className="page-title">REQUEST MITRA</p>
              <Form onSubmit={this.handleSubmit} className="profile-form">
                <Form.Item {...formItemLayout} label="UPLOAD FOTO DAN LOGO MITRA">
                  <div className="dropbox">
                    {getFieldDecorator('dragger', {
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile
                    })(
                      <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        // fileList={fileList}
                        setFieldsValue={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        name="files"
                      >
                        {fileList.length >= 3 ? null : uploadButton}
                      </Upload>
                    )}
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                </Form.Item>
                <Form.Item {...formItemLayout} label="Nama Mitra">
                  {getFieldDecorator('userNameMitra', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your mitra name!'
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="No Telepon Mitra">
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Please input your phone number!' }]
                  })(<InputNumber style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Alamat Mitra">
                  {getFieldDecorator('mainAddress', {
                    rules: [{ required: true, message: 'Please input your address!' }]
                  })(<TextArea rows={4} style={{ width: '100%' }} />)}
                </Form.Item>
                <p className="page-subtitle">PIC MITRA</p>
                <Form.Item {...formItemLayout} label="Nama">
                  {getFieldDecorator('userPicMitra', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your PIC name!'
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="No Telepon">
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Please input your phone number!' }]
                  })(<InputNumber style={{ width: '100%' }} />)}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" className="save-button" value="Simpan" />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const DashboardMitra = Form.create({ name: 'register' })(MitraForm);

export default DashboardMitra;
