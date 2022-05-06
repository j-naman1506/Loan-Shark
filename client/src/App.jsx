import "./App.css";

import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
	return (
		<div className="App w-screen min-h-screen">
			<Navbar />
			<Login />
		</div>
	);
}

export default App;
