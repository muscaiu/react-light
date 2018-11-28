const initState = {
  status: 'true'
};

const statusReducer = (state = initState, action) => {
  switch (action.type) {
    case 'STATUS_ON': {
      return { ...state, status: true }
    }
    case 'STATUS_OFF': {
      return { ...state, status: false }
    }
    case 'STATUS_ERROR': {
      console.log('STATUS_ERROR', action.err)
      return state;
    }
    default: {
      return state;
    }
  }
};
export default statusReducer;