import React from "react";
import { Test } from "../../lib/types";
import ParagraphComponent from "./ParagraphComponent";
import TestCard from "./TestCard";

interface InputProps {
  data: Test[];
}

function TestComponent({ data }: InputProps) {
  return (
    <div>
      {data.map((question, index) => (
        <TestCard count={1} key={index} {...question} />
      ))}
    </div>
  );
}

export default TestComponent;
