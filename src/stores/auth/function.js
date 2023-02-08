import { baseAxios, errorHandler } from "../index";
import Swal from "sweetalert2";
import routes from "../../routes";

function getRouting(routes, val) {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].name === val) {
      return routes[i].layout + routes[i].path;
    }
    if (routes[i].collapse) {
      return getRouting(routes[i].views, val);
    }
  }
  return "/";
}

export function login(dispatch, data, history) {
  baseAxios
    .post("/userWarmindo/loginWarmindo", {
      email: data.username,
      password: data.password,
    })
    .then(async (respon) => {
      localStorage.setItem("tokenWarmindo", respon.data.token);
      history.push("/admin/dashboard");
      let { email, username } = respon.data;
      dispatch({
        type: "SET_IDENTITY",
        data: { email, username },
      });
      // history.push('/admin/dashboard');
    })
    .catch((err) => {
      console.log(err.response, "ini error");
    });
}
export function refresh(dispatch) {
  Swal.fire({
    title: "Tunggu ...",
    didOpen() {
      Swal.showLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  });
  baseAxios
    .get("/userWarmindo/refresh", {
      headers: { token: localStorage.getItem("tokenWarmindo") },
    })
    .then(async (respon) => {
      let { email, username } = respon.data;
      localStorage.setItem("tokenWarmindo", respon.data.token);
      dispatch({
        type: "SET_IDENTITY",
        data: { email, username },
      });
      Swal.close();
    })
    .catch(errorHandler);
}

export async function addUser(dispatch, data, history) {
  console.log("ini depannnn", data);

  try {
    const respon = await baseAxios.post("/userWarmindo/daftarUserWarmindo", {
      email: data.email,
      nama: data.nama,
      password: data.password,
      role: Number(data.role.value),
    });
    return respon;
  } catch (err) {
    return err.response;
  }
}

export async function addStok(dispatch, data, history) {
  let formData = new FormData();
  formData.append("namaBarang", data.namaBarang);
  formData.append("totalStock",data.totalStock)
  formData.append("harga", data.harga);
  formData.append("kategori", data.kategori.value);
  formData.append("fotoProduk", data.fotoProduk);
  try {
    const respon = await baseAxios.post(
      "/stokWarmindo/addStokWarmindo",
      formData,
      {
        headers: {
          token: localStorage.getItem("tokenWarmindo"),
        },
      }
    );
    return respon;
  } catch (err) {
    return err.response;
  }
}

export async function editStok(dispatch, data, history) {
  console.log(data)
  try {
    const respon = await baseAxios.patch(
      "/stokWarmindo//updateStokWarmindo",
      data,
      {
        headers: {
          token: localStorage.getItem("tokenWarmindo"),
        },
      }
    );
    return respon;
  } catch (err) {
    return err.response;
  }
}

export async function addOrder(dispatch, data, history) {
  let formData = new FormData();
  formData.append("idStock", data.idStock);
  formData.append("namaPelanggan", data.namaPelanggan);
  formData.append("kuantitas", data.Kuantitas.value);
  formData.append("totalKuantitas", data.totalKuantitas);
  try {
    const respon = await baseAxios.post(
      "/orderWarmindo/addorderWarmindo",
      formData,
      {
        headers: {
          token: localStorage.getItem("tokenWarmindo"),
        },
      }
    );
    return respon;
  } catch (err) {
    return err.response;
  }
}

//1
export async function getAllStock(dispatch, data, history) {
  try {
    const response = await baseAxios.get("/stokWarmindo/getallStokWarmindo",{
      headers: {
        token: localStorage.getItem("tokenWarmindo"),
      },
    })
    console.log(response)
    dispatch({type:"LIST_STOCK",data:response.data.data})
    return response
  } catch (error) {
    return err.response
  
  }
}

export async function getAllUser(dispatch, data, history) {
  try {
    const response = await baseAxios.get("/userWarmindo/getallUserWarmindo",{
      headers: {
        token: localStorage.getItem("tokenWarmindo"),
      },
    })
    // console.log(response)
  dispatch({type:"LIST_USER",data:response.data.data})
    return response
  } catch (error) {
    return err.response
  
  }
}

export async function getAllOrder(dispatch, data, history) {
  try {
    const response = await baseAxios.get("/orderWarmindo/getallorderWarmindo",{
      headers: {
        token: localStorage.getItem("tokenWarmindo"),
      },
    })
    console.log(response)
    dispatch({type:"LIST_ORDER",data:response.data.data})
    return response
  } catch (error) {
    return err.response
  
  }
}

export function logout() {
  localStorage.removeItem("tokenWarmindo");
  window.location.replace("/auth/login-page");
}
