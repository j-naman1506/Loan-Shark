import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../utils/axios";
import { requests } from "../utils/requests";
import { useDispatch, useSelector } from "react-redux";
import {
  logOutSuccess,
  signInSuccess,
} from "../../store/modules/auth/auth.action";
import OAuthLogin from "./OAuthLogin";
import Loader from "../Loader";

const Login = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (authToken) {
      // dispatch(logOutSuccess({}));
      window.location.href = "/";
    }
  }, []);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setemail(value);
    } else {
      setpassword(value);
    }
  }

  function HandleSubmit(e) {
    setLoading(true);
    const senddata = {
      email: email,
      password: password,
    };
    if (!senddata.email || !senddata.password) {
      alert("All Fields are Mandatory");
      setLoading(false);
    } else {
      e.preventDefault();
      async function doLogin() {
        const request = await axios.post(requests["doLogin"], senddata);
        return request;
      }
      doLogin()
        .then((res) => {
          const data = res.data.data;
          console.log(data);
          if (!data || res.data.status == "faliure") {
            alert("Something Went Wrong");
          } else {
            const { token: token, profile: userinfo } = data;
            console.log(token);
            console.log(userinfo);

            setemail("");
            setpassword("");
            dispatch(signInSuccess({ token, userinfo }));
            setLoading(false);
            window.location.href = "/";
          }
        })
        .catch((e) => {
          alert("Something Went Wrong");
          window.location.href = "/login";
        });
    }
  }

  return (
    <div className="w-1/3 h-full mt-24 mx-auto p-8 rounded-md flex gap-8 flex-col shadow-lg ">
      <Heading
        as="h2"
        size="xl"
        className="text-center font-bold text-cyan-700"
      >
        Say those secret words!
      </Heading>

      <form className="mt-auto flex flex-col gap-8 ">
        <FormControl>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="email">Password</FormLabel>
          <Input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <FormHelperText>Choose a strong one.</FormHelperText>
        </FormControl>

        <Button colorScheme="cyan" size="md" onClick={HandleSubmit}>
          Login
        </Button>
        <hr className="font-bold w-full border-t-1 border-gray-300" />
        <OAuthLogin />
        {/* <Button colorScheme="cyan" variant="outline">
          Login with Google
        </Button> */}
      </form>
      <Loader isLoading={isLoading}></Loader>
    </div>
  );
};

export default Login;
