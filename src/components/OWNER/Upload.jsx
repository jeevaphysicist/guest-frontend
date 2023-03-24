import React,{Fragment,useState,useEffect} from 'react';
import Navbar from "../Navbar/Navbar";
import "./Upload.css";
import Modal from "react-modal";
import Housecard from './Housecard';
import House from "./House";
import API from '../Urls/URL';
import {useNavigate} from 'react-router-dom';

Modal.setAppElement('#root');
const customStyles = {
        content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom:"-50%",
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    
    },
   
  };

export default function Upload() {
const [isopen,setIsopen]= useState(false);
const [user,setUser] = useState("");
const [login,setLogin] = useState(false);
const [data,setData]  = useState('');
   
    let navigate = useNavigate();


  useEffect(()=>{
        let userdata =JSON.parse(localStorage.getItem('userdata'));
        let isloggedin = JSON.parse(localStorage.getItem('login'));
        if(isloggedin && userdata != null){
         setUser(userdata);
         setLogin(isloggedin);
        }
  },[])
  useEffect(()=>{
    let output = fetch(`${API}/house/gethouse/${user._id}`,{method:"GET"});
    output.then(res=>res.json())
    .then(result=>{
        console.log("result",result);
        setData(result.data);
    });
},[user])

   const checkuser =()=>{
    if(login){
      setIsopen(true)  
    }
    else{
        navigate('/login');
    }
   }

  return (
    <Fragment>
       <Navbar/>
      <div className='row container-fluid'>
          <button className='btn btn-block btn-warning' onClick={()=>{navigate("/")}}>Switch to customer </button>
        </div>
        <div className='row  container-fluid mx-auto  intro'>
            <div className='col-12 text-center my-3 w-100 '>
                  <p className='mx-auto' > welcome , Lets take a greate journey with us .  </p>
                  <p className='mx-auto'>Dear customer , Here you can grow your business over the world wide and just upload your house Details 
                    and Quick result from the Client </p> 
            </div>
            <div className='col-12 text-center my-3'>
                <button className='btn btn-block btn-success'>Get Started  click the below create house</button>
            </div>
        </div>
         <div className='row container-fluid'>
            <div className='col-12  py-4 text-center'>
              { data != undefined && data.length > 0 ? <button className='btn btn-block btn-success' onClick={()=>{checkuser();}}>+</button> : <button className='btn btn-block btn-warning ' onClick={()=>{checkuser();}}>+ Create House</button> }
            </div>
        </div>

        <Modal 
        isOpen={isopen}
        style={customStyles}>
          <i class="bi bi-arrow-left-square" onClick={()=>setIsopen(false)}></i>
         <Housecard userid={user._id}  />
          
        </Modal>
        {data!= "" && data.length>0 && data.map(items=><div><House data={items} key={data._id} /><hr style={{heigth:"40px"}} /></div> )}

    </Fragment>
  )
}
