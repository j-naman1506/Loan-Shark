import RegisterPage from "./RegisterComp";
import { useEffect } from "react";
import axios from "../utils/axios";
import { requests } from "../utils/requests";
import { useDispatch, useSelector } from "react-redux";
import {
  logOutSuccess,
  signInSuccess,
} from "../../store/modules/auth/auth.action";
const Register = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (authToken) {
      // dispatch(logOutSuccess({}));
      window.location.href = "/";
    }
  }, []);
  function HandleSubmit(userData) {
    console.log(userData);
    if (
      !userData.first_name ||
      !userData.last_name ||
      !userData.email ||
      !userData.age ||
      !userData.password
    ) {
      alert("All Fields are Mandatory");
    } else {
      async function doRegister() {
        const request = await axios.post(requests["doRegister"], userData);
        return request;
      }
      doRegister()
        .then((res) => {
          const data = res.data.data;
          console.log(data);
          if (!data || res.data.status == "faliure") {
            alert("Something Went Wrong");
          } else {
            const { token: token, profile: userinfo } = data;
            console.log(token);
            console.log(userinfo);

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
            window.location.href = "/";
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  return <RegisterPage onSubmit={HandleSubmit} />;
};

export default Register;
