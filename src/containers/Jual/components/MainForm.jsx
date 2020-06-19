import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Select, Button, Upload, Icon, Modal, Input, InputNumber, Checkbox, Form } from 'antd';
import { swal } from 'react-redux-sweetalert';
import { withRouter } from 'react-router-dom';
import {
  getProductBrandAction,
  getProductMerkAction,
  getProductModelAction,
  getProductExteriorColorAction,
  getProductInteriorColorAction,
  getProductWilayahAction
} from '../../../actions/productAction';
import { jualAction } from '../../../actions/transAction';
import { formatCurrency, formatNumber } from '../../../components/helpers/commons';

const Options = Select.Option;
const tmp = {
  condition: [{ id: 1, name: 'Baru' }, { id: 2, name: 'Bekas' }],
  yearsCreate: ['2011', '2012', '2013', '2014'],
  yearsUsed: ['2011', '2012', '2013', '2014']
};

class JualForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // files: [],
      previewEksterior: false,
      previewImgEksterior: '',
      fileEksterior: [],
      previewInterior: false,
      previewImgInterior: '',
      fileInterior: [],
      previewStnk: false,
      previewImgStnk: '',
      fileStnk: [],
      boxSatu: 'flex',
      boxDua: 'none',
      newOrSecond: 'none',
      //   isRequired: false,
      merk: '',
      groupModel: '',
      model: '',
      warnaEksterior: '',
      warnaInterior: '',
      kondisi: '',
      hargaDiminta: '',
      hargaPembelian: '',
      tahunPemakaian: '',
      tahunPembuatan: '',
      lokasiMobil: '',
      kilometer: '',
      noRangka: '',
      noStnk: '',
      loadingSubmit: false,
      confirmDirty: false
    };
    this.handleState = this.handleState.bind(this);
  }

  componentDidMount = () => {
    const {
      getProductBrandAction,
      getProductExteriorColorAction,
      getProductInteriorColorAction,
      getProductWilayahAction
    } = this.props;
    getProductBrandAction();
    getProductExteriorColorAction();
    getProductInteriorColorAction();
    getProductWilayahAction();
  };

  componentWillReceiveProps = nextProps => {
    const { Trans } = this.props;
    if (nextProps.Trans.success !== Trans.success) {
      this.props.swal({
        title: 'Success',
        type: 'success',
        timer: 3000,
        showConfirmButton: false
      });
      this.props.history.push('/penjualan');
    }
  };

  handleCancelEksterior = () => this.setState({ previewEksterior: false });

  handlePreviewEksterior = file => {
    this.setState({
      previewImgEksterior: file.url || file.thumbUrl,
      previewEksterior: true
    });
  };

  handleChangeEksterior = ({ fileList }) => this.setState({ fileEksterior: fileList });

  handleCancelInterior = () => this.setState({ previewInterior: false });

  handlePreviewInterior = file => {
    this.setState({
      previewImgInterior: file.url || file.thumbUrl,
      previewInterior: true
    });
  };

  handleChangeInterior = ({ fileList }) => this.setState({ fileInterior: fileList });

  handleCancelStnk = () => this.setState({ previewStnk: false });

  handlePreviewStnk = file => {
    this.setState({
      previewImgStnk: file.url || file.thumbUrl,
      previewStnk: true
    });
  };

  handleChangeStnk = ({ fileList }) => this.setState({ fileStnk: fileList });

  // SUBMIT FORM
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(err);
      const intArr = [];
      const extArr = [];
      const stnkArr = [];
      if (values.picinterior) {
        values.picinterior.map(int => intArr.push(int.thumbUrl));
      }
      if (values.piceksterior) {
        values.piceksterior.map(ext => extArr.push(ext.thumbUrl));
      }
      if (values.fotoStnk) {
        values.fotoStnk.map(stnk => stnkArr.push(stnk.thumbUrl));
      }
      if (!err) {
        this.setState({ loadingSubmit: true });
        values.picinterior = intArr;
        values.piceksterior = extArr;
        values.fotoStnk = stnkArr;
        const data = values;
        this.props.jualAction(data);
      }
    });
  };

  nextForm = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(err => {
      if (
        !err.merk &&
        !err.groupModel &&
        !err.model &&
        !err.warnaEksterior &&
        !err.warnaInterior &&
        !err.kondisi
      ) {
        this.setState({
          boxSatu: 'none',
          boxDua: 'block'
        });
        this.props.form.resetFields([
          'hargaDiminta',
          'hargaPembelian',
          'tahunPembuatan',
          'tahunPemakaian',
          'lokasiMobil',
          'kilometer',
          'noRangka',
          'noStnk'
        ]);
      }
    });
  };

  prevForm = e => {
    e.preventDefault();
    this.setState({
      boxSatu: 'flex',
      boxDua: 'none'
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleStateMerk = (e, a) => {
    this.setState({
      merk: a.props.children
    });
    this.props.getProductMerkAction(e);
  };

  handleStateGroupModel = (e, a) => {
    this.setState({
      groupModel: a.props.children
    });
    this.props.getProductModelAction(e);
  };

  handleStateModel = (e, a) => {
    this.setState({
      model: a.props.children
    });
  };

  handleStateWarnaext = (e, a) => {
    this.setState({
      warnaEksterior: a.props.children
    });
  };

  handleStateWarnaint = (e, a) => {
    this.setState({
      warnaInterior: a.props.children
    });
  };

  handleStateKondisi = (e, a) => {
    if (a.props.value === 1) {
      this.setState({ newOrSecond: 'none' });
    } else {
      this.setState({ newOrSecond: 'block' });
    }
    this.setState({
      kondisi: a.props.children
    });
  };

  handleStateWilayah = (e, a) => {
    this.setState({
      lokasiMobil: a.props.children
    });
  };

  handleState = (e, name) => {
    if (name === 'hargaDiminta') {
      this.setState({
        hargaDiminta: e
      });
    } else if (name === 'hargaPembelian') {
      this.setState({
        hargaPembelian: e
      });
    } else if (name === 'tahunPemakaian') {
      this.setState({
        tahunPemakaian: e
      });
    } else if (name === 'tahunPembuatan') {
      this.setState({
        tahunPembuatan: e
      });
    } else if (name === 'kilometer') {
      this.setState({
        kilometer: e.target.value
      });
    } else if (name === 'noRangka') {
      this.setState({
        noRangka: e.target.value
      });
    } else if (name === 'noStnk') {
      this.setState({
        noStnk: e.target.value
      });
    }
  };

  validateToTahunPemakaian = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['tahunPemakaian'], { force: true });
    }
    callback();
  };

  compareToTahunPembuatan = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value < form.getFieldValue('tahunPembuatan')) {
      callback('Tahun pemakaian tidak boleh lebih kecil dari tahun pembuatan');
    } else {
      callback();
    }
  };

  render() {
    const {
      listMerk,
      listModel,
      listBrand,
      listExteriorColor,
      listInteriorColor,
      listWilayah
    } = this.props.ProductReducer;
    const dataMerk = (listMerk !== undefined && listMerk.data) || [];
    const dataModel = (listModel !== undefined && listModel) || [];
    const { getFieldDecorator } = this.props.form;
    const {
      previewEksterior,
      previewImgEksterior,
      fileEksterior,
      previewInterior,
      previewImgInterior,
      fileInterior,
      previewStnk,
      previewImgStnk,
      fileStnk,
      boxSatu,
      boxDua,
      newOrSecond,
      merk,
      groupModel,
      model,
      warnaEksterior,
      warnaInterior,
      kondisi,
      hargaDiminta,
      tahunPemakaian,
      hargaPembelian,
      tahunPembuatan,
      kilometer,
      noRangka,
      lokasiMobil,
      noStnk,
      loadingSubmit
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="container page-jual">
        <Form onSubmit={this.handleSubmit}>
          <div className="row product-detail-header box-1" style={{ display: boxSatu }}>
            <div className="col-md-4">
              <p className="page-title">Jual Mobil</p>
              <p className="section-title">Upload Gambar Eksterior (Maksimal 6)</p>
              <div className="row">
                <div className="col-md-12">
                  {getFieldDecorator('piceksterior', {
                    valuePropName: 'piceksterior',
                    getValueFromEvent: this.normFile
                  })(
                    <Upload
                      listType="picture-card"
                      setFieldsValue={fileEksterior}
                      onPreview={this.handlePreviewEksterior}
                      onChange={this.handleChangeEksterior}
                      name="piceksterior"
                    >
                      {fileEksterior.length >= 6 ? null : uploadButton}
                    </Upload>
                  )}
                  <Modal
                    visible={previewEksterior}
                    footer={null}
                    onCancel={this.handleCancelEksterior}
                  >
                    <img alt="example" style={{ width: '100%' }} src={previewImgEksterior} />
                  </Modal>
                </div>
              </div>
              <p className="section-title mt-3">Upload Gambar Interior (Maksimal 6)</p>
              <div className="row">
                <div className="col-md-12">
                  {getFieldDecorator('picinterior', {
                    valuePropName: 'picinterior',
                    getValueFromEvent: this.normFile
                  })(
                    <Upload
                      listType="picture-card"
                      setFieldsValue={fileInterior}
                      onPreview={this.handlePreviewInterior}
                      onChange={this.handleChangeInterior}
                    >
                      {fileInterior.length >= 6 ? null : uploadButton}
                    </Upload>
                  )}
                  <Modal
                    visible={previewInterior}
                    footer={null}
                    onCancel={this.handleCancelInterior}
                  >
                    <img alt="example" style={{ width: '100%' }} src={previewImgInterior} />
                  </Modal>
                </div>
              </div>
            </div>
            {/* STEP 1 */}
            <div className="col-md-6">
              <div className="row mt-3">
                <div className="col-md-12">
                  <p className="field-title">Merek</p>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('merk', {
                      rules: [{ required: true, message: 'Please select your merk!' }]
                    })(
                      <Select
                        showSearch
                        className="select-field"
                        placeholder="Select a merk"
                        optionFilterProp="children"
                        onChange={this.handleStateMerk}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {(listBrand &&
                          listBrand.map(data => (
                            <Options value={data.id} key={data.idi}>
                              {data.name}
                            </Options>
                          ))) ||
                          ''}
                      </Select>
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <p className="field-title">Group Model</p>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('groupModel', {
                      rules: [{ required: true, message: 'Please select your group model!' }]
                    })(
                      <Select
                        showSearch
                        className="select-field"
                        placeholder="Select a group model"
                        optionFilterProp="children"
                        onChange={this.handleStateGroupModel}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {(dataMerk &&
                          dataMerk.map(data => (
                            <Options value={data.id} key={data.id}>
                              {data.name}
                            </Options>
                          ))) ||
                          ''}
                      </Select>
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <p className="field-title">Model</p>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('model', {
                      rules: [{ required: true, message: 'Please select your model!' }]
                    })(
                      <Select
                        showSearch
                        className="select-field"
                        placeholder="Select a model"
                        optionFilterProp="children"
                        onChange={this.handleStateModel}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {(dataModel &&
                          dataModel.map(data => (
                            <Options value={data.id} key={data.id}>
                              {data.name}
                            </Options>
                          ))) ||
                          ''}
                      </Select>
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <p className="field-title">Warna Eksterior</p>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('warnaEksterior', {
                      rules: [{ required: true, message: 'Please select your warna Eksterior!' }]
                    })(
                      <Select
                        showSearch
                        className="select-field"
                        placeholder="Select a warna Eksterior"
                        optionFilterProp="children"
                        onChange={this.handleStateWarnaext}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {(listExteriorColor &&
                          listExteriorColor.map(data => (
                            <Options value={data.id} key={data.id}>
                              {data.name}
                            </Options>
                          ))) ||
                          ''}
                      </Select>
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <p className="field-title">Warna Interior</p>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('warnaInterior', {
                      rules: [{ required: true, message: 'Please select your warna Interior!' }]
                    })(
                      <Select
                        showSearch
                        className="select-field"
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.handleStateWarnaint}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {(listInteriorColor &&
                          listInteriorColor.map(data => (
                            <Options value={data.id} key={data.id}>
                              {data.name}
                            </Options>
                          ))) ||
                          ''}
                      </Select>
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <p className="field-title">Kondisi</p>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('kondisi', {
                      rules: [{ required: true, message: 'Please select your kondisi!' }]
                    })(
                      <Select
                        showSearch
                        className="select-field"
                        placeholder="Select a kondisi"
                        optionFilterProp="children"
                        onChange={this.handleStateKondisi}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {tmp.condition.map(condition => (
                          <Options key={condition.id} value={condition.id}>
                            {condition.name}
                          </Options>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12" style={{ textAlign: 'center' }}>
                  <Button type="primary next-btn" onClick={this.nextForm}>
                    {`Lanjut`}
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-md-2 section-3">
              <p className="prd-title">Merek</p>
              <p className="prd-desc">{merk || '-'}</p>

              <p className="prd-title">Group Model</p>
              <p className="prd-desc">{groupModel || '-'}</p>

              <p className="prd-title">Model</p>
              <p className="prd-desc">{model || '-'}</p>

              <p className="prd-title">Warna Eksterior</p>
              <p className="prd-desc">{warnaEksterior || '-'}</p>

              <p className="prd-title">Warna Interior</p>
              <p className="prd-desc">{warnaInterior || '-'}</p>

              <p className="prd-title">Kondisi</p>
              <p className="prd-desc">{kondisi || '-'}</p>

              <p className="prd-title">Harga yang diminta</p>
              <p className="prd-desc">{hargaDiminta ? formatCurrency(hargaDiminta) : '-'}</p>

              <p className="prd-title">Harga yang diminta</p>
              <p className="prd-desc">{hargaDiminta ? formatCurrency(hargaDiminta) : '-'}</p>

              <p className="prd-title">Harga Pembelian</p>
              <p className="prd-desc">{hargaPembelian ? formatCurrency(hargaPembelian) : '-'}</p>

              <p className="prd-title">Tahun Pembuatan</p>
              <p className="prd-desc">{tahunPembuatan || '-'}</p>

              <p className="prd-title">Tahun Pemakaian</p>
              <p className="prd-desc">{tahunPemakaian || '-'}</p>

              <p className="prd-title">Lokasi Mobil</p>
              <p className="prd-desc">{lokasiMobil || '-'}</p>

              <p className="prd-title">Kilometer</p>
              <p className="prd-desc">{kilometer ? formatNumber(kilometer) : '-'}</p>

              <p className="prd-title">No. STNK</p>
              <p className="prd-desc">{noStnk || '-'}</p>

              <p className="prd-title">No. Rangka</p>
              <p className="prd-desc">{noRangka || '-'}</p>
            </div>
          </div>
          {/* STEP 2 */}
          <div className="product-detail-header box-2 mt-5" style={{ display: boxDua }}>
            <div className="row product-detail-header">
              <div className="col-md-12">
                <p className="page-title">Jual Mobil</p>
                <p className="page-secondary-title">Informasi Kendaraan</p>
              </div>
            </div>
            <div className="row">
              <div className={newOrSecond === 'none' ? 'col-md-10' : 'col-md-5'}>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <p className="field-title">Harga yang diminta</p>
                    <Form.Item hasFeedback>
                      {getFieldDecorator('hargaDiminta', {
                        rules: [{ required: true, message: 'Please place your harga diminta!' }]
                      })(
                        <InputNumber
                          className="select-field"
                          onChange={e => this.handleState(e, 'hargaDiminta')}
                          formatter={value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\Rp.\s?|(,*)/g, '')}
                        />
                      )}
                    </Form.Item>
                  </div>
                </div>
                <div className="row mt-3" style={{ display: `${newOrSecond}` }}>
                  <div className="col-md-12">
                    <p className="field-title">Harga Pembelian</p>
                    {newOrSecond === 'block' && (
                      <Form.Item hasFeedback>
                        {getFieldDecorator('hargaPembelian', {
                          rules: [{ required: true, message: 'Please place your harga pembelian!' }]
                        })(
                          <InputNumber
                            className="select-field"
                            onChange={e => this.handleState(e, 'hargaPembelian')}
                            formatter={value =>
                              `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }
                            parser={value => value.replace(/\Rp.\s?|(,*)/g, '')}
                          />
                        )}
                      </Form.Item>
                    )}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <p className="field-title">Tahun Pembuatan</p>
                    <Form.Item hasFeedback>
                      {getFieldDecorator('tahunPembuatan', {
                        rules: [
                          {
                            required: true,
                            message: 'Please place your tahun Pembuatan!'
                          },
                          {
                            validator: this.validateToTahunPemakaian
                          }
                        ]
                      })(
                        <Select
                          showSearch
                          className="select-field"
                          placeholder="Select a year"
                          optionFilterProp="children"
                          onChange={e => this.handleState(e, 'tahunPembuatan')}
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {tmp.yearsCreate.map(created => (
                            <Options value={created} key={created}>
                              {created}
                            </Options>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </div>
                </div>
                <div className="row mt-3" style={{ display: `${newOrSecond}` }}>
                  <div className="col-md-12">
                    <p className="field-title">Tahun Pemakaian</p>
                    {newOrSecond === 'block' && (
                      <Form.Item hasFeedback>
                        {getFieldDecorator('tahunPemakaian', {
                          rules: [
                            {
                              required: true,
                              message: 'Please place your tahun Pemakaian!'
                            },
                            {
                              validator: this.compareToTahunPembuatan
                            }
                          ]
                        })(
                          <Select
                            showSearch
                            className="select-field"
                            placeholder="Select a year"
                            optionFilterProp="children"
                            onChange={e => this.handleState(e, 'tahunPemakaian')}
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tmp.yearsUsed.map(use => (
                              <Options value={use}>{use}</Options>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    )}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <p className="field-title">Lokasi Mobil</p>
                    <Form.Item hasFeedback>
                      {getFieldDecorator('lokasiMobil', {
                        rules: [{ required: true, message: 'Please place your lokasi mobil!' }]
                      })(
                        <Select
                          name="lokasiMobil"
                          showSearch
                          className="select-field"
                          placeholder="Select a location"
                          optionFilterProp="children"
                          onChange={this.handleStateWilayah}
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {(listWilayah &&
                            listWilayah.map(data => (
                              <Options value={data.id} key={data.id}>
                                {data.name}
                              </Options>
                            ))) ||
                            ''}
                        </Select>
                      )}
                    </Form.Item>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <Form.Item>
                      {getFieldDecorator('djubleeOffer', {
                        valuePropName: 'checked',
                        initialValue: true
                      })(
                        <Checkbox>
                          {'Saya mau menggunakan'}
                          <a href="/syarat-ketentuan#djublee-offer" target="_blank">
                            {`Djublee Offer`}
                          </a>
                        </Checkbox>
                      )}
                    </Form.Item>
                    <Checkbox>Saya mau request djublee report</Checkbox>
                  </div>
                </div>
              </div>
              <div className="col-md-5" style={{ display: `${newOrSecond}` }}>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <p className="field-title">Kilometer</p>
                    {newOrSecond === 'block' && (
                      <Form.Item hasFeedback>
                        {getFieldDecorator('kilometer', {
                          rules: [{ required: true, message: 'Please place your kilometer!' }]
                        })(
                          <Input
                            name="kilometer"
                            addonAfter="km"
                            placeholder="1.000"
                            onChange={e => this.handleState(e, 'kilometer')}
                          />
                        )}
                      </Form.Item>
                    )}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <p className="field-title">No Rangka</p>
                    {newOrSecond === 'block' && (
                      <Form.Item hasFeedback>
                        {getFieldDecorator('noRangka', {
                          rules: [{ required: true, message: 'Please place your no rangka!' }]
                        })(
                          <Input
                            name="noRangka"
                            placeholder="1.000"
                            onChange={e => this.handleState(e, 'noRangka')}
                          />
                        )}
                      </Form.Item>
                    )}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <p className="field-title">No STNK</p>
                    {newOrSecond === 'block' && (
                      <Form.Item hasFeedback>
                        {getFieldDecorator('noStnk', {
                          rules: [{ required: true, message: 'Please place your no stnk!' }]
                        })(
                          <Input
                            name="noStnk"
                            placeholder="1.000"
                            onChange={e => this.handleState(e, 'noStnk')}
                          />
                        )}
                      </Form.Item>
                    )}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <p className="field-title">Upload Foto STNK</p>
                    <div className="row">
                      <div className="col-md-12">
                        {getFieldDecorator('fotoStnk', {
                          valuePropName: 'fotoStnk',
                          getValueFromEvent: this.normFile
                        })(
                          <Upload
                            action="//jsonplaceholder.typicode.com/posts/"
                            listType="picture-card"
                            fileList={fileStnk}
                            onPreview={this.handlePreviewStnk}
                            onChange={this.handleChangeStnk}
                          >
                            {fileStnk.length >= 2 ? null : uploadButton}
                          </Upload>
                        )}
                        <Modal visible={previewStnk} footer={null} onCancel={this.handleCancelStnk}>
                          <img alt="example" style={{ width: '100%' }} src={previewImgStnk} />
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 section-3">
                <p className="prd-title">Merek</p>
                <p className="prd-desc">{merk || '-'}</p>

                <p className="prd-title">Group Model</p>
                <p className="prd-desc">{groupModel || '-'}</p>

                <p className="prd-title">Model</p>
                <p className="prd-desc">{model || '-'}</p>

                <p className="prd-title">Warna Eksterior</p>
                <p className="prd-desc">{warnaEksterior || '-'}</p>

                <p className="prd-title">Warna Interior</p>
                <p className="prd-desc">{warnaInterior || '-'}</p>

                <p className="prd-title">Kondisi</p>
                <p className="prd-desc">{kondisi || '-'}</p>

                <p className="prd-title">Harga yang diminta</p>
                <p className="prd-desc">{hargaDiminta ? formatCurrency(hargaDiminta) : '-'}</p>

                <p className="prd-title">Harga Pembelian</p>
                <p className="prd-desc">{hargaPembelian ? formatCurrency(hargaPembelian) : '-'}</p>

                <p className="prd-title">Tahun Pembuatan</p>
                <p className="prd-desc">{tahunPembuatan || '-'}</p>

                <p className="prd-title">Tahun Pemakaian</p>
                <p className="prd-desc">{tahunPemakaian || '-'}</p>

                <p className="prd-title">Lokasi Mobil</p>
                <p className="prd-desc">{lokasiMobil || '-'}</p>

                <p className="prd-title">Kilometer</p>
                <p className="prd-desc">{kilometer ? formatNumber(kilometer) : '-'}</p>

                <p className="prd-title">No. STNK</p>
                <p className="prd-desc">{noStnk || '-'}</p>

                <p className="prd-title">No. Rangka</p>
                <p className="prd-desc">{noRangka || '-'}</p>
              </div>
            </div>
            <div className="row" style={{ marginBottom: '10%' }}>
              <div className="col-md-12" style={{ textAlign: 'center' }}>
                <Button className="mr-3 cancel-btn" onClick={this.prevForm}>
                  {`Batal`}
                </Button>
                <Button
                  type="primary next-btn"
                  loading={loadingSubmit}
                  htmlType="submit"
                  onSubmit={this.handleSubmit}
                >
                  {`Jual`}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

JualForm.propTypes = {
  getProductBrandAction: PropTypes.func.isRequired,
  getProductExteriorColorAction: PropTypes.func.isRequired,
  getProductInteriorColorAction: PropTypes.func.isRequired,
  getProductMerkAction: PropTypes.func.isRequired,
  getProductModelAction: PropTypes.func.isRequired,
  getProductWilayahAction: PropTypes.func.isRequired,
  swal: PropTypes.func.isRequired,
  jualAction: PropTypes.func.isRequired,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  ProductReducer: PropTypes.objectOf(PropTypes.any).isRequired,
  Trans: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

const MainForm = Form.create({ name: 'jualform' })(JualForm);

function mapStateToProps({ ProductReducer, Trans }) {
  return { Trans, ProductReducer };
}

export default connect(
  mapStateToProps,
  {
    getProductMerkAction,
    getProductModelAction,
    getProductBrandAction,
    getProductExteriorColorAction,
    getProductInteriorColorAction,
    getProductWilayahAction,
    jualAction,
    swal
  }
)(withRouter(MainForm));
