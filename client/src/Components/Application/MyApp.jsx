import React from "react";
import Sidebar from "./Sidebar";
import { shade } from "./../../static/templates/colors";
import { useState } from "react";
const MyApp = () => {
  const [stage, setStage] = useState(0);
  const renderStage = (_stage) => {
    switch (_stage) {
      case 0:
        return <div>0</div>;
      case 1:
        return <p>1</p>;
      case 2:
        return <p>2</p>;
    }
  };
  return (
    <div className="flex m-12 shadow-lg rounded-lg">
      <Sidebar stage={stage} setStage={setStage} />
      <div className="bg-shade-100 w-full h-full flex p-3 rounded-tr-lg">
        {renderStage(stage)}
      </div>
    </div>
  );
};

export default MyApp;
