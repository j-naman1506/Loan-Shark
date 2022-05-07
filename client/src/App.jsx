import "./static/templates/styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/Components/LoginComps/login";
import Navbar from "./Components/NavbarComps/Navbar";
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
          />  */}
          <Route path="/" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
