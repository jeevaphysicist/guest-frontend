import React, { Fragment ,useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import image from "../../asstes/Avator101.png";
import logo from "../../asstes/logo.png"

const screenwidth = window.innerWidth ;
export default function Appauthorized() {
      const [stylemodal,setStylemodal] = useState(false);
      const [user,setUser] = useState(null);
      const [login,setLogin] = useState(false);
       

      useEffect(()=>{
            let userdata =JSON.parse(localStorage.getItem('userdata'));
            let isloggedin = JSON.parse(localStorage.getItem('login'));
             setUser(userdata);
             setLogin(isloggedin);
      },[])
    //  console.log("user",user);
    //  console.log("login",login);
  return (
    <Fragment>
      <header className='row mx-auto container-fluid'>
        <div className='col-4 col-md-3 col-lg-6 col-xl-6'>
           <div className='logo'><img src={logo} alt="image ...."  className='logo'/></div>
        </div>
        <div className='col-8 col-md-9 col-lg-6 col-xl-6'>
        <i className="bi bi-gear text-end" onClick={()=>{setStylemodal(true)}} ></i>
        <nav  className={stylemodal ? "settingsopen" : "settingsclose"}>
        <i className="bi bi-arrow-left" onClick={()=>{setStylemodal(false)}} ></i>
       { login ?<Link to="/profile" className='head col-3'><span>Account</span></Link> : <Link to="/login" className='col-3'><button className='btn btn-block btn-danger'>Login</button></Link>}
        <Link to="/" className='head col-3'>Home</Link>
        <Link to="/#" className='head col-3'>Contact</Link>
        <Link to="/#" className='head col-3'>About</Link>
        </nav>
        </div>
      </header>    
    </Fragment>
  )
}
