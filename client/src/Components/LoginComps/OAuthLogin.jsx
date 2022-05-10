import React from "react";
import { GoogleLogin } from "react-google-login";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { requests } from "../utils/requests";
import { useDispatch, useSelector } from "react-redux";
import {
  logOutSuccess,
  signInSuccess,
} from "../../store/modules/auth/auth.action";
import Loader from "../Loader";
function OAuthLogin() {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (authToken) {
      // dispatch(logOutSuccess({}));
      window.location.href = "/";
    }
  }, []);
  function responseGoogleSuccess(resp) {
    // console.log(resp.mc.access_token);
    setLoading(true);
    console.log(resp);
    async function doOAuthLogin() {
      const request = await axios.post(requests["doOAuthLogin"], resp);
      return request;
    }
    doOAuthLogin()
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        if (!data || res.data.status == "faliure") {
          alert("Something Went Wrong");
        } else {
          const { token: token, profile: userinfo } = data;
          console.log(token);
          console.log(userinfo);

          dispatch(signInSuccess({ token, userinfo }));

          window.location.href = "/";
        }
      })
      .catch((e) => {
        alert("Something Went Wrong");
        // window.location.href = "/login";
      });
    setLoading(false);
  }
  return (
    <div className="submit-google-center mx-auto">
      <GoogleLogin
        clientId={window.env.CLIENTID}
        buttonText="Sign in with Google"
        accessType="offline"
        scope="profile"
        onSuccess={responseGoogleSuccess}
        onFailure={(e) => {
          console.log(e);
        }}
      />
      <Loader isLoading={isLoading}></Loader>
    </div>
  );
}

export default OAuthLogin;
