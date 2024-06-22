import React from "react";

function Loader() {
  return (
      <center>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </center>
  );
}

export default Loader;
