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
      localStorage.setItem("email", respon.data.email);
      history.push("/admin/dashboard");
      let { email, username, role } = respon.data;
      dispatch({
        type: "SET_IDENTITY",
        data: { email, username, role },
      });
      // history.push('/admin/dashboard');
    })
    .catch((err) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
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
      let { email, username, role } = respon.data;
      localStorage.setItem("tokenWarmindo", respon.data.token);
      localStorage.setItem("email", respon.data.email);
      dispatch({
        type: "SET_IDENTITY",
        data: { email, username, role },
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
  formData.append("kodeBarang", data.kodeBarang);
  formData.append("totalStock", data.totalStock);
  formData.append("minimStock", data.minimStock);
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
  console.log(data);
  try {
    const respon = await baseAxios.patch(
      "/stokWarmindo/updateStokWarmindo",
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
    const response = await baseAxios.get("/stokWarmindo/getallStokWarmindo", {
      headers: {
        token: localStorage.getItem("tokenWarmindo"),
      },
    });
    console.log(response);
    dispatch({ type: "LIST_STOCK", data: response.data.data });
    return response;
  } catch (error) {
    return err.response;
  }
}

export async function getAllUser(dispatch, data, history) {
  try {
    const response = await baseAxios.get("/userWarmindo/getallUserWarmindo", {
      headers: {
        token: localStorage.getItem("tokenWarmindo"),
      },
    });
    // console.log(response)
    dispatch({ type: "LIST_USER", data: response.data.data });
    return response;
  } catch (error) {
    return err.response;
  }
}

export async function getAllOrder(dispatch, data, history) {
  try {
    const response = await baseAxios.get("/orderWarmindo/getallorderWarmindo", {
      headers: {
        token: localStorage.getItem("tokenWarmindo"),
      },
    });
    dispatch({ type: "LIST_ORDER", data: response.data.data });
    return response;
  } catch (error) {
    return err.response;
  }
}

export async function deleteUser(dispatch, data, history) {
  let _id = data;
  try {
    const response = await baseAxios.delete(
      "/userWarmindo/deleteUserWarmindo",
      {
        headers: {
          token: localStorage.getItem("tokenWarmindo"),
        },
        data: {
          _id: _id,
        },
      }
    );

    return response;
  } catch (error) {
    return err.response;
  }
}

export async function deleteStok(dispatch, data, history) {
  let _id = data;
  try {
    const response = await baseAxios.delete(
      "/stokWarmindo/deletestokwarmindo",
      {
        headers: {
          token: localStorage.getItem("tokenWarmindo"),
        },
        data: {
          _id: _id,
        },
      }
    );

    return response;
  } catch (error) {
    return err.response;
  }
}

export async function getAllTotalPendapatan(dispatch, data, history) {
  let _id = data;
  try {
    const response = await baseAxios.get(
      "/orderWarmindo/getAllPendapatanWarmindo",
      {
        headers: {
          token: localStorage.getItem("tokenWarmindo"),
        },
      }
    );
    dispatch({ type: "LIST_PENDAPATAN", data: response.data.data });
    return response;
  } catch (error) {
    return err.response;
  }
}

export async function getGrafikPenghasilan(dispatch, data, history) {
  let year = data.tahun;
  console.log(year, "./.dfsfkndskfnsdkfnsd");
  try {
    const response = await baseAxios.get(
      `/orderWarmindo/getGrafikPenghasilan?year=${year}`,
      {
        headers: {
          token: localStorage.getItem("tokenWarmindo"),
        },
      }
    );
    console.log(response, "Pendapatan");
    dispatch({ type: "GRAFIK_PENGHASILAN", data: response.data.data });
    dispatch({ type: "TOTAL_PENGHASILAN", data: response.data.total });
    return response;
  } catch (error) {
    return err.response;
  }
}

export async function editPassword(dispatch, data, history) {
  try {
    const respon = await baseAxios.patch("/userWarmindo/updatePassword", data, {
      headers: {
        token: localStorage.getItem("tokenWarmindo"),
      },
    });
    return respon;
  } catch (err) {
    return err.response;
  }
}

export async function editStatus(dispatch, data, history) {
  try {
    const respon = await baseAxios.patch(
      "/userWarmindo/editStatusUser",
      { idUser: data.data._id, status: data.check ? "aktif" : "tidak aktif" },
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

export async function getGrafikPelanggan(dispatch, data, history) {
  let year = data.tahun;
  console.log(year, "./.dfsfkndskfnsdkfnsd");
  try {
    const response = await baseAxios.get(
      `/orderWarmindo/getGrafikPelanggan?year=${year}`,
      {
        headers: {
          token: localStorage.getItem("tokenWarmindo"),
        },
      }
    );
    dispatch({ type: "GRAFIK_PELANGGAN", data: response.data.data });
    dispatch({ type: "TOTAL_PELANGGAN", data: response.data.total });
    return response;
  } catch (error) {
    return err.response;
  }
}

export async function getHarusOrder(dispatch, data, history) {
  try {
    const response = await baseAxios.get(`/stokWarmindo/getHarusOrder`, {
      headers: {
        token: localStorage.getItem("tokenWarmindo"),
      },
    });
    dispatch({ type: "LIST_HARUSORDER", data: response.data });
    return response;
  } catch (error) {
    return err.response;
  }
}

export function logout() {
  localStorage.removeItem("tokenWarmindo");
  localStorage.removeItem("email");
  window.location.replace("/auth/login-page");
}
