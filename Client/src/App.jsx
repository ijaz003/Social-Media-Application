import React, { useEffect } from "react";
import {useSelector} from "react-redux";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { useNavigate } from "react-router-dom";



function App() {
  const status=useSelector((state)=>state.auth.status);
  const navigate=useNavigate();

  useEffect(()=>{
    navigate("/signin")
  },[])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
