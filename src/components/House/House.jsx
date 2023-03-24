import React,{Fragment,useState,useEffect} from 'react';
import "./House.css";
import Navbar from "../Navbar/Navbar";
import {useParams} from "react-router-dom";
import API from "../Urls/URL";
import home1 from "../../asstes/home.jpg";
import Roomcard from './Roomcard';

export default function House() {
   const [data,setData] = useState('');

 let {start,end,houseid}= useParams();

 let checkin=new Date(start);
  let checkout=new Date(end);
  let differnce = checkout- checkin;
  let days = differnce / (1000 * 3600 * 24) ;
  // console.log("Total days",days);
  
useEffect(()=>{
  let data = {
       checkin:start,
       checkout:end,
       houseid:houseid
  }
   let output = fetch(`${API}/house/find`,{ method:"POST",
                                           headers:{"Content-Type":"application/json"},
                                           body:JSON.stringify(data)
                                           });
          output.then(res=>res.json())
                .then(result=>{
                  // console.log("result",result);
                       setData(result.data.house);
                });                                 
},[houseid]);

//  console.log("data",data);
   
  return (
      <Fragment>
        <Navbar/>
          <div className='container mx-auto p-5 house'>
            <div className='name row'>
              <div className='p-0 col-12 col-md-5 col-xl-5 col-lg-5'>
              <img src={data.picture} alt="image..."  className='houseimage w-100 ' />
              </div>
              <div className='p-2 col-12 col-md-7 col-xl-7 col-lg-7 text-start'>
              <div style={{fontSize:"20px"}}>{data.name}</div>
              <div>Address : <span style={{fontWeight:"100"}}>{data.address}</span></div>
              <div>City: <span style={{fontWeight:"100"}}>{data.location}</span> </div>
              <div>Price per day : <span style={{fontWeight:"100"}}>&#8377; {data.price}</span> </div>
              <div>Maximum days stay : <span style={{fontWeight:"100"}}>{data.maxDays} </span> </div>
              <div>Minimum days Stay : <span style={{fontWeight:"100"}}>{data.minDays} </span> </div>
              <div>Total rooms: <span style={{fontWeight:"100"}}>{data.rooms?.length}</span> </div>
              <div>Ratings: <span style={{fontWeight:"100",color:"gold"}}><i className='bi bi-star-fill'></i> {data.ratings} </span> </div>
              <div>{data.distance} km from the center of the city</div>
              </div>
            </div>
            <div className="roomlist mt-3 container">
            <div className='p-2'>Book your ROOMS</div>
            <div className=''>
              {
                data.rooms?.length > 0  && data.rooms.map(items=><Roomcard key={items._id} value={items._id} data={items} days={days+1} checkin={start} checkout={end} house={data}></Roomcard>)
              }
                 
            </div>
                
            </div>
          </div>
      </Fragment>
  )
}
