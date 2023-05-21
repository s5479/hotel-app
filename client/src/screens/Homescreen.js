import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from 'moment'

import { DatePicker } from 'antd';


const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([])
  const [searchkey, setserchkey] = useState();
  const [type, settype] = useState('all');

  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setduplicaterooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    }
    fetchData();
  }, []);

  function filterByDate(dates){
   
    setfromdate(moment(dates[0].format("DD-MM-YYYY"))._i)
    settodate(moment(dates[1].format("DD-MM-YYYY"))._i)
    
     console.log(moment(dates[0]),"DD-MM-YYYY")
     console.log(moment(dates[1]).format("DD-MM-YYYY"))
     console.log(dates[0])
   
    var temprooms = [];

    var availability = false;

    for(const room of duplicaterooms){
      if(room.currentbookings.length > 0 ){
        for(const booking of room.currentbookings){
          if(!moment(moment(dates[0].format("DD-MM-YYYY"))._i).isBetween(booking.fromdate, booking.todate)
             &&  !moment(moment(dates[1].format("DD-MM-YYYY"))._i).isBetween(booking.fromdate, booking.todate)
          ){
             if(moment(dates[0].format("DD-MM-YYYY"))._i  !== booking.fromdate &&
                 moment(dates[0].format("DD-MM-YYYY"))._i  !== booking.todate  &&
                 moment(dates[1].format("DD-MM-YYYY"))._i  !== booking.fromdate &&
                 moment(dates[1].format("DD-MM-YYYY"))._i  !== booking.todate
             ){
                 availability =true;
             }
          }
        }
      }

         if(availability === true || room.currentbookings.length === 0){
          temprooms.push(room)
         }
         setrooms(temprooms)
    }
  }

  function filterBySearch(){
     const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
     setrooms(temprooms)
  }
  function filterByType(e){
    settype(e)
    if(e!=='all'){
      const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() === e.toLowerCase())
    setrooms(temprooms)
    }else{
      setrooms(duplicaterooms)
    }
  }
  return (
    <div className="container mt-5 ">
      
        <div className="row  p-2 justify-content-center m-auto" style={{boxShadow:"1px 1px 3px 1px grey",borderRadius:"5px",width:"90%"}}>
          <div className="col-md-3 m-1 mr-3 p-0 ">
           <RangePicker format='DD-MM-YYYY' onChange={filterByDate}  />
          </div>
          <div className="col-md-3 m-1">
           <input value={searchkey} onChange={((e)=>{setserchkey(e.target.value)})} onKeyUp={filterBySearch} type="text" className="form-control" placeholder="Search Room" />
          </div>
          <div className="col-md-3 m-1 ">
          <select class="form-select form-control p-2 w-100" aria-label="Default select example" value={type} onChange={(e)=>{
            filterByType(e.target.value)
 }}>
            
            <option value="all" >All</option>
            <option value="standard room">Standard Room</option>
            <option value="premium room">Premium Room</option>
          </select>
          </div>
        </div>

     <div
        className="row justify-content-center mt-3 "
      
      >
        {loading ? (
          <h1><Loader /></h1>
        ) :  (
          rooms.map((room) => {
            return (
              <div className=" m-4" style={{ display: "flex" }}>
                <Room room={room} fromdate={fromdate} todate={todate}/>
              </div>
            );
          })
        ) }
      </div>
    </div>
  );
}

export default Homescreen;
