const initialState = {
  username: '',
  perusahaan: '',
  cabang: '',
};

const authReducer = (state = initialState, action) => {
  let { type, data } = action;

  switch (type) {
    case 'SET_IDENTITY':
      return {
        ...state,
        username: data.username,
        cabang: data.cabang,
        perusahaan: data.perusahaan,
      };
    default:
      return state;
  }
};

export default authReducer;
