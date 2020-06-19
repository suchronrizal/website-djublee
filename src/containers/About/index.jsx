import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const About = () => (
  <div className="container page-about">
    <div className="row">
      <div className="col-md-12">
        <p className="page-title">Hubungi Kami</p>
      </div>
    </div>

    <div className="row mt-2">
      <div className="col-md-6">
        <p style={{ marginBottom: '2.3rem' }}>Tinggalkan pesan, kritik dan saran anda</p>
        <p>
          <Input placeholder="Nama" size="large" />
        </p>
        <p>
          <Input placeholder="Email" size="large" />
        </p>
        <p>
          <Input placeholder="Subjek" size="large" />
        </p>
        <p>
          <TextArea placeholder="Tulis pesan anda..." rows={7} size="large" />
        </p>
      </div>
      <div className="col-md-6">
        <p className="side-title">Tentang Kami</p>
        <p style={{ textAlign: 'justify' }}>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
          velit esse cillum dolore eu fugiat nulla pariatur.`}
        </p>
        <p style={{ textAlign: 'justify', fontWeight: 'bold', color: '#000' }}>
          {`Excepteur sint occaecat cupidatat 
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`}
        </p>
        <div className="row mb-3">
          <div className="col-md-1 icon-konten">
            <i className="fas fa-map-marker" />
          </div>
          <div className="col-md-11 address-konten">
            <p>Djublee Office</p>
            <p>Jl. Tiang Bendera V no, 22</p>
            <p>Jakarta Utara, Penjaringan</p>
            <p>14450</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1 icon-konten">
            <i className="fab fa-facebook-f" />
          </div>
          <div className="col-md-11">
            <p>Djublee Indonesia</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1 icon-konten">
            <i className="fab fa-instagram" />
          </div>
          <div className="col-md-11">
            <p>djublee.id</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
