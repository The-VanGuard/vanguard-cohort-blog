import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscdDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

function CodeComponent(props) {
  return (
    <SyntaxHighlighter
      language="javascript"
      showLineNumbers
      style={darcula}
      {...props}
      className="text-base m-4"
    />
  );
}

export default CodeComponent;
