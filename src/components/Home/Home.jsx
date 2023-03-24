import React, { Fragment ,useState } from 'react';
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Setdata from '../Setdata/Setdata';
import Upload from '../OWNER/Upload';
import {useNavigate} from "react-router-dom";

export default function Home() {
  const [set,setSet] = useState(true);

  let navigate = useNavigate();
  
  return (
  <Fragment>
        <Navbar/>
         <div className='row container-fluid'>
            <button className='btn btn-block btn-warning' onClick={()=>navigate('/owner')}>Switch to House Owner </button>
         </div>
        <Setdata/>
  </Fragment>

  )
}
