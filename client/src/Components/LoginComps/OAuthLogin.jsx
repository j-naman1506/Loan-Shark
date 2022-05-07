import React from "react";
import { GoogleLogin } from "react-google-login";
function OAuthLogin() {
  function responseGoogleSuccess(resp) {
    // console.log(resp.mc.access_token);
    console.log(resp);
    // async function doOAuthLogin() {
    //   const request = await axios.post(requests["doOAuthLogin"], resp);
    //   return request;
    // }
    // doOAuthLogin()
    //   .then((res) => {
    //     const data = res.data;
    //     const { token: token, profile: userinfo } = res.data;

    //     window.location.href = "/";
    //     //dispatch(signInSuccess({ token, userinfo }));
    //   })
    //   .catch((e) => {
    //     alert("Something Went Wrong");
    //     window.location.href = "/login";
    //   });
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
    </div>
  );
}

export default OAuthLogin;
