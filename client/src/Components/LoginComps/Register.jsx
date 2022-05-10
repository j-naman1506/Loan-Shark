import RegisterPage from "./RegisterComp";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { requests } from "../utils/requests";
import { useDispatch, useSelector } from "react-redux";
import {
  logOutSuccess,
  signInSuccess,
} from "../../store/modules/auth/auth.action";
import Loader from "../Loader";
const Register = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (authToken) {
      // dispatch(logOutSuccess({}));
      window.location.href = "/";
    }
  }, []);
  function HandleSubmit(userData) {
    setLoading(true);
    if (
      !userData.first_name ||
      !userData.last_name ||
      !userData.email ||
      !userData.age ||
      !userData.password
    ) {
      alert("All Fields are Mandatory");
      setLoading(false);
    } else {
      async function doRegister() {
        const request = await axios.post(requests["doRegister"], userData);
        return request;
      }
      doRegister()
        .then((res) => {
          const data = res.data.data;

          if (!data || res.data.status == "faliure") {
            alert("Something Went Wrong");
          } else {
            const { token: token, profile: userinfo } = data;

            // const init = {
            //   username: "",
            //   first_name: "",
            //   last_name: "",
            //   email: "",
            //   age: "",
            //   password: "",
            // };
            // setUserData(init);
            dispatch(signInSuccess({ token, userinfo }));
            setLoading(false);
            window.location.href = "/";
          }
        })
        .catch((e) => {});
    }
  }
  return (
    <div>
      <RegisterPage onSubmit={HandleSubmit} />
      <Loader isLoading={isLoading}></Loader>
    </div>
  );
};

export default Register;
