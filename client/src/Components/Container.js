import React from "react";

export default function Container(props) {
  return (
    <div
      className={`mycontainer ${props.backgroundClass} ${props.heightClass}`}
    >
      {props.children}
    </div>
  );
}
