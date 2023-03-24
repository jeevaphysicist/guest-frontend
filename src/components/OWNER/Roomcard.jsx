import React, { Fragment,useEffect,useState } from 'react';
import home1 from "../../asstes/home.jpg";
import home2 from "../../asstes/houses2.png";
import home3 from "../../asstes/house3.jpg";
import home4 from "../../asstes/houe4.jpg";
import Modal from "react-modal";
import API from '../Urls/URL';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontWeight:"bolder",
    color:"#64748b",
  },
};
Modal.setAppElement("#root");

export default function Roomcard(props) {
    const [image,setImage] = useState(false);
    const [update,setUpdate] = useState(false);
    const [value,setValue] = useState(null);
    const [picture,setPicture] = useState("");
    const [updatemax,setUpdatemax] = useState('');
    const [updatemin,setUpdatemin] = useState('');
    const [updateprice,setUpdateprice] = useState('');

    useEffect(()=>{
           if(props.data.images?.length > 0)
             setImage(props.data.images[0]);
    },[]);
     console.log(props.data);
    const displayimage = (data) =>{
        // console.log(data.target.currentSrc);
        setImage(data.target.currentSrc);
      }

      // update handler
      const updatehandle = (e)=>{
        e.preventDefault();
        const data = {
          price:updateprice,
          maxDays:updatemax,
          minDays:updatemin
        }
           fetch(`${API}/room/update/${props.data._id}`,{method:"PUT",
                                  headers:{"Content-Type":"application/json"},
                                  body:JSON.stringify(data)
                                })
           .then(res=>res.json())
           .then(result=>{console.log("result",result)
               if(result.data != undefined){
                  window.location.reload();
               }
              });
        // console.log("update room date",data);

        // console.log("update handler !!!!");

      }
      // delete handler
      const deletehandle = ()=>{
        let data ={};
        console.log("delete handler !!!!");
        fetch(`${API}/room/delete/${props.data._id}`,{method:"PUT",
                                  headers:{"Content-Type":"application/json"},
                                  body:JSON.stringify(data)
                                })
           .then(res=>res.json())
           .then(result=>{             
                  window.location.reload();
              });
      }

      // upload photos 
      const file =(picture,e)=>{
        e.preventDefault();
        let document ;
            //  console.log("pictire",picture);
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
            //  console.log("Photo is updated");
            //  console.log("roomid",props.data._id);
             let data = {
               houseid: props.houseid,
               roomid: props.data._id,
               image: document
             }
             let options = {
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify(data)
            }
            //  console.log("update photo",data);
            let output = fetch(`${API}/image/uploadimage`,options);
              output.then(res=>res.json())
              .then(result=>{
                // console.log("result",result);
                if(result.data != undefined)
                  window.location.reload();
              })
            }
            else{
              alert("please upload photos less then 10mb");
            }
          }
      }


      // create image list 
      
     const imagelist = props.data.images.length >0 && props.data.images.map((img,index)=><img src={img} alt="image..." className='thumb' onClick={(e)=>{displayimage(e)}} key={index} />);
    

  return (
   <Fragment>
          <div className='row list my-3'>
                    <div className='col-12 col-md-6 col-lg-6 col-xl-6 row'>
                      <div className='col-lg-8 col-xl-8 col-md-8 col-12 p-0'><img src={image} alt="image..." className='roomimg mx-auto' /></div>
                      <div className='col-lg-4 col-xl-4 col-md-4 col-12'>
                        <div>images</div>
                        <div className='scroll'>
                        {
                          imagelist
                        }
                        </div>
                        <div>Calender : </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-4 col-lg-4 col-xl-4 '>
                     <div className='mt-2'>Room Name : <span style={{fontWeight:"100"}}>{props.data.name} </span> </div>
                     <div className='mt-2'>Price per day : <span style={{fontWeight:"100"}}>{props.data.price} </span> </div>
                     <div className='mt-2'>Floor Size : <span style={{fontWeight:"100"}}>{props.data.floorsize}  feet</span> </div>
                     <div className='mt-2'>Available bed : <span style={{fontWeight:"100"}}>{props.data.beds} </span> </div>
                     <div className='mt-2'>Maximum days stay : <span style={{fontWeight:"100"}}>{props.data.maxDays} </span> </div>
                     <div className='mt-2'>Minimum days Stay : <span style={{fontWeight:"100"}}>{props.data.minDays} </span> </div>
                     <div className='mt-2'>Faciliteis : <span style={{fontWeight:"100"}}>{props.data.amenities} </span> </div>                
                    </div>
                    <div className='col-12 col-md-2 col-lg-2 col-xl-2 text-center'>
                      <button className='btn btn-success btn-block  booking my-3' onClick={()=>{setUpdate(true);}}>Update Room</button>
                      <button className='btn btn-danger btn-block  booking my-3' onClick={()=>{deletehandle()}}>Delete Room</button>
                      <form onSubmit={(e)=>file(picture,e)}>
                      <label htmlFor="formFileLg" className="form-label">Upload Photo</label>
                      <input className="form-control form-control-lg" id="formFileLg" required type="file" accept="image/png, image/jpg, image/jpeg" onChange={(e)=>setPicture(e.target.files[0])} />
                      <input className="btn btn-block btn-warning" type="submit" value="Upload" />
                      </form>
                    </div>
                  </div>
           {/* update room  modal */}

           <Modal 
           isOpen={update}
           style={customStyles}>
            <i className="bi bi-arrow-left-square" onClick={()=>{setUpdate(false)}}></i>
            <div>
              <form onSubmit={(e)=>updatehandle(e)}>
                <label htmlFor="a">Price : </label>
                <input type="number" id="a" placeholder='price per day' value={value} required onChange={(e)=>{setUpdateprice(e.target.value)}} /><br/><br/>
                <label htmlFor="a1">Minimum day : </label>
                <input type="number" id="a1" placeholder='Minimum day' value={value}  required onChange={(e)=>{setUpdatemin(e.target.value)}} /><br/><br/>
                <label htmlFor="a2">Maximum day : </label>
                <input type="number" id="a2" placeholder='Maximum day' value={value}  required onChange={(e)=>{setUpdatemax(e.target.value)}} /><br/><br/>
                <input type="submit" value="update" className='btn btn-block btn-success' />
              </form>
            </div>
           </Modal>

   </Fragment>
  )
}
