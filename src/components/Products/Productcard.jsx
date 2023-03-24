import React,{Fragment} from 'react';
import "./Product.css";
import {Link} from "react-router-dom";
import home1 from "../../asstes/home.jpg";
import home2 from "../../asstes/houses2.png";
import home3 from "../../asstes/house3.jpg";
import home4 from "../../asstes/houe4.jpg"

export default function Productcard(props) {
  // console.log("start Date",props.checkin);
  // console.log("End Date",props.checkout);
  return (
    <Fragment>
      {  props.data.length >0 && props.data.map(items=><div className='col-12 col-md-6 col-lg-4 col-xl-4 text-center my-3 productcard' key={items._id}>
          <Link to={`/house/${props.checkin}/${props.checkout}/${items._id}`} style={{textDecoration:"none"}} >
                <div className="card mx-auto text-center" style={{width: "18rem"}}>
                   <img src={items.picture} className="card-img-top" alt="..."/>
                  <div className="card-body row">
                    <div>{items.name}</div>
                    <div className='col-5'>
                        <div className='mt-2'>Address :</div>
                        <div className='mt-2'>Ratings :</div>
                        <div className='mt-2'>Location :</div>
                        <div className='mt-2'>Price/day :</div>
                        <div className='mt-2'>Min -Max days  :</div>
                    </div>
                    <div className='col-7'>
                         <div className="mt-2 address text-start">{items.address} </div>
                         <div className='mt-2 text-start' style={{color:"gold"}}><i className="bi bi-star-fill" ></i>&nbsp;{items.ratings}</div>
                         <div className='mt-2 text-start'>{items.location}</div>
                         <div className='mt-2 text-start'>&#8377;{items.price}</div>
                         <div className='mt-2 text-start'> {items.minDays} - {items.maxDays} days</div>
                    </div>
                  </div>
                </div>
          </Link>
            </div>
)}
   </Fragment>
  )
}
