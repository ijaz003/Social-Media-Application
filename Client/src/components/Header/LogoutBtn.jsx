import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import socket from '../socket';
import { useSelector } from 'react-redux';

function LogoutBtn() {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const userData=useSelector(state=>state.auth.userData)

    const logoutHandle = () => {
        dispatch(logout());
        localStorage.removeItem("token")
        socket.emit("removeUser",userData._id)
        navigate('/signin')
    }

    return (
        <button
            onClick={logoutHandle}
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
        >
            Logout
        </button>
    )
}

export default LogoutBtn