// Chakra UI components which uses tailwaind to create a navbar

const Navbar = () => {
  return (
    <div className="bg-cyan-500 text-white py-4 px-8 flex justify-between items-center">
      <div className="font-bold text-2xl">Loan App</div>
      <div className="flex-grow">
        <ul className="flex justify-end gap-4">
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
