/**
 * List of route api address
 *
 */

/**
 * Route for auth
 */
const apiAuth = {
  login: `${process.env.REACT_APP_API_URL}login-user`,
  register: `${process.env.REACT_APP_API_URL}register-user`,
  loginRegisterFB: `${process.env.REACT_APP_API_URL}login-register-fb`
};

const apiProfile = {
  myProfile: `${process.env.REACT_APP_API_URL}userByToken`,
  myDataProfile: `${process.env.REACT_APP_API_URL}users`,
  myUser: `${process.env.REACT_APP_API_URL}user`,
  myCreditCard: `${process.env.REACT_APP_API_URL}user/credit_card/`,
  myPassword: `${process.env.REACT_APP_API_URL}user/password/`,
  putUserDashboard: `${process.env.REACT_APP_API_URL}user/dashboard`
};

/**
 * Route for mitra
 */
const apiMitra = {
  list: `${process.env.REACT_APP_API_URL}mitra`,
  detailMitra: `${process.env.REACT_APP_API_URL}user-mitra/`,
  products: ''
};

/**
 * Route for products
 */
const apiProduct = {
  listByListingCount: `${process.env.REACT_APP_API_URL}product/groupByListingCount`,
  listByBidCount: `${process.env.REACT_APP_API_URL}product/groupByBidCount`,
  listLuxuryCars: `${process.env.REACT_APP_API_URL}product/groupLuxury`,
  listSuperCars: `${process.env.REACT_APP_API_URL}product/groupSupercar`,
  productById: `${process.env.REACT_APP_API_URL}product/`,
  listProductByMitra: `${process.env.REACT_APP_API_URL}productByUser?`,
  listSearchGroupByName: `${process.env.REACT_APP_API_URL}product/search_group_by_name?`,
  viewGroup: `${process.env.REACT_APP_API_URL}product/view_group?`,
  viewGroupDetail: `${process.env.REACT_APP_API_URL}product/search?`,
  listSearchGroupByParams: `${process.env.REACT_APP_API_URL}product/search_group?`,
  brand: `${process.env.REACT_APP_API_URL}master-brand`,
  merk: `${process.env.REACT_APP_API_URL}merk?brand=`,
  model: `${process.env.REACT_APP_API_URL}master-type?merk=`,
  color: `${process.env.REACT_APP_API_URL}color`,
  wilayah: `${process.env.REACT_APP_API_URL}kota`
};

const apiTransaksi = {
  jual: `${process.env.REACT_APP_API_URL}product`,
  myProduct: `${process.env.REACT_APP_API_URL}my-product`,
  myPembelian: `${process.env.REACT_APP_API_URL}transaction`,
  myBuyAndbid: `${process.env.REACT_APP_API_URL}productByBidder`,
  myBidList: `${process.env.REACT_APP_API_URL}bidByBidder`,
  myTransactionList: `${process.env.REACT_APP_API_URL}transaction`,
  myDetailBid: `${process.env.REACT_APP_API_URL}bid?productId=`,
  tawar: `${process.env.REACT_APP_API_URL}bid`,
  bankLeasing: `${process.env.REACT_APP_API_URL}bankleasing`,
  bankKredit: `${process.env.REACT_APP_API_URL}bankcredit?bank_id=`,
  bankCalculation: `${process.env.REACT_APP_API_URL}bankcreditcalculate?`,
  userCreditCard: `${process.env.REACT_APP_API_URL}user/credit_card/`,
  buyProduct: `${process.env.REACT_APP_API_URL}bid-buy`,
  listBidByType: `${process.env.REACT_APP_API_URL}bidByType?`,
  listBuyByType: `${process.env.REACT_APP_API_URL}transactionByType?`
};

export { apiMitra, apiProduct, apiAuth, apiProfile, apiTransaksi };
