import React, { useState } from "react";
import ParagraphComponent from "./ParagraphComponent";

function TestCard({ count, answer, options, questions }: any) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  return (
    <div className={"mt-4"}>
      <h4
        className={
          selectedQuestion !== null
            ? selectedQuestion === answer
              ? "font-bold text-green-500 tracking-tight   "
              : "font-bold text-red-500 tracking-tight   "
            : "font-bold text-gray-900 tracking-tight"
        }
      >
        Question {count}
      </h4>
      <ParagraphComponent>{questions}</ParagraphComponent>
      <fieldset className="ml-4 mt-2">
        {options.map((option: string, index: number) => (
          <div key={index}>
            <input
              type="radio"
              name={`${option}+${Math.random()}`}
              value={option}
              className="focus:bg-red-500"
              checked={option === selectedQuestion}
              onChange={(e) => {
                setSelectedQuestion(option);
              }}
            />
            <label className="text-lg font-normal text-gray-700 ml-2 ">
              {option}
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}

export default TestCard;
