import "./static/templates/styles.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Register from "../src/Components/LoginComps/Register";
import Login from "../src/Components/LoginComps/login";
import Navbar from "./Components/NavbarComps/Navbar";
import Profile from "./Components/DashboardComps/Profile";
import Application from "./Components/Application/AppHome";

function App() {
  return (
    <div className="bg-shade-0 w-screen min-h-screen overflow-x-hidden">
      <Navbar></Navbar>
      <Router>
        <Routes>
          <Route path="/" exact element={<Profile />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/app" exact element={<Application />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
