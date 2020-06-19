import React from 'react';

const Footer = () => (
  <div className="footer mt-5">
    <footer className="container">
      <div className="row">
        <div className="col-md-12">
          <img src="/public/img/logo.png" className="footer-logo mb-3" alt="logo" />
        </div>
        <div className="col-md-8">
          <p>
            {`Platform jual beli mobil`}
            <br />
            {`bekas paling lengkap dan`}
            <br />
            {`paling aman di Indonesia`}
          </p>
        </div>
        <div className="col-md-2">
          <ul>
            <li>
              <a className="cl-dark-grey" href="/tentang-kami">
                {`Tentang Kami`}
              </a>
            </li>
            <li>
              <a className="cl-dark-grey" href="/syarat-ketentuan">
                {`Syarat & Ketentuan`}
              </a>
            </li>
            <li>
              <a className="cl-dark-grey" href="/bantuan">
                {`Bantuan`}
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-2">
          <p>Hubungi Kami</p>
          <ul className="inline-social-media">
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram" />
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li>
              <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-google-plus-g" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
