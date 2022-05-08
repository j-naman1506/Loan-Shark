// Chakra UI components which uses tailwaind to create a navbar

const Navbar = () => {
	return (
		<div className="bg-shade-700 py-4 px-32 flex justify-between items-center shadow-lg">
			<div className="font-bold text-white text-3xl font-ubuntu">Loan App</div>
			<div className="flex-grow">
				<ul className="flex justify-end gap-10 text-shade-100">
					<li>
						<a href="/login" className="opacity-60 hover:opacity-100">
							Login
						</a>
					</li>
					<li>
						<a href="/register" className="opacity-60 hover:opacity-100">
							Register
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
