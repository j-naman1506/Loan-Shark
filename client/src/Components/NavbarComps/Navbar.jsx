import axios from "../utils/axios";
import { requests } from "../utils/requests";
import { useDispatch, useSelector } from "react-redux";
import {
  logOutSuccess,
  signInSuccess,
} from "../../store/modules/auth/auth.action";
import { useState } from "react";
import Loader from "../Loader";

const Navbar = () => {
  const authToken = useSelector((state) => state.auth.token);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const logOut = () => {
    setLoading(true);
    async function logout() {
      const request = await axios.get(requests["logout"]);
      return request;
    }
    logout()
      .then((res) => {
        dispatch(logOutSuccess());
        window.location.href = "/login";
      })
      .catch((e) => {
        console.log(e);
        alert("Cannot log out");
      });
    setLoading(false);
  };

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
    {
      path: "/login",
      name: "Logout",
      protected: true,
      function: logOut,
    },
  ];
  return (
    <div className="bg-shade-700 px-32 flex justify-between items-center shadow-lg">
      <div className="font-bold text-white text-3xl font-ubuntu">
        <a href="/">
          <img src="/logo.png" className="h-16" />
        </a>
      </div>
      <div className="flex-grow">
        <ul className="flex justify-end gap-10 text-shade-100">
          {routes.map((route, index) => (
            <li key={index} onClick={route.function ? route.function : null}>
              {authToken ? (
                route.protected ? (
                  <a href={route.path} className="opacity-60 hover:opacity-100">
                    {route.name}
                  </a>
                ) : (
                  <></>
                )
              ) : !route.protected ? (
                <a href={route.path} className="opacity-60 hover:opacity-100">
                  {route.name}
                </a>
              ) : (
                <></>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Loader isLoading={isLoading}></Loader>
    </div>
  );
};

export default Navbar;
