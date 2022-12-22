import { baseAxios, errorHandler } from '../index';
import Swal from 'sweetalert2';
import routes from '../../routes';

function getRouting(routes, val) {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].name === val) {
      return routes[i].layout + routes[i].path;
    }
    if (routes[i].collapse) {
      return getRouting(routes[i].views, val);
    }
  }
  return '/';
}

export function login(dispatch, data, history) {
  Swal.fire({
    title: 'Tunggu ...',
    didOpen() {
      Swal.showLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  });
  baseAxios
    .post('/user/loginperusahaan', data)
    .then(async (respon) => {
      let { cabang, perusahaan, username } = respon.data;
      Swal.close();
      localStorage.setItem('tokenjti', respon.data.token);
      dispatch({
        type: 'SET_IDENTITY',
        data: { cabang, perusahaan, username },
      });
      history.push('/admin/dashboard');
    })
    .catch(errorHandler);
}
export function refresh(dispatch) {
  Swal.fire({
    title: 'Tunggu ...',
    didOpen() {
      Swal.showLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  });
  baseAxios
    .get('/user/refresh', {
      headers: { token: localStorage.getItem('tokenjti') },
    })
    .then(async (respon) => {
      let { cabang, perusahaan, username } = respon.data;
      localStorage.setItem('tokenjti', respon.data.token);
      dispatch({
        type: 'SET_IDENTITY',
        data: { cabang, perusahaan, username },
      });
      Swal.close();
    })
    .catch(errorHandler);
}

export function logout() {
  localStorage.removeItem('tokenjti');
  window.location.replace('/auth/login-page');
}
