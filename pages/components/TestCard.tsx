import React, { useState } from "react";
import ParagraphComponent from "./ParagraphComponent";
import { RadioGroup, Radio } from "react-radio-group";

function TestCard({ count, answer, options, questions }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  function onChangeValue(event) {
    setSelectedQuestion(event.target.value);
    console.log(event.target.value);
  }

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
        {options.map((option, index) => (
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
