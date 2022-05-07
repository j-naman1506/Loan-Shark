import "./static/templates/styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/Components/LoginComps/login";
import Register from "../src/Components/LoginComps/Register";
import Navbar from "./Components/NavbarComps/Navbar";
import Home from "./Components/DashboardComps/Home";
import HandleLogin from "./Components/LoginComps/HandleLoginPanels";
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Router>
        <Routes>
          {/* <Route
            path="/login"
            exact
            render={(props) => <HandleLogin loginPanel {...props} />}
          />
          <Route
            path="/register"
            exact
            render={(props) => <HandleLogin {...props} />}
          /> */}
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
