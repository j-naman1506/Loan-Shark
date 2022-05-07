import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.location.href = "/login";
  }, []);

  return <div>Home</div>;
}

export default Home;
