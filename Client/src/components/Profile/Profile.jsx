import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
    const userData=useSelector((state)=>state.auth.userData)
    console.log(userData)

  return (
    <h1>
        Profile view
    </h1>
  )
}

export default Profile