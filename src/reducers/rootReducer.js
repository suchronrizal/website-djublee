import { combineReducers } from 'redux';
import { reducer as sweetReducer } from 'react-redux-sweetalert';
import SimpleReducer from './simpleReducer';
import MitraReducer from './mitraReducer';
import ProductReducer from './productReducer';
import PaginationReducer from './paginationReducer';
import FilterReducer from './filterReducer';
import AuthReducer from './authReducer';
import ProfileReducer from './profileReducer';
import TransReducer from './transReducer';
import TawarReducer from './tawarReducer';
import BeliReducer from './beliReducer';
import TransaksiReducer from './transaksiReducer';

export default combineReducers({
  sweetalert: sweetReducer,
  SimpleReducer,
  MitraReducer,
  ProductReducer,
  PaginationReducer,
  Filter: FilterReducer,
  Tawar: TawarReducer,
  Trans: TransaksiReducer,
  AuthReducer,
  ProfileReducer,
  TransReducer,
  BeliReducer
});
