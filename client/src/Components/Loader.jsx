import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import React from "react";

function Loader({ isLoading }) {
  return (
    <div>
      {" "}
      <Backdrop sx={{ color: "#fff" }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Loader;
