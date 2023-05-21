import React,{useEffect, useState} from "react";
import { Card } from 'antd';
import { Tabs } from 'antd';
import axios from 'axios'
import Loader from "../components/Loader";
import Error from "../components/Error";

const { TabPane } = Tabs;

function Profilescreen() {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        
       if(!user){
        window.location.href="/login"
       }
    }, []);
  return (
    <div className="container mt-3 ">
     <Tabs defaultActiveKey="1" className="float-left" >
    <TabPane tab="Profile" key="1">
      <h5>Name : {user.name}</h5>
      <h5>Email : {user.email}</h5>
      <h5>isAdmin : {user.isAdmin ? "YES" : "NO"}</h5>
    </TabPane>
    <TabPane tab="My Bookings" key="2">
      <Mybookings/>
    </TabPane>
    
  </Tabs>
    </div>
  );
}


export function Mybookings (){
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState();
    const [error, seterror] = useState();
  
    useEffect(() => {
    async function fetchData() {
      try {
        setloading(true)
        const rooms =  (await axios.post('/api/bookings/getbookingsbyuserid' , {userid : user._id})).data

        console.log(rooms);
        setbookings(rooms)
        setloading(false);
      } catch (error) {
        console.log(error)
        setloading(false)
        seterror(true)
      }
    }
    fetchData();
  }, []);
  return (
    <div className="container-fluid">
    {loading && <Loader/>}
    {bookings && bookings.map((booking) => {
        return<>
              <Card size='small'  style={{  boxShadow:"1px 1px 1px 1px grey",margin:"10px"}}>
      <h5>{booking.room}</h5>
      <hr />
      <p className="m-0"><b>Booking Id: </b> {booking._id}</p>
      <p className="m-0"> <b>Check In: </b> {booking.fromdate}</p>
      <p className="m-0"> <b>Check Out: </b>{booking.todate}</p>
      <p className="m-0"> <b>Amount: </b>{booking.totalamount}</p>
      <p className="m-0"> <b>Status: </b>{booking.status == "booked" ? "CONFIRMED" : "CANCELLED"}</p>
      <button style={{float: "right"}} className="btn btn-dark">Cancel Booking</button>
    </Card>
           </>
    
    })}
     
    </div>
  )
}

export default Profilescreen


