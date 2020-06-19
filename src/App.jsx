import React from 'react';
import ReduxSweetAlert from 'react-redux-sweetalert';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Header from './components/Header';
import Home from './containers/Home';
import About from './containers/About';
import ViewProductDetailIndi from './containers/Products/ViewDetailProductIndi';
import AllProducts from './containers/Products/AllProducts';
import Product from './containers/Products/ListProduct';
import ListingProduct from './containers/Products/ListingProduct';
import ListingPenawaran from './containers/Products/ListingPenawaran';
import ProductViewGroup from './containers/Products/ViewGroupProduct';
import ProductDetailViewGroup from './containers/Products/ViewDetailGroupProduct';
import MitraProduct from './containers/Products/MitraProduct';
import Search from './containers/Products/SearchProduct';
import MyTransaction from './containers/MyTransaction';
import Login from './containers/Login';
import Terms from './containers/Terms';
import ProductTawar from './containers/Tawar';
import ProductBeli from './containers/Beli';
import ProductJual from './containers/Jual';
import RuangNego from './containers/Nego';
import MyBid from './containers/Dashboard/MyBid';
import MySale from './containers/Dashboard/MySale';
import MyTransaksi from './containers/Dashboard/MyTransaction';
import DashboardMitra from './containers/Dashboard/DashboardMitra';
import Profile from './containers/Dashboard/DashboardProfile';
import Footer from './components/footer';
import store from './store';
import setAuthHeader from './components/helpers/setAuthHeaders';
import { setcurrentUser, logoutAction } from './actions/authAction';

const homePage = () => <Home />;
const viewGroupProductPage = () => <ProductViewGroup />;
const viewGroupDetailProductPage = () => <ProductDetailViewGroup />;
const aboutPage = () => <About />;
const productPage = () => <Product />;
const transactionPage = () => <MyTransaction />;
const listingPage = () => <ListingProduct />;
const allProductPage = () => <AllProducts />;
const reqmitraPage = () => <DashboardMitra />;
const mitraPage = () => <MitraProduct />;
const searchPage = () => <Search />;
const loginPage = () => <Login />;
const termsPage = () => <Terms />;
const tawarPage = () => <ProductTawar />;
const beliPage = () => <ProductBeli />;
const jualPage = () => <ProductJual />;
const negoPage = () => <RuangNego />;
const profilePage = () => <Profile />;
const mysalePage = () => <MySale />;
const mybidPage = () => <MyBid />;
const mytransactionPage = () => <MyTransaksi />;

const { tokenData } = localStorage;
if (tokenData) {
  setAuthHeader(tokenData);
  const decodedToken = jwtDecode(tokenData);
  store.dispatch(setcurrentUser(decodedToken));

  // Check validity of token, if expired then logout and redirect
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    store.dispatch(logoutAction());
    window.location.href = '/';
  }
}

const App = () => (
  <div className="App">
    <main>
      <Router>
        <div>
          <Header />
          <Route exact path="/product" component={viewGroupProductPage} />
          <Route exact path="/product/groupdetail" component={viewGroupDetailProductPage} />
          <Route
            exact
            path="/product/detail-product/:id"
            render={prop => <ViewProductDetailIndi {...prop} />}
          />
          <Route exact path="/products" component={allProductPage} />
          <Route exact path="/products/:luxury" component={productPage} />
          <Route exact path="/products/:super" component={productPage} />
          <Route exact path="/products/:listing" component={productPage} />
          <Route
            exact
            path="/listing-penawaran"
            render={props => <ListingPenawaran {...props} />}
          />
          <Route exact path="/listing" component={listingPage} />
          <Route exact path="/tentang-kami" component={aboutPage} />
          <Route exact path="/mitra/:idm/:ids" component={mitraPage} />
          <Route exact path="/search" component={searchPage} />
          <Route exact path="/login" component={loginPage} />
          <Route exact path="/signup" component={loginPage} />
          <Route exact path="/tawar/:id" component={tawarPage} />
          <Route exact path="/syarat-ketentuan" component={termsPage} />
          <Route exact path="/beli" component={beliPage} />
          <Route exact path="/jual" component={jualPage} />
          <Route exact path="/nego" component={negoPage} />
          <Route exact path="/profile" component={profilePage} />
          <Route exact path="/my-sale" component={mysalePage} />
          <Route exact path="/my-transaction" component={mytransactionPage} />
          <Route exact path="/my-purchase" component={mybidPage} />
          <Route exact path="/my-bid" component={mybidPage} />
          <Route exact path="/pembelian" component={transactionPage} />
          <Route exact path="/penjualan" component={transactionPage} />
          <Route exact path="/request-mitra" component={reqmitraPage} />
          <Route exact path="/" component={homePage} />
          <ReduxSweetAlert />
        </div>
      </Router>
      <Footer />
    </main>
  </div>
);

export default App;
