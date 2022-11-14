import React from 'react'
import axios from 'axios'

const Send = () => {

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("https://email-sender-v4.herokuapp.com/api/send",userRegister).then(res=>alert(res.data.message))
   
    }
  return (
    <div>
       <button onClick={handleSubmit}>Start</button>
    </div>
  )
}

export default Send