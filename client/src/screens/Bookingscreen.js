import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './Bookingscreen.css';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import swal from 'sweetalert';


function Bookingscreen() {
  let match = useParams();
  // console.log(match)
  const [room, setroom] = useState();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  // const roomid = match.roomid;
  const fromdate = moment(match.fromdate, 'DD-MM-YYYY');
  const todate = moment(match.todate, 'DD-MM-YYYY');

  // console.log(fromdate)
  const totaldays = moment.duration(todate.diff(fromdate)).asDays()+1;
  
 const [totalamount, settotalamount] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        const data = (await axios.post("/api/rooms/getroombyid", {roomid : match.roomid})).data;
        setroom(data);
        // console.log(data)
        settotalamount(data.rentperday * totaldays)
        setloading(false);
       
      } catch (error) {
        seterror(true);
        console.log(error);
        console.log(room)
        setloading(false);
      }
    }
    fetchData();
  }, []);




   async function onToken(token)  {
    // console.log(token)
    const bookingDetails = {
      token,
      room,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays
    }
    try {
      setloading(true)
      const result = await axios.post('/api/bookings/bookroom', bookingDetails)
      setloading(false)
      swal('Congratulations','Your Room Booked Successfully','success').then(result => {
        window.location.href = '/home'
      });
      // console.log(result.data)
    } catch (error) {
      setloading(false)
      swal('Oops!','Something went wrong','error');

      console.log(error)
    }
  }
 
  return (
   <div className="container">
      <div
        className="row  mt-3"
        
      >
        {loading ? (
          <h1 ><Loader /></h1>
        ) : room ? (
         <>
            <div className="card flex-row justify-content-betweem align-items-center mycard  " style={{ width: "70rem",height:"75vh" }} >
             
               
                <div className="p-3  w-50 h-75">
                  <h5 className="card-title text-left">{room.name}</h5>
                  <img src={room.imageurls[0]} class="minimage p-3 imagefluid" alt=""/>
                </div>
               
              
                <div className="p-5 w-50 myclass">
                 <div>
                      <h4>Booking Details</h4>
                      <hr />
                      <p >Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                      <p>From Date : {match.fromdate}</p>
                      <p>To Date : {match.todate} </p>
                      <p>Max Count : {room.maxcount}</p>
                     
                      </div>
                      <div>
                    <h5 className="mt-1 mb-0">Amount</h5>
                    <hr />
                    <p>Total Days : {totaldays} </p>
                    <p>Rent Per Day : {room.rentperday} </p>
                    <h5>Total Amount : {totalamount}</h5>
                                
                       <StripeCheckout    token={onToken} currency='INR' amount={totalamount * 100}
                            stripeKey="pk_test_51MplS1SHJ4Z09sXnpJaDmCEzbTB51awVlnkOhyuD5QSOAlsV0zycwpK5fbMACvBbB2csbMAdHu1W6JV2zOQLwe280004vdb1lL"> <button  className="btn btn-dark">Pay Now</button></StripeCheckout>
                    </div>
                  </div>
            </div></>
        ) : (
          <Error />
        ) }
      </div>
    </div>


    
  );
}

export default Bookingscreen;
