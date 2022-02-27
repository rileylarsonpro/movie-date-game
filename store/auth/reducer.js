import { authActionTypes } from './action'

const authInitialState = {
  initializing: true,
  loggedIn: false,
  user: null,
}

export default function reducer(state = authInitialState, action) {
  switch (action.type) {
    case authActionTypes.LOGIN:
        return Object.assign({}, state, {
          initializing: false,
          loggedIn: action.loggedIn,
          user: action.user
        })
      case authActionTypes.LOGOUT:
          return Object.assign({}, state, {
            initializing: false,
            loggedIn: false,
            user: null
          })
    default:
      return state
  }
}
