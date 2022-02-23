import { authActionTypes } from './action'

const authInitialState = {
  loggedIn: false,
}

export default function reducer(state = authInitialState, action) {
  switch (action.type) {
    case authActionTypes.LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
      })
    default:
      return state
  }
}
