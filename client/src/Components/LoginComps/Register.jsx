import RegisterPage from "./RegisterComp";

const Register = () => {
  function HandleSubmit(userData) {
    console.log(userData);
    if (
      !userData.username ||
      !userData.first_name ||
      !userData.last_name ||
      !userData.email ||
      !userData.age ||
      !userData.password
    ) {
      alert("All Fields are Mandatory");
    } else {
      //   e.preventDefault();
      //   async function doRegister() {
      //     const request = await axios.post(requests["doRegister"], userData);
      //     return request;
      //   }
      //   doRegister()
      //     .then((res) => {
      //       const data = res.data.data;
      //       console.log(data);
      //       const { token: token, profile: userinfo } = res.data;
      //       const init = {
      //         username: "",
      //         first_name: "",
      //         last_name: "",
      //         email: "",
      //         age: "",
      //         password: "",
      //       };
      //       setUserData(init);
      //       window.location.href = "/";
      //       dispatch(signInSuccess({ token, userinfo }));
      //     })
      //     .catch((e) => {
      //       console.log(e.data);
      //     });
    }
  }
  return <RegisterPage onSubmit={HandleSubmit} />;
};

export default Register;
