import React ,{Fragment, useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import avator from "../../asstes/Avator101.png";
import Modal from "react-modal";
import API from "../Urls/URL";

Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
   fontWeight:"bolder",
   color:"#64748b"
  },
}

export default function Profile() {
    const [editphoto,setEditphoto] = useState(false);
    const [editdata,setEditdata] = useState(false);
    const [picture,setPicture] = useState("");
    const [name,setName] = useState('');
    const [no,setNo]= useState('');
    const [user,setUser] = useState("");
    const [login,setLogin] = useState(false);
       
let navigate = useNavigate();
      useEffect(()=>{
            let userdata =JSON.parse(localStorage.getItem('userdata'));
            let isloggedin = JSON.parse(localStorage.getItem('login'));
            if(isloggedin && userdata != null){
             setUser(userdata);
             setLogin(isloggedin);
             setName(userdata.username);
             setNo(userdata.phoneNo);
            }
      },[])

    const editdatahandler =(e)=>{
           e.preventDefault();
           const data = {
             username:name,
             phoneNo:no
           }
           let options = {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data),
            credentials: 'include'
           }
          //  console.log("data = ",data);
          let api = fetch(`${API}/auth/update/${user._id}`,options);
             api.then(res=>res.json())
             .then(result=>console.log("result",result));
 
    }



   const  uploadphotohandler = (picture,e)=>{
       e.preventDefault();
       let document ;
       console.log("pictire",picture);
       let reader = new FileReader();
       reader.readAsDataURL(picture);
       reader.onload = function () {
           document = reader.result;
           let stringLength = document.length - 'data:image/png;base64,'.length;
           let sizeInBytes = 4 * Math.ceil((stringLength / 3))*0.5624896334383812;
           let sizeInKb=sizeInBytes/1024;
           let mb = (sizeInKb/1024).toFixed(2);
           if(mb <= 5 ){
            let data ={
              photo:document
            }
           let options = {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data),
            credentials: 'include'
           }
          //  console.log("call api toupdate photo!!!");
           let api = fetch(`${API}/auth/update/${user._id}`,options);
                     api.then(res=>res.json())
                        .then(result=>{
                          // console.log("result",result);
                           window.location.reload();
                          });
          }

          else{
            window.alert('Photo Size limit is 5 MB');
          }

       }


          // console.log("upload photo handler !!!!!");
   }

     const logouthandler = ()=>{
      console.log("logout handler !!!!");
      localStorage.removeItem("userdata");
      localStorage.removeItem('login');
       navigate('/');
     }



  return (
   <Fragment>
      <Navbar/>
            <div className='row container-fluid mx-auto'>
              <div className="col-12 col-md-6 col-lg-6 col-xl-6 text-center my-3">
                {user?.photo == "avator" ?
                  <img src={avator} alt="image...." className='w-75 mx-auto img' />
                  :
                  <img src={user?.photo} alt="image...." className='w-75 mx-auto img' />
                }
                  <div className="text-center btn btn-block btn-danger w-50 my-3" onClick={()=>{setEditphoto(true)}}>Edit Photo</div>
                  
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xl-6 my-5 text-center " style={{fontWeight:"bolder",color:"#0e7490"}}>
                   <div className='my-3'>{user?.username}</div>
                   <div className='my-3'><i className="bi bi-telephone-fill" style={{color:"red"}}></i>{user?.phoneNo} </div>
                   <div className='my-3'><i className="bi bi-envelope-fill" style={{color:"red"}}></i>{user?.email}</div>
                   <div className="text-center btn btn-block btn-success w-50 my-3" onClick={()=>{setEditdata(true)}}>Edit</div><br/>
                   <div className="text-center btn btn-block btn-danger w-50 my-3" onClick={()=>{logouthandler()}}>Logout</div>
               </div>
            </div>

         {/* modal photo edit */}
         <Modal  isOpen={editphoto}
         style={customStyles}>
            <i className="bi bi-arrow-left-circle-fill" onClick={()=>{setEditphoto(false)}}></i>
            <div>
              <form onSubmit={(e)=>uploadphotohandler(picture,e)}>
              <label htmlFor="formFileLg" className="form-label">upload profile photo</label>
              <input className="form-control form-control-lg" id="formFileLg" type="file" required onChange={(e)=>setPicture(e.target.files[0])} />
              <input type="submit" value="Edit photo" className="btn btn-block btn-danger my-4" />
              </form>
             </div>
         </Modal>

{/* modal data edit */}
     <Modal  isOpen={editdata}
         style={customStyles}>
            <i className="bi bi-arrow-left-circle-fill" onClick={()=>{setEditdata(false)}}></i><br/><br/>
            <div>Edit USER DATA</div><br/><br/>
             <form onSubmit={(e)=>editdatahandler(e)}>
               Username :  <input type="text" placeholder='username' value={name} onChange={(e)=>setName(e.target.value)} /><br/><br/>
               Phoneno :  <input type="text" placeholder='Phone no' value={no} onChange={(e)=>setNo(e.target.value)} /><br/><br/>
                 <input type="submit" value="Edit Data"  className="btn btn-block btn-danger my-4" />
             </form>
         </Modal>
   </Fragment>
  )
}
