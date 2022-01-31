import React from 'react'
import { useState } from 'react'

export default function CallApi({ count, addCount}) {
  const [text, setText] = useState([])

  async function getText() {
    const res = await fetch('http://localhost:1334', { 
      method: 'POST',
      headers: new Headers({
        'Content-Type' : 'application/json'
      }),
      body: JSON.stringify({
        property: "value"
      })
    })
    let data = await res.json()
    console.log(data)
    setText(data.property)
  }
  
  return (
    <div>
      {text}
      <br/>
      <button onClick={getText}>Call MY API</button>
    </div>
  )
}