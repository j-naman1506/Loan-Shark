import "./App.css";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

function App() {
	return (
		<div className="w-screen min-h-screen">
			<Navbar />
			{/* <Login /> */}
			<Register />
		</div>
	);
}

export default App;
