import React,{Fragment,useState} from 'react';
import "./Login.css";
import {useNavigate} from "react-router-dom";
import API from "../Urls/URL";

export default function Login() {
  // const [screenheight,setScreenheight] = useState(window.innerHeight);
    const [finder,setFinder]= useState(true);
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [repassword,setRepassword] = useState('');
    const [phoneno,setPhoneno] = useState('');
    const [emailerr,setEmailerr] = useState('');
    const [usernameerr,setUsernameerr] = useState('');
    const [passworderr,setPassworderr] = useState('');
    const [repassworderr,setRepassworderr] = useState('');
    const [phonenoerr,setPhonenoerr] = useState('');
    const [loginerr,setLoginerr] = useState('');
    const [createaccounterr,setCreateaccounterr] = useState('');
    const [loginemail,setLoginemail] = useState('');
    const [loginpassword,setLoginpassword] = useState('');
    // const [error,setError] = useState("");

    const navigate = useNavigate();

   const creataccounthandler = (e)=>{
       e.preventDefault();
       const data = {
                     username:username,
                     password:password,
                     phoneNo:phoneno,
                     confrim_password:repassword,
                     email:email
                    }
                    let options = {
                      method:"POST",
                      headers:{"Content-Type":"application/json"},
                      body:JSON.stringify(data)
                    }
                  let output = fetch(`${API}/auth/createaccount`,options);
                  output.then(res=>res.json())
                         .then(result=>{
                                  setEmailerr("");
                                  setPassworderr("");
                                  setUsernameerr("");
                                  setPhonenoerr("");
                                  setRepassworderr("");  
                                  setCreateaccounterr("");
                                console.log("result",result);
                                if(result.create){
                                  setFinder(true);
                                  window.location.reload();
                                }
                                else{
                                  setCreateaccounterr(result.message);
                                }
                                if(result.error != undefined ){
                                  setEmailerr(result.error[0].email);
                                  setPassworderr(result.error[0].password);
                                  setUsernameerr(result.error[0].username);
                                  setPhonenoerr(result.error[0].phoneNo);
                                  setRepassworderr(result.error[0].confrim_password);
                                 
                                }
                         })  
      // console.log("createaccounthandler !!!!!");
   }


   const fun = ()=>{
    if(true == true){
     navigate("/");
     
    }
   }

   const loginhandler = async(e)=>{
    e.preventDefault();
    const data = {
                 email:loginemail,
                 password:loginpassword
                 }
                //  console.log("data = ",data);
                 let options = {
                  method:"POST",
                  headers:{"Content-Type":"application/json"},
                  body:JSON.stringify(data),
                  credentials: 'include' 
                }
              let output = fetch(`${API}/auth/login`,options);
              output.then(res=>res.json())
                     .then(result=>{ 
                      // console.log("result",result);
                      if(result.isloggedin){
                         setLoginerr('');
                         let userdata = result.data ;
                         localStorage.setItem("userdata",JSON.stringify(userdata));
                         localStorage.setItem("login",JSON.stringify(result.isloggedin));
                         fun()
                      }else{
                        setLoginerr(result.message);
                      }
                     });





                //  window.location.reload();
                //  fun();

    // console.log("login handler !!!!!");
   }
  
  return (
     <Fragment>
          <div>
          <div className='back-ground'>  
    { finder ?
     <div className='login'>
      <div className='card p-4'>
        Login <br/><br/>
        <form onSubmit={(e)=>loginhandler(e)}>
        <span id="error">{loginerr}</span><br/>
          <label htmlFor="username" >Email </label>
          <input id="username" type="text" required onChange={(e)=>setLoginemail(e.target.value)} />
          <label htmlFor="password" >Password </label>
        <input id="password" type="password" required onChange={(e)=>setLoginpassword(e.target.value)} /><br/><br/>
          <center><input type="submit" value="Login"  className='btn btn-block btn-success'/></center>
        </form>
      </div>
      <br/><hr/>      
      <div id='error'>OR</div>
      <span style={{fontWeight:"bolder"}}>  Not have an account ?</span><br/><br/>
      <button className='btn btn-block btn-danger' onClick={()=>{setFinder(false)}}>create an account</button>
      </div>
      :
      <div className='create-account'>
      <div className='card p-4'>
        Create An Account 
        <form onSubmit={(e)=>creataccounthandler(e)}>
        <span id="error">{createaccounterr}</span><br/>
          <span id='error'>{emailerr}</span><br/>
          <label htmlFor="Email">Email  </label>
          <input id="Email" type="text" required onChange={(e)=>setEmail(e.target.value)} />
          <span id='error'>{usernameerr}</span><br/>
          <label htmlFor="username">Username </label>
          <input id="username" type="text" required onChange={(e)=>setUsername(e.target.value)} />
          <span id='error'>{phonenoerr}</span><br/>
          <label htmlFor="phoneno">  Phone no</label>
          <input id="phoneno" type="number" required onChange={(e)=>setPhoneno(e.target.value)} />
          <span id='error'>{passworderr}</span><br/>
          <label htmlFor="password" >Password </label>
          <input id="password" type="password" required onChange={(e)=>setPassword(e.target.value)} />
          <span id='error'>{repassworderr}</span><br/>
          <label htmlFor="con-password" >Confrim Password </label>
          <input id="con-password" type="password" required onChange={(e)=>setRepassword(e.target.value)} /><br/>
       <center><input type="submit" value="Register" className='my-3' /></center> 
       </form>
      </div>
      <br/><hr/>
      <div id='error'>OR</div><br/>
      <div style={{fontWeight:"bolder"}}>Already have an account ?</div><br/>
      <button className='btn btn-block btn-success' onClick={()=>setFinder(true)}>Login</button>
      </div>
      }
    </div>
   
          </div>
     </Fragment>
  )
}
