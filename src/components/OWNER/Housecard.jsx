import React,{Fragment,useState,useEffect} from 'react';
import API from '../Urls/URL';
import "./Upload.css";


export default function Housecard(props) {
    const [housename,setHousename] = useState('');
    const [maxdays,setMaxdays] = useState('');
    const [mindays,setMindays] = useState('');
    const [address,setAddress] = useState('');
    const [price,setPrice] = useState('');
    const [phoneno,setphoneno] = useState('');
    const [location,setLocation] = useState('');
    const [distance,setDistance] = useState('');
    const [picture,setPicture] = useState('');

const validation = (event) =>{
    event.preventDefault();
    let document ;
    console.log("pictire",picture);
    let reader = new FileReader();
    reader.readAsDataURL(picture);
    reader.onload = function () {
        document = reader.result;
       //  console.log("document : ",document);
        var stringLength = document.length - 'data:image/png;base64,'.length;
        var sizeInBytes = 4 * Math.ceil((stringLength / 3))*0.5624896334383812;
        var sizeInKb=sizeInBytes/1024;
        var mb =(sizeInKb/1024).toFixed(2);
 //  console.log("sizeof picture",mb);
  if(mb <= 10){ 
    const data = {
        houseownerid:props.userid,
        name:housename,
        price:price,
        address:address,
        phoneNo:phoneno,
        location:location,
        maxDays:maxdays,
        minDays:mindays,
        distance:distance,
        ratings:5,
        picture:document
    };
     
    let options = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      }
     
       let output = fetch(`${API}/house/createhouse/${props.userid}`,options);
               output.then(res=>res.json())
                     .then(result=>{
                        // console.log("result",result);
                        if(result.data != undefined){
                            window.location.reload();
                        }
                     })     
        // console.log("create room data = ",data);
    // console.log("hi this is validation !!!");
                    }}
}



  return (
    <Fragment>
        <div className='container-fluid '>
            <div className='my-4' >
                <form onSubmit={(event)=>{validation(event)}} className="housecard">
                <label htmlFor="a">House Name : </label><br/>
                <input id="a" type="text" required onChange={(e)=>setHousename(e.target.value)} placeholder="Enter house name ..." /><br/><br/>
                <label htmlFor="a1">Address : </label><br/>
                <input id="a1" type="text" required  onChange={(e)=>setAddress(e.target.value)} placeholder="Enter house address ... " /><br/><br/>
                <label htmlFor="a2">price : </label><br/>
                <input id="a2" type="text" required onChange={(e)=>setPrice(e.target.value)} placeholder="Enter price per da...y" /><br/><br/>
                <label htmlFor="a3">Phone No : </label><br/>
                <input id="a3" type="number" required onChange={(e)=>setphoneno(e.target.value)} placeholder="Enter phone no .." /><br/><br/>
                <label htmlFor="a4">Location : </label><br/>
                <select name="" id="a4" required onChange={(e)=>setLocation(e.target.value)} >
                    <option value="select a location" selected disabled>- select location -</option>
                    <option value="coimbatore">coimbatore</option>
                    <option value="chennai">chennai</option>
                    <option value="vellore">vellore</option>
                    <option value="tiruchirappalli">Tiruchirappalli</option>
                </select><br/><br/>
                <label htmlFor="a5">Max days : </label><br/>
                <input id="a5" type="number" required onChange={(e)=>setMaxdays(e.target.value)} placeholder="Enter maximum days stay" /><br/><br/>
                <label htmlFor="a6">Min days : </label><br/>
                <input id="a6" type="number" required onChange={(e)=>setMindays(e.target.value)} placeholder="Enter minimum days stay" /><br/><br/>
                <label htmlFor="a7">Distance : </label><br/>
                <input id="a7" type="number" required placeholder="From center of the city in km" onChange={(e)=>setDistance(e.target.value)} /><br/><br/>
                <label htmlFor="formFileLg" className="form-label">Upload Photo</label>
                      <input className="form-control form-control-lg my-3" id="formFileLg" required type="file" accept="image/png, image/jpg, image/jpeg" onChange={(e)=>setPicture(e.target.files[0])} />
                <div className='text-center'>
                <input type="submit" value="create house" className="btn btn-block btn-success" /><br/><br/>
                </div>
                </form>
            </div>           
        </div>
    </Fragment>
  )
}
