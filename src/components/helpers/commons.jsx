import moment from 'moment';
import isEmpty from './isEmptyChecker';

const formatDate = (date, format = 'DD-MM-YYYY') => moment(date).format(format);

const formatCurrency = (number, currency = 'Rp') =>
  `${currency} ${new Intl.NumberFormat('id-ID').format(number)}`;

const formatNumber = number => new Intl.NumberFormat('id-ID').format(number);

const setBgImage = url => ({ backgroundImage: `url(${url})` });

const setSlug = name =>
  name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

const getParams = url => new URLSearchParams(url);

const currentDate = (format = 'YYYY-MM-DD') => moment().format(format);

const highestBid = price =>
  !isEmpty(price) && price.length > 0
    ? Math.max(...price.map(bids => parseInt(bids.bid_price, 10)))
    : null;

export {
  formatDate,
  formatCurrency,
  formatNumber,
  setBgImage,
  setSlug,
  getParams,
  currentDate,
  highestBid
};
