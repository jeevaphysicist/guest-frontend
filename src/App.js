import { Fragment } from "react";
import Home from "./components/Home/Home";
import {Route,Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Setdata from "./components/Setdata/Setdata";
import House from "./components/House/House";
import Upload from "./components/OWNER/Upload";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/check" element={<Setdata/>} />
        <Route path="/house/:start/:end/:houseid" element={<House/>} />
        <Route path="/owner" element={<Upload/>} />

      </Routes>
    </Fragment>
  );
}

export default App;
