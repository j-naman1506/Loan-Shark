import "./static/templates/styles.css";

import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";

import Application from "./Components/Application/AppHome";
import Login from "../src/Components/LoginComps/login";
import Navbar from "./Components/NavbarComps/Navbar";
import Profile from "./Components/DashboardComps/Profile";
import Register from "../src/Components/LoginComps/Register";
import { useSelector } from "react-redux";

const App = () => {
	const authToken = useSelector((state) => state.auth.token);

	return (
		<div className="bg-shade-0 w-screen min-h-screen overflow-x-hidden">
			<Navbar></Navbar>
			<Router>
				<Routes>
					<Route
						path="/"
						exact
						element={authToken ? <Profile /> : <Navigate to="/login" />}
					/>
					<Route
						path="/login"
						exact
						element={!authToken ? <Login /> : <Navigate to="/" />}
					/>
					<Route
						path="/register"
						exact
						element={!authToken ? <Register /> : <Navigate to="/" />}
					/>
					<Route
						path="/app"
						exact
						element={authToken ? <Application /> : <Navigate to="/login" />}
					/>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
