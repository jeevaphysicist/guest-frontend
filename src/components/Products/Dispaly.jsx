import React,{Fragment,useState,useEffect} from 'react';
import "./Product.css";
import API from "../Urls/URL";
import Productcard from './Productcard';

export default function Dispaly(props) {
    const [data,setData] = useState('');

    useEffect(()=>{
         let result = fetch(`${API}/house/location/${props.location}`,{method:"GET"});
           result.then(res=>res.json())
           .then(output=>{
            // console.log('output',output);
            setData(output.data);
           })
    },[]);

    // console.log("data",data);
  
  return (
   <Fragment>
    <div style={{backgroundColor:"white"}}>
    <div className='mx-auto display container pt-5'>
      <div className='container'>Spending your Precious time with our House</div>
        <div className='row mx-auto my-3'>               
            <Productcard checkin={props.startdate} checkout={props.enddate} data={data} />           
        </div>

    </div>
    </div>
   </Fragment>
  )
}
