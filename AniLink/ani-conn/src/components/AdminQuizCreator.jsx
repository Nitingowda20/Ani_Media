import { Button } from "flowbite-react";
import React, { useState } from "react";

export default function AdminQuizCreator() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = { question, options, correctAnswer };
    try {
      // const fetchquiz = await fetch("/api/quiz/createquiz", quizData);
      // alert("Quiz created successfully!");
      // setQuestion("");
      // setOptions(["", "", "", ""]);
      // setCorrectAnswer(0);
      const res = await fetch(`/api/quiz/createquiz`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(quizData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Quiz created successfully!");
        setQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectAnswer(0);
      } else {
        const errorData = await res.json();
        alert(`Failed to create quiz: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to create quiz", error);
    }
  };
  return (
    <div className="container mt-5 ml-3">
      <h2
        className="text-center mb-4"
        style={{ fontWeight: "bold ", fontSize: 24 }}
      >
        Create a New Quiz
      </h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Question: </label>
          <input
            type="text"
            className="form-control transition-opacity"
            color="black"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            style={{
              width: "100%",
              maxWidth: "1000px",
              color: "black",
              fontWeight: "bold ",
            }}
          />
        </div>
        <div className="mb-3">
          <h1 className="size-5">Options: </h1>
          <br />
          {options.map((option, index) => (
            <div key={index} className="mb-4">
              <label className="form-label">Option {index + 1}: </label>
              <input
                type="text"
                className="form-control"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
                style={{
                  width: "100%",
                  maxWidth: "800px",
                  color: "black",
                  fontWeight: "bold ",
                }}
              />
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label className="form-label">Correct Answer Index : </label>
          <input
            type="number"
            className="form-control"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
            min="0"
            max={options.length - 1}
            required
            style={{ color: "black", fontWeight: "bold " }}
          />
        </div>
        <Button
          gradientDuoTone="purpleToBlue"
          type="submit"
          outline
          className=""
        >
          Create quiz
        </Button>
      </form>
    </div>
  );
}
