import React, { Fragment,useEffect,useState } from 'react';
import home1 from "../../asstes/home.jpg";
import home2 from "../../asstes/houses2.png";
import home3 from "../../asstes/house3.jpg";
import home4 from "../../asstes/houe4.jpg";
import Modal from "react-modal";
import API from '../Urls/URL';
import { useNavigate } from 'react-router-dom';
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
};
Modal.setAppElement("#root");

export default function Roomcard(props) {
    const [image,setImage] = useState(false);
    const [isopen,setIsopen] = useState(false);
    const [pay,setPay] = useState(false);
    const [data,setData]=useState('');
    const [name,setName] = useState('');
    const [email,setEmail]=useState('');
    const [total,setTotal] = useState('');
    const [querydate,setQuerydate] = useState('');
    const [unavailabel,setUnavailabel] = useState('');
    const [dates,setDates] = useState('');
    const [user,setUser] = useState("");
    const [login,setLogin] = useState(false);
       
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
      function getDates (startDate, endDate) {
        const dates = []
        let currentDate = startDate
        const addDays = function (days) {
          const date = new Date(this.valueOf())
          date.setDate(date.getDate() + days)
          return date;
        }
        while (currentDate <= endDate) {
          dates.push(currentDate.toLocaleDateString())
          currentDate = addDays.call(currentDate, 1)
        }
        return dates
      }
      
      // Usage
      const dates = getDates(new Date(props.checkin), new Date(props.checkout));
      // console.log("dates",dates);
      setQuerydate(dates)
     },[])
    //  console.log("query date",querydate);

    useEffect(()=>{
             setImage(props?.data.images[0]);
             setData(props.data);
             let totaldates = props.data.unavialableDates ;
            //  2d array to 1d array
             var newArr = []
             for(var i = 0; i < totaldates.length; i++)
              {
                 newArr = newArr.concat(totaldates[i]);
              }
             setUnavailabel(newArr);        
    },[props.data]);
        // console.log("unavailabel dates",unavailabel);
     

        useEffect(()=>{
          if(querydate.length > 0 && unavailabel.length > 0 ){
          let filterdates = querydate?.filter(element=>unavailabel.includes(element));
                // console.log("filter dates",filterdates);
                setDates(filterdates);
          }
        },[querydate,unavailabel])
  //  console.log("filterdates",dates);
    





    const displayimage = (data) =>{
        // console.log(data.target.currentSrc);
        setImage(data.target.currentSrc);
      }

     const bookinghandle = ()=>{
        if(login){
            // console.log("login true means ");
            // console.log("show the modal");
            setIsopen(true);
        }
        else{
            // console.log("redirect to login page");
            navigate('/login');
        }
     } 
    const  proceedhandler = ()=>{
      if(true == true){
        setIsopen(false);
        setPay(true);
      }
    }

    const handlepayment = ()=>{
        loadscript('https://checkout.razorpay.com/v1/checkout.js');  
       }

       const loadscript = (rzscript)=>{
        return new Promise((resolve)=>{
          let script = document.createElement('script');
          script.src = rzscript;
          script.onload = ()=>{
                              openrazerpay(); 
                              resolve(true)
                              }
          script.onerror=()=>{
                             resolve(false)
                             }
         document.body.appendChild(script);
         });
      }

      const openrazerpay = async()=>{
        // console.log("open razer pay !!!!!");
       let totalprice = props.days * props.data.price ;
        try{
          let orderData;
          orderData = await fetch(`${API}/payment`,{method:'POST',
          headers :{'Content-Type' : 'application/json'},
          body:JSON.stringify({amount:totalprice}) })
          .then(response=>response.json());

       const options={
                     key :"rzp_test_BsGSW4LpkffpL9",
                     amount: orderData.amount,
                     order_id: orderData.id,
                     curreny:orderData.curreny,
                     name : "Guest Room booking application ",
                     prefill:{
                      email:email,
                      },
                     handler:function(response){
                      //  console.log('response : ',response.razorpay_order_id);
                       fetch(`${API}/payment/savetransaction`,{method:'POST',
                                                                     headers:{"Content-Type":"application/json"},
                                                                      body:JSON.stringify({
                                                                       razorpay_orderid: response.razorpay_order_id,
                                                                       razorpay_paymentid : response.razorpay_payment_id,
                                                                       razorpay_signature: response.razorpay_signature ,
                                                                      razorpay_amount:orderData.amount                            
                                                                     })
                                                                   }).then(response=>response.json())
                                                                    .then(data=>{
                                                                      // console.log(data);
                            
                                                                          let data1 = {email:email,
                                                                                    name:name,
                                                                                    totalprice:totalprice,
                                                                                    location:props.house.location,
                                                                                    housename:props.house.name,
                                                                                    roomno:props.data.name,
                                                                                    checkin:props.checkin,
                                                                                    checkout:props.checkout,
                                                                                    address:props.house.address,
                                                                                    roomid:props.data._id
                                                                                    }
                                                                                    fetch(`${API}/payment/sendemail`,{method:'POST',
                                                                     headers:{"Content-Type":"application/json"},
                                                                      body:JSON.stringify(data1)
                                                                   }).then(response=>response.json())
                                                                    .then(result=>console.log(result));
                                                                      });
                                                                     navigate('/');
                     }        
                    }
       const paymentWindow = new window.Razorpay(options);
       paymentWindow.open()
       }
       catch(error){
                   console.log(error);
                   }

     }


      
  return (
   <Fragment>
          <div className='row list my-3'>
                    <div className='col-12 col-md-6 col-lg-6 col-xl-6 row'>
                      <div className='col-lg-8 col-xl-8 col-md-8 col-12 p-0'><img src={image} alt="image..." className='roomimg mx-auto' /></div>
                      <div className='col-lg-4 col-xl-4 col-md-4 col-12'>
                        <div>images</div>
                        <div className='scroll'>
                          {
                            data.images?.length > 0 && data.images.map((items,index)=><img src={items} alt="image..." className='thumb' onClick={(e)=>{displayimage(e)}} key={index} />)
                          }
                       
                        </div>
                        <div>Calender : </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-4 col-lg-4 col-xl-4 '>
                     <div className='mt-2'>Room Name : <span style={{fontWeight:"100"}}>{data.name} </span> </div>
                     <div className='mt-2'>Price per day : <span style={{fontWeight:"100"}}>{data.price} </span> </div>
                     <div className='mt-2'>Floor Size : <span style={{fontWeight:"100"}}>{data.floorsize}  feet</span> </div>
                     <div className='mt-2'>Available bed : <span style={{fontWeight:"100"}}>{data.bed} </span> </div>
                     <div className='mt-2'>Maximum days stay : <span style={{fontWeight:"100"}}>{data.maxDays} </span> </div>
                     <div className='mt-2'>Minimum days Stay : <span style={{fontWeight:"100"}}>{data.minDays} </span> </div>
                     <div className='mt-2'>Faciliteis : <span style={{fontWeight:"100"}}> {data.amenities} </span> </div>                
                    </div>
                    <div className='col-12 col-md-2 col-lg-2 col-xl-2 text-center'>
                      <button className='btn btn-success btn-block  booking my-3' onClick={()=>{bookinghandle()}}>Book Your Room</button>
                      <div>{ dates.length > 0 ?<span style={{color:"red"}}>unavailable</span>:<span style={{color:"green"}}>Available</span>}</div>
                    </div>
                  </div>
        <Modal
        isOpen={isopen}
        style={customStyles}
        >
          <div>
            {
              dates?.length > 0 ?
               <div style={{fontWeight:'bolder'}}>
                 <div className='text-primary my-3'>From your dates some are unavailable </div>
                 <div className='my-3'>so, please select available dates </div>
                 <div className="my-3"> Unavailable dates : 
                  <div className='my-3'>{dates.map(items=><div key={items}>{items} , </div>)}</div>
                 </div>
              </div>
                :
                <div style={{fontWeight:'bolder'}} > 
                     <form onSubmit={()=>proceedhandler()}>
                      <div className="my-3">{props.house.name} </div>
                     <div className='my-3'> Room Name : {props.data.name} </div>
                     <div className='my-3'>{props.house.address}</div>
                    
                     <div>Name: <input type="text" required onChange={(e)=>{setName(e.target.value)}} /></div>
                     <div className='my-3'>Check in : {props.checkin}</div>
                     <div className='my-3'>Check out : {props.checkout}</div>
                     <div className='my-3'>Total members : <input type="number" required onChange={(e)=>{setTotal(e.target.value)}} /></div>
                    <div className='my-3'>Email : <input type="email" required onChange={(e)=>{setEmail(e.target.value)}} /></div>
                    <div className='my-3'> Total Amount : &#8377; {data.price * props.days}
                    <input className='btn btn-block btn-success' style={{float:"right "}} type="submit" value="Proceed" />
                    </div>
                    </form>
                </div>
            }

          </div>
          
         <button className='btn btn-block btn-danger my-3' onClick={()=>{setIsopen(false)}}>Close</button>
        </Modal>

        <Modal
         isOpen={pay}
         style={customStyles}>
          <button className='btn btn-block btn-danger my-5' onClick={()=>{setPay(false);setIsopen(true)}}>Back</button>
           <div className="my-3">{props.house.name} </div>
           <div className="my-3">Room Name : {props.data.name}  </div>
           <div className="my-3">Address : {props.house.address}  </div>
           <div className="my-3">Name : {name} </div>
           <div className='my-3'>Email: {email}</div>
           <div className="my-3">Check in : {props.checkin} </div>
           <div className="my-3">Check out : {props.checkout} </div>
           <div className='my-3'>Total members : {total}</div>
           <div className='my-3'>Total Amount: &#8377;{data.price * props.days}<br/> <button className="my-3 btn btn-block btn-success" style={{float:"right"}} 
           onClick={()=>{setPay(false); handlepayment()}}>Pay Now</button> </div>
          <button className=" btn btn-block btn-danger my-3" onClick={()=>{setPay(false)}}>Close</button>
        </Modal>

   </Fragment>
  )
}
