import { useSelector } from 'react-redux'
import Router from 'next/router';
import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { getUser } from '../store/auth/action'

export function AuthGuard({ children }) {
  const initializing = useSelector(state => state.auth.initializing)
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  useEffect(async () => {
    if (initializing) {
       await dispatch(getUser())
    }
    else if (!user) {
        Router.push("/login")
    }
  }, [user, initializing])

  if (initializing) {
      return <div></div>
  }
  // if auth initialized with a valid user show protected page
  if (!initializing && user) {
    return <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null
}