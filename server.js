const express = require("express");

const dbConfig = require("./db");
const app = express();
const path = require("path");

const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use(express.json());
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);

const port = process.env.port || 5000;

const _dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("api is running successfully");
  });
}

app.listen(port, () => console.log("node server has started using nodemon"));
