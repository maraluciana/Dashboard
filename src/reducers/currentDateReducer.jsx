const currentDateReducer = (state = new Date(), action) => {
    switch (action.type) {
      case 'SET_CURRENT_DATE':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default currentDateReducer;