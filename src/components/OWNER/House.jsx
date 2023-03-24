import React,{Fragment,useState,useEffect} from 'react';
import "../House/House.css";
import Modal from "react-modal";
import Roomrecords from "../Records/Roomrecords";
import API from "../Urls/URL";
import home1 from "../../asstes/home.jpg";
import home2 from "../../asstes/houses2.png";
import home3 from "../../asstes/house3.jpg";
import home4 from "../../asstes/houe4.jpg"
import Roomcard from './Roomcard';

Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom:'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
   fontWeight:"bolder",
   color:"#64748b",
   padding:"60px"
  },
}

const customStyles1 = {
  overFlowX:"scroll",
  // content: {
  //   marginTop: '10%',
  //   left: '50%',
  //   marginRight: '-50%',
  //   marginBottom :"0%",
  //   transform: 'translate(-50%, -50%)',
  //  fontWeight:"bolder",
  //  color:"#64748b",
  
  // },
  heigth:"100vh"
}



export default function House(props) {
   const [createroom,setCreateroom]  = useState(false);
   const [roomname,setRoomname]  = useState("");
   const [price,setPrice]  = useState("");
   const [maxdays,setMaxdays]  = useState("");
   const [mindays,setMindays]  = useState("");
   const [floorsize,setFloorsize]  = useState("");
   const [facilities,setFacilities]  = useState("");
   const [beds,setBeds]  = useState("");
   const [recordmodal,setRecordmodal] = useState(false);
   const [roomshowmodal,setshowroomdmodal] = useState(false);
   const [data,setData] = useState("");


  //  create room handler
  const createroomehandle =(e)=>{
    e.preventDefault();
    const data = {
        houseid:props.data._id,
        name:roomname,
        price:price,
        amenities:facilities,
        bed:beds,
        floorsize:floorsize,
        maxDays:maxdays,
        minDays:mindays,
    }
    console.log("data = ",data);
    let options = {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
    }
   
     let output = fetch(`${API}/room/createroom/${props.data._id}`,options);
             output.then(res=>res.json())
                   .then(result=>{
                      console.log("result",result);
                      
                        window.location.reload();
                   })     
    // console.log("create room handler !!!!!");
  }

  const Apicall = (id)=>{
          let output = fetch(`${API}/house/getdetails/${id}`,{method:"GET"});
          output.then(res=>res.json())
                    .then(result=>setData(result.data.house.rooms));
  }
 
  //  console.log("data",data);

   const deletehandler = (id)=>{
 
               fetch(`${API}/house/delete/${id}`,{method:"GET"})
               .then(res=>res.json())
               .then(result=>window.location.reload());
   }




  return (
      <Fragment>
        
          <div className='container mx-auto p-5 house'>
            <div className='name row'>
              <div className='p-0 col-12 col-md-5 col-xl-5 col-lg-5'>
              <img src={props.data.picture} alt="image..."  className='houseimage w-100 mb-3 ' />
              <button className='w-100 btn btn-block btn-danger' onClick={()=>deletehandler(props.data._id)}>Delete House</button>
              </div>
              <div className='p-2 col-12 col-md-7 col-xl-5 col-lg-5 text-start'>
              <div style={{fontSize:"20px"}}>{props.data.name}</div>
              <div >Address : <span style={{fontWeight:"100"}}>{props.data.address}</span></div>
              <div>City: <span style={{fontWeight:"100"}}>{props.data.location}</span> </div>
              <div>Price per day : <span style={{fontWeight:"100"}}>&#8377; {props.data.price}</span> </div>
              <div>Maximum days stay : <span style={{fontWeight:"100"}}>{props.data.maxDays} </span> </div>
              <div>Minimum days Stay : <span style={{fontWeight:"100"}}>{props.data.minDays} </span> </div>
              <div>Total rooms: <span style={{fontWeight:"100"}}>{props.data.rooms?.length} </span> </div>
              <div>Ratings: <span style={{fontWeight:"100",color:"gold"}}><i className='bi bi-star-fill'></i> {props.data.ratings}.5 </span> </div>
              <div>{props.data.distance} km from the center of the city</div>
              </div>
              <div className='py-5 col-12 col-md-12 col-xl-2 col-lg-2 text-center'>
                   <button className='btn btn-block btn-success my-3 mx-3' onClick={()=>{setCreateroom(true)}}>Create Room</button>
                   <button className='btn btn-block btn-warning my-3 mx-3' onClick={()=>{setRecordmodal(true);Apicall(props.data._id);}}>Records</button>
                   <button className='btn btn-block btn-warning my-3 mx-3' onClick={()=>{Apicall(props.data._id);setshowroomdmodal(true);}}>Show Rooms</button>
              </div>
            </div>
            <div className="roomlist mt-3 container">
            {/* <div className='p-2'> Your ROOMS</div> */}
            <div className=''>
              <Modal isOpen={roomshowmodal}
              style={customStyles1}>
                <i className="bi bi-arrow-left-square-fill" onClick={()=>setshowroomdmodal(false)}></i><br/><br/>
                <div className='my-3'> YOUR ROOMS</div>
                {
                  data?.length > 0 ?  data.map(items=><Roomcard data={items} houseid={props.data._id} key={data._id} />)   : <div className='my-3' style={{fontWeight:"bolder",color:"red"}}>No rooms is there ,please create your rooms</div> 
                }
             

              </Modal>
             
                
                
            </div>
                
            </div>
          </div>
          {/* create room Modal */}
          <Modal isOpen={createroom} 
            style={customStyles}>
               <i className="bi bi-arrow-left-square" onClick={()=>{setCreateroom(false)}}></i>
               <form onSubmit={(e)=>createroomehandle(e)}>
                <label htmlFor="a">Room Name: </label><br/>
                <input type="text" id="a" placeholder='room name' required onChange={(e)=>{setRoomname(e.target.value)}} /><br/><br/>
                <label htmlFor="a1">Price per day : </label><br/>
                <input type="number" id="a1" placeholder='Price per day'  required onChange={(e)=>{setPrice(e.target.value)}} /><br/><br/>
                <label htmlFor="a2">Minimum days : </label><br/>
                <input type="number" id="a2" placeholder='Minimum days'   required onChange={(e)=>{setMindays(e.target.value)}} /><br/><br/>
                <label htmlFor="a3">Maximum days : </label><br/>
                <input type="number" id="a3" placeholder='Maximum days'   required onChange={(e)=>{setMaxdays(e.target.value)}} /><br/><br/>
                <label htmlFor="a4">Floor Size: </label><br/>
                <input type="text" id="a4" placeholder='Floor Size on feet' required onChange={(e)=>{setFloorsize(e.target.value)}} /><br/><br/>
                <label htmlFor="a5">No.Of.Beds: </label><br/>
                <input type="number" id="a5" placeholder='no OF Beds' required onChange={(e)=>{setBeds(e.target.value)}} /><br/><br/>
                <label htmlFor="a6">Facilities: </label><br/>
                <input type="text" id="a6" placeholder='facilities' required onChange={(e)=>{setFacilities(e.target.value)}} /><br/><br/>
                <input type="submit" value="Create Room" className='btn btn-block btn-success' />
              </form>
          </Modal>
          {/* House records  */}
          <Modal isOpen={recordmodal}
            style={customStyles}>
               <i className="bi bi-arrow-left-square" onClick={()=>{setRecordmodal(false)}}></i>
               <div className='my-5'> Room records </div> 
               {data?.length >0 && data.map(items=> <Roomrecords key={data.id} data={items}></Roomrecords>)}
            

          </Modal>
      </Fragment>
  )
}
