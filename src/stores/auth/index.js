const initialState = {
  username: '',
  email:'',
  //2
  listStock:[],
  listUser:[],
  listOrder:[]
  
};

const authReducer = (state = initialState, action) => {
  let { type, data } = action;
  switch (type) {
    case 'SET_IDENTITY':
      return {
        ...state,
        username: data.username,
        email:data.email
      };
      //1
      case 'LIST_STOCK':
        return {
          ...state,
          listStock:data
        }
      case 'LIST_USER':
        return {
          ...state,
          listUser:data
        }
        case 'LIST_ORDER':
          return {
            ...state,
            listOrder:data
          }
    default:
      return state;
  }
};

export default authReducer;
