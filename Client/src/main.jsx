import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from "./components/SignIn/SignIn.jsx"
import SignUp from "./components/SignUp/SignUp.jsx"
import Home from './components/Home/Home.jsx'
import Profile from './components/Profile/Profile.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import CreatePost from './components/CreatePost/CreatePost.jsx'
import AuthLayout from "./components/AuthLayout.jsx"
import ProfileEdit from './components/ProfileEdit.jsx'
import Chat from "./components/Chat/Chat.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signin",
        element: (
          <AuthLayout authentication={false}>
            <SignIn />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        )
      },
      {
        path: "/home",
        element: (
          <AuthLayout>
            <Home />
          </AuthLayout>
        )
      },
      {
        path: "/profile",
        element: (
          <AuthLayout>
            <Profile />
          </AuthLayout>
        )
      },
      {
        path: "/message",
        element: (
          <AuthLayout>
            <Chat />
          </AuthLayout>
        )
      },
      {
        path: "/forgot-password",
        element: (
          <AuthLayout authentication={false}>
            <ForgotPassword />
          </AuthLayout>
        )
      },
      {
        path: "/create-post",
        element: (
          <AuthLayout>
            <CreatePost />
          </AuthLayout>
        )
      },
      {
        path:"/profile-edit",
        element:(
          <AuthLayout>
            <ProfileEdit />
            </AuthLayout>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
