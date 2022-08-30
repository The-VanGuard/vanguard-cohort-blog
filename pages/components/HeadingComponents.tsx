import React from "react";

interface InputProps {
  title: string;
}

export function Heading1(props) {
  return (
    <h1
      className="text-2xl leading-8 font-bold text-gray-900 tracking-tight"
      {...props}
    />
  );
}
export function Heading2(props) {
  return (
    <h2
      className="text-xl leading-8 font-bold text-gray-900 tracking-tight"
      {...props}
    />
  );
}
export function Heading3(props) {
  return (
    <h3
      className="text-lg leading-8 font-bold text-gray-900 tracking-tight"
      {...props}
    />
  );
}
