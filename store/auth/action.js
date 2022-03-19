export const authActionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

export const loginUser = (form) => async (dispatch) => {
  const res = await fetch('/api/users/login', {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      username: form.username,
      password: form.password,
    })
  })
  if (res.ok) {
    let user = await res.json()
    return dispatch({
      type: authActionTypes.LOGIN,
      loggedIn: true,
      user: user
    })
  }
  else {
    return dispatch({
      type: authActionTypes.LOGIN,
      loggedIn: false,
      user: null
    })
  }
}

export const registerUser = (form) => async (dispatch) => {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      username: form.username,
      password: form.password,
    })
  })
  if (res.ok) {
    let user = await res.json()
    return dispatch({
      type: authActionTypes.LOGIN,
      loggedIn: true,
      user: user
    })
  }
  else {
    return dispatch({
      type: authActionTypes.LOGIN,
      loggedIn: false,
      user: null
    })
  }
}

export const logoutUser = () => async (dispatch) => {
  const res = await fetch('api/users/logout', {
    method: 'PUT',
    credentials: "include",
  })
  if (res.ok) {
    return dispatch({ type: authActionTypes.LOGOUT })
  }
}

export const getUser = () => async (dispatch) => {
  const res = await fetch('api/users', {
    method: 'GET',
    credentials: "include",
  })
  if (res.ok) {
    let user = await res.json()
    return dispatch({
      type: authActionTypes.LOGIN,
      loggedIn: true,
      user: user
    })
  }
  else {
    return dispatch({ type: authActionTypes.LOGOUT })
  }
}

export const updateUser = (userId, body) => async (dispatch) => {
  const res = await fetch(`api/users/${userId}`, {
    method: 'PUT',
    credentials: "include",
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(body)
  })
  if (res.ok) {
    let user = await res.json()
    return dispatch({
      type: authActionTypes.LOGIN,
      loggedIn: true,
      user: user
    })
  }
  else {
    return dispatch({ type: authActionTypes.LOGOUT })
  }
}

export const deleteUser = (userId) => async (dispatch) => {
  const res = await fetch(`api/users/${userId}`, {
    method: 'DELETE',
    credentials: "include",
  })
  return dispatch({ type: authActionTypes.LOGOUT })
}