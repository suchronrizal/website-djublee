import React, { Component } from 'react';
import { Form, Button, Input, InputNumber, Modal, DatePicker } from 'antd';

const confirm = Modal.confirm;

class RuangFormNego extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    showConfirm(){
        confirm({
          title: 'Apa anda yakin mengakhiri ruang nego ini?',
          className: 'end-modal',
          okText: 'Ya',
          cancelText: 'Tidak',
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {},
        });
    }

    acceptConfirm(){
        confirm({
          title: 'Apa anda yakin menerima tawaran ini?',
          className: 'end-modal',
          okText: 'Ya',
          cancelText: 'Tidak',
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {},
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }

    showModal = () => {
        this.setState({
          visible: true,
        });
      }
    
      handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
    
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 24 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 24 },
            },
          };
        return(
            <div className="container page-nego">
                <div className="row product-detail-header">
                    <div className="col-md-12">
                        <p className="page-title">Ruang Nego</p>
                    </div>
                </div>
                <div className="row" style={{paddingLeft:"15px"}}>
                    <div className="col-md-8" style={{border:"1px solid"}}>
                        <div className="row title-container">
                            <div className="col-md-6">
                                <p className="text-title-left">Penawar: 
                                    <span className="title-name">John Doe</span>, Jakarta
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p className="text-title-right" onClick={this.showConfirm}>
                                    Akhiri Nego
                                </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 konten-nego">
                                <div className="row mt-3">
                                    <div className="col-md-12 detail-room">
                                        <p className="chattime-moderator">Ruang nego ini dimoderasi oleh CS Djublee XXX dengan email admin@djublee.com dan nomor HP 08123456789</p>
                                        <p className="chattime-start">05.16</p>
                                    </div>
                                </div>

                                <div className="row mt-3 mb-3 ml-3">
                                    <div className="col-md-1 bg-photo">
                                        
                                    </div>
                                    <div className="col-md-6 ml-3 bg-chat">
                                        <p className="chat-operator">
                                            Operator Message :
                                        </p>
                                        <p>
                                            Selamat datang di ruang nego, silakan masukkan penawaran anda
                                        </p>
                                    </div>
                                    <div className="col-md-1" style={{marginTop:'5%'}}>
                                        <p>05.17</p>
                                    </div>
                                </div>

                                <div className="row mt-3 mb-3 ml-3">
                                    <div className="col-md-1 bg-customer">
                                        
                                    </div>
                                    <div className="col-md-6 ml-3 bg-customer-chat">
                                        <p style={{marginBottom:"0"}}>
                                            Operator Message : Rp. 800.000.000<br/>
                                            Penawaran Berakhir : dd/mm/yy hh:mm<br/>
                                            Comment : Tolong Dilihat
                                        </p>
                                    </div>
                                    <div className="col-md-1" style={{marginTop:'5%'}}>
                                        <p>07.17</p>
                                    </div>
                                </div>

                                <div className="row mt-3 mb-3">
                                    <div className="col-md-6 bg-owner-chat">
                                        <p style={{position:'absolute', marginLeft:'-18%', marginTop:'5%'}}>09.17</p>
                                        <p style={{marginBottom:"0"}}>
                                            Operator Message : Rp. 800.000.000<br/>
                                            Penawaran Berakhir : dd/mm/yy hh:mm<br/>
                                            Comment : Tolong Dilihat
                                        </p>
                                    </div>
                                </div>

                                <div className="row mt-5 mb-2 nego-button">
                                    <div className="col-md-4">
                                        <Button className="button-tawar" onClick={this.showModal}>Tawar Baru</Button>
                                    </div>
                                    <div className="col-md-4">
                                        <Button className="button-neutral">Tidak Berubah</Button>
                                    </div>
                                    <div className="col-md-4">
                                        <Button type="primary button-accept" onClick={this.acceptConfirm}>Terima</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        title="Penawaran Baru Anda"
                        visible={this.state.visible}
                        onOk={this.handleSubmit}
                        onCancel={this.handleCancel}
                        okText="Tawar"
                        cancelText="Batal"
                        >
                        <Form onSubmit={this.handleSubmit} className="form-tawar">
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Item
                                {...formItemLayout}
                                label="Harga Baru"
                                >
                                {getFieldDecorator('price', {
                                    rules: [{
                                    type: 'number', message: 'The input is not a number!',
                                    }, {
                                    required: true, message: 'Please input your price!',
                                    }],
                                })(
                                    <InputNumber style={{width:'100%'}} placeholder="New price"/>
                                )}
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item
                                    {...formItemLayout}
                                    label="Set expiry date"
                                    >
                                    {getFieldDecorator('expiry-date', {
                                        rules: [{ type: 'object', required: true, message: 'Please select time!' }]
                                    })(
                                        <DatePicker format="DD-MM-YYYY" style={{width:'100%'}}/>
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        </Form>
                    </Modal>
                    <div className="col-md-4 product-desc">
                        <div className="row">
                            <div className="col-md-12 mt-5">
                                <img src="http://placehold.jp/24/cccccc/ffffff/250x200.png?text=Product+Image"/>   
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <p className="product-title">Wuling Cortez</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <p className="product-year">2018</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="product-desc-left">Milage</p>
                            </div>
                            <div className="col-md-6">
                                <p className="product-desc-right">35.800 km</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="product-desc-left">Ext. Color</p>
                            </div>
                            <div className="col-md-6">
                                <p className="product-desc-right">Hitam</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="product-desc-left">Int. Color</p>
                            </div>
                            <div className="col-md-6">
                                <p className="product-desc-right">Putih</p>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-12"> 
                                <p className="product-price">Rp. 900.000.000</p>
                                <p className="product-status">Status : Offered</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const RuangNego = Form.create({ name: 'tawar' })(RuangFormNego);

export default RuangNego;