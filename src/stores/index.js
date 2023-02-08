import axios from 'axios';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reduxSoldierMiddleware } from 'redux-soldier';

// reducer
import authReducer from './auth';
import dashboardReducer from './dashboard';
import monitoringReducer from './monitoring';

// function
export * from './auth/function';
export * from './monitoring/function';
export * from './errorHandler';
// server api
// export const baseUrl = process.env.REACT_APP_URL
// export const baseUrl = 'https://apijti.ptbap.net/';
export const baseUrl = 'http://192.168.70.78:9030/';

export const baseAxios = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

const rootReducer = combineReducers({
  authReducer,
  dashboardReducer,
  monitoringReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxSoldierMiddleware))
);
