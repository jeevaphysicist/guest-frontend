import React,{Fragment,useEffect,useState} from 'react';
import "./Setdata.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Dispaly from '../Products/Dispaly';
// import Navbar from "../Navbar/Navbar";
// import {useNavigate} from "react-router-dom";

export default function Setdata() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [date,setDate]= useState(null);
  const [end,setEnd] = useState(null);
  const [value,setValue] =useState("");
  const [setter,setSetter] = useState(false);

  //  let navigate = useNavigate();


 useEffect(()=>{
  Date.prototype.addDay = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
   if(startDate != null)
   {
    let max = startDate;
    max = max.addDay(1);
    max = max.toISOString().split('T')[0] ;
   setDate(max);
   }
   if(endDate != null)
   {
    let max =endDate;
    max = max.addDay(1);
    max = max.toISOString().split('T')[0];
    setEnd(max);
   }
 },[startDate,endDate])
  // console.log("startdate",startDate);
  // console.log("enddate",endDate);
 

  const handler = ()=>{
     if(value != "" && date!=null && end!=null){
      setSetter(true);
     }
  }
 
  return (
   <Fragment>
     <div className='back'>
    <div className='row data  mx-auto container-fluid'>
      <div className='col-12 col-md-1 col-lg-2 col-xl-2 my-3'></div>
      <div className='col-12 col-md-3 col-lg-3 col-xl-3 my-3'>
        <span  className='value'>Location</span><br/>
         <select onChange={(e)=>setValue(e.target.value)} >
         <option value="select a value" selected disabled>- select a location - </option>
          <option value="coimbatore">coimbatore</option>
          <option value="chennai">chennai</option>
          <option value="vellore">vellore</option>
          <option value="tiruchirapalli">tiruchirappalli</option>
         </select>
      </div>
      <div className='col-12 col-md-4 col-lg-3 col-xl-3 my-3'>
      <span  className='value'>Select Staying Date :</span>
      <DatePicker
      minDate={new Date()}
      placeholderText='click here to get calender'
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      withPortal
    /></div>
      <div className='col-12 col-md-2 col-lg-2 col-xl-2 my-3'><span className='value'>check in : </span>{date == null? "?" : <span>{date}</span>}</div>
      <div className='col-12 col-md-2 col-lg-2 col-xl-2 my-3'><span  className='value'>check out : </span>{end == null? "?" : <span>{end}</span>}</div>
    </div>
    <div className='row container-fluid mx-auto'>
      <div className='col-12 text-center mb-3 '><button className='btn btn-block btn-success px-5' onClick={()=>handler()}>Go and get you house</button></div>
    </div>
   
    {setter ? <Dispaly startdate={date} enddate = {end} location={value}  /> : "" }
    </div>
  
     </Fragment>
  )
}
