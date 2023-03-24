import React,{Fragment} from 'react';
import "./Roomrecords.css";

export default function Roomrecords(props) {
  //  console.log("props",props.data.records);
  return (
        <Fragment>
              <div className='container-fluid row'>
                <div className='col-12'>
                <p >
               <button className="btn btn-success" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseWidthExample${props.data.name}`} aria-expanded="false" aria-controls={`collapseWidthExample${props.data.name}`}>
                 Room Name :{props.data.name}
               </button>
             {/* <button className='btn btn-block btn-danger' style={{float:"right"}}>Delete Records</button> */}
              </p>
        <div style={{minHeight: "120px"}}>
         <div className="collapse collapse-horizontal" id={`collapseWidthExample${props.data.name}`}>
           {
            props.data.records?.length > 0 && props.data.records.map((items,index)=> <div key={index} className="card card-body" style={{width: "300px"}}>
                  <div>username :{items.name}</div>
                  <div>Email:{items.email}</div>
                  <div>Dates :{items.dates?.length > 0 && items.dates.map((post,index)=><span key={index}>{post}</span>)}</div>
                 </div>)
           }
         </div>
        </div>
                </div>   
              </div>
        </Fragment>

  );
   
}
