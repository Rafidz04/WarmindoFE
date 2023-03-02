const initialState = {
  username: "",
  email: "",
  role: 0,
  //2
  listStock: [],
  listUser: [],
  listOrder: [],
  listPendapatan: [],
  grafikPenghasilan: [],
  totalPenghasilan: 0,
  grafikPelanggan: [],
  totalPelanggan: 0,
  listHarusOrder: [],
};

const authReducer = (state = initialState, action) => {
  let { type, data } = action;
  switch (type) {
    case "SET_IDENTITY":
      return {
        ...state,
        username: data.username,
        email: data.email,
        role: data.role,
      };
    //1
    case "LIST_STOCK":
      return {
        ...state,
        listStock: data,
      };
    case "LIST_PENDAPATAN":
      return {
        ...state,
        listPendapatan: data,
      };
    case "LIST_USER":
      return {
        ...state,
        listUser: data,
      };
    case "LIST_ORDER":
      return {
        ...state,
        listOrder: data,
      };
    case "GRAFIK_PENGHASILAN":
      return {
        ...state,
        grafikPenghasilan: data,
      };
    case "TOTAL_PENGHASILAN":
      return {
        ...state,
        totalPenghasilan: data,
      };
    case "GRAFIK_PELANGGAN":
      return {
        ...state,
        grafikPelanggan: data,
      };
    case "TOTAL_PELANGGAN":
      return {
        ...state,
        totalPelanggan: data,
      };
    case "LIST_HARUSORDER":
      return {
        ...state,
        listHarusOrder: data,
      };

    default:
      return state;
  }
};

export default authReducer;
