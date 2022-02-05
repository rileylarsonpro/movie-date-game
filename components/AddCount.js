import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addCount } from '../store/count/action'
import { useState } from 'react'

const AddCount = ({ count, addCount}) => {
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
    console.log(await res.json())
    setText(res)
  }
  
  return (
    <div>
      <style jsx>{`
        div {
          padding: 0 0 20px 0;
        }
      `}</style>
      <h1>
        AddCount: <span>{count}</span>
      </h1>
      <button onClick={addCount}>Add To Count</button>
      <button onClick={getText}>Call MY API</button>
    </div>
  )
}


const mapStateToProps = (state) => ({
  count: state.count.count,
})

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCount)
