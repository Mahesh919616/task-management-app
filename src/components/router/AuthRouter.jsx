import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthRouter = ({children}) => {

    const loggedinUser = sessionStorage.getItem('loggedin-user')

    if(!loggedinUser){
        return <Navigate to='/' />
    }

    return children ? children : ''
}

export default AuthRouter