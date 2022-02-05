import React from 'react'
import { useState } from 'react'

export default function CallApi({ count, addCount}) {
  const [text, setText] = useState([])
  const [question, setQuestion] = useState([])

  async function getText() {
    const res = await fetch('/api/users', { 
      method: 'POST',
      headers: new Headers({
        'Content-Type' : 'application/json'
      }),
      body: JSON.stringify({
          username: "movieGuy",
          password: "supersecret",
      })
    })
    let data = await res.json()
    console.log(data)
    setText(data.username)
  }
  async function getQuestion() {
    const res = await fetch('api/questions')
    let data = await res.json()
    console.log(data)
    setQuestion(data.title)
  }
  
  return (
    <div>
      Username: {text}
      <br></br>
      Movie Title: {question}
      <br/>
      <button onClick={getText}>Call MY API (POST)</button>
      <button onClick={getQuestion}>Get Question</button>
    </div>
  )
}