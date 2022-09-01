import React from "react";

function AnchorComponent(props: any) {
  return (
    <a
      {...props}
      className="text-red-500 hover:text-red-400 hover:underline hover:decoration-red-500"
    />
  );
}

export default AnchorComponent;
