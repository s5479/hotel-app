import React from "react";

function Landingscreen() {
  return (
    <div >
      <div className="jumbotron ">
        <h1 className="display-4">Welcome to Our Hotel</h1>
        <p className="lead">Experience comfort and luxury at its finest.</p>
        <hr className="my-4" />
        <p>Book your stay now and receive a 10% discount.</p>
        <a className="btn btn-dark btn-lg" href="/home" role="button">
          Book Now
        </a>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>About Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              varius metus eget magna fermentum, in ullamcorper felis tempus.
              Nunc id neque diam. Sed vel turpis eget enim molestie rutrum at
              vel neque.{" "}
            </p>
            <p>
              <a className="btn btn-dark" href="/" role="button">
                Learn More &raquo;
              </a>
            </p>
          </div>
          <div className="col-md-4">
            <h2>Our Rooms</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              varius metus eget magna fermentum, in ullamcorper felis tempus.
              Nunc id neque diam. Sed vel turpis eget enim molestie rutrum at
              vel neque.{" "}
            </p>
            <p>
              <a className="btn btn-dark" href="/home" role="button">
                View Rooms &raquo;
              </a>
            </p>
          </div>
          <div className="col-md-4">
            <h2>Our Services</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              varius metus eget magna fermentum, in ullamcorper felis tempus.
              Nunc id neque diam. Sed vel turpis eget enim molestie rutrum at
              vel neque.{" "}
            </p>
            <p>
              <a className="btn btn-dark" href="/" role="button">
                Learn More &raquo;
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landingscreen;
