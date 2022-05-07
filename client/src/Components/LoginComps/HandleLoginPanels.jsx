import React from "react";
import Login from "./login";
import Signup from "./Register";
import Container from "../Container";

export default function HandleLoginPanels(props) {
  // function handlePanels() {
  //   return (
  //     <div class="region">{props.loginPanel ? <Login /> : <Signup />}</div>
  //   );
  // }
  // console.log(props.loginPanel);
  return (
    <Container
      children={
        <div class="region">{props.loginPanel ? <Login /> : <Signup />}</div>
      }
      backgroundClass="login-container"
    ></Container>
  );
}
