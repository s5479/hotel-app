import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Profilescreen from "./screens/Profilescreen";
import Landingscreen from "./screens/Landingscreen";
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact Component={Homescreen} />
          <Route path="/book/:roomid/:fromdate/:todate" exact Component={Bookingscreen} />
          <Route path="/login" exact Component={Loginscreen} />
          <Route path="/register" exact Component={Registerscreen} />
          <Route path="/profile" exact Component={Profilescreen} />
          <Route path="/" exact Component={Landingscreen} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
