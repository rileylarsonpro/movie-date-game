export const authActionTypes = {
    LOGIN: 'LOGIN',
  }
  
  export const loginUser = () => (dispatch) => {
    return dispatch({ type: authActionTypes.LOGIN })
  }
  