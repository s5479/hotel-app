const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const { v4: uuidv4 } = require("uuid");

const moment = require("moment");
const stripe = require("stripe")(
  "sk_test_51MplS1SHJ4Z09sXnITWYJj33UE4POawxKs24Em97H8Wb9PLD23YNeXjqdRj6gfAwLPGfL4fGTrtLtDPXwjoaVAsE00q0cnbcIi"
);

const idempontencyKey = uuidv4()
router.post("/bookroom", async (req, res) => {
  // console.log(idempontencyKey)
  const { room, userid, fromdate, todate, totalamount, totaldays, token } =
    req.body;
// console.log("hi")
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    // console.log("hello")
    const paymentIntents = await stripe.paymentIntents.create(
     
      {
      amount: totalamount * 100,
      customer: customer.id,
      currency: "inr",
      receipt_email: token.email,
      automatic_payment_methods: {
        enabled: true,
      },

     } );
    // console.log("hello1")
    if (paymentIntents) {
      // console.log("hello2")
     
        const newbooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid,
          fromdate: moment(fromdate).format("DD-MM-YYYY"),
          todate: moment(todate).format("DD-MM-YYYY"),
          totalamount,
          totaldays,
          transactionId: "1234",
        });

        const booking = await newbooking.save();

        const roomtemp = await Room.findOne({ _id: room._id });

        roomtemp.currentbookings.push({
          bookingid: booking._id,
          fromdate: moment(fromdate).format("DD-MM-YYYY"),
          todate: moment(todate).format("DD-MM-YYYY"),
          userid: userid,
          status: booking.status,
        });

        await roomtemp.save();

     
    }
    res.send("payment successful, Your room is booked");
  
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error });
  }
});

router.post('/getbookingsbyuserid', async(req, res) => {
  const userid = req.body.userid;
     
  try {
      const bookings = await Booking.find({userid : userid})
      res.send(bookings)
  } catch (error) {
    return res.status(400).json({ error });
  }
})
module.exports = router;
