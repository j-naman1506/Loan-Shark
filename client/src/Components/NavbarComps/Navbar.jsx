import { useSelector } from "react-redux";

const routes = [
	{
		path: "/login",
		name: "Login",
		protected: false,
	},
	{
		path: "/register",
		name: "Register",
		protected: false,
	},
	{
		path: "/app",
		name: "Application",
		protected: true,
	},
	{
		path: "/",
		name: "Profile",
		protected: true,
	},
];

const Navbar = () => {
	const authToken = useSelector((state) => state.auth.token);

	return (
		<div className="bg-shade-700 py-4 px-32 flex justify-between items-center shadow-lg">
			<div className="font-bold text-white text-3xl font-ubuntu">
				<a href="/">Loan App</a>
			</div>
			<div className="flex-grow">
				<ul className="flex justify-end gap-10 text-shade-100">
					{routes.map((route, index) => (
						<li key={index}>
							<a href={route.path} className="opacity-60 hover:opacity-100">
								{route.name}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
