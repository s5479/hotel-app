import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function Room({ room, fromdate, todate }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  console.log(user);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(room)
  return (
    <div>
      <div className="card" style={{ width: "25rem" }}>
        <img className="card-img-top" src={room.imageurls[0]} alt="room" />
        <div className="card-body">
          <h5 className="card-title"> {room.type}</h5>
          <p className="card-text">{room.name}</p>
          <p className="card-text">Rent per Day: {room.rentperday} Rs.</p>
          <p className="card-text">Phone No. : {room.phonenumber}</p>

          {(user) && (fromdate && todate) && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
            <button className="btn btn-dark mr-1">Book Now</button>
          </Link>
          )}
        
          <Button className="btn btn-dark ml-1" onClick={handleShow}>
            View Details
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100  maximage" src={url} alt="" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
