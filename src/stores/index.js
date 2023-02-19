import axios from 'axios';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reduxSoldierMiddleware } from 'redux-soldier';

// reducer
import authReducer from './auth';
import dashboardReducer from './dashboard';

// function
export * from './auth/function';
export * from './errorHandler';
// server api
// export const baseUrl = process.env.REACT_APP_URL
export const baseUrl = 'http://warmindo88.my.id/';
// export const baseUrl = 'https://uptight-bee-woolens.cyclic.app/';

export const baseAxios = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

const rootReducer = combineReducers({
  authReducer,
  dashboardReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxSoldierMiddleware))
);
