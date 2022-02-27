import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { logoutUser } from '../store/auth/action'
import { useDispatch } from 'react-redux'


export default function CallApi({ }) {
  const [text, setText] = useState([])
  const [question, setQuestion] = useState([])
  const username = useSelector(state => state.auth.user.username)
  const dispatch = useDispatch()

  async function logOut() {
    dispatch(logoutUser())
  }

  return (
    <div>
      Username: {username}
      <br></br>
      Movie Title: {question}
      <br />
      <button onClick={logOut}>LogOut</button>
    </div>
  )
}