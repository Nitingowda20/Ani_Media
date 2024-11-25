import React, { useState } from "react";

const UserQuiz = ({ quiz, questionNumber }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerStatus, setAnswerStatus] = useState("");

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    setAnswerStatus(index === quiz.correctAnswer - 1 ? "correct" : "incorrect"); // Adjusted for zero-based indexing
  };

  if (!quiz) {
    return <p>No Quiz yet</p>;
  }
  if (!quiz.options) {
    return <p>Loading...</p>;
  }

  return (
    <div className="quiz-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2 className="font-bold text-xl mb-5">Q{questionNumber}: {quiz.question}</h2>
      <div className="options-container">
        {quiz.options.map((option, index) => (
          <div
            key={option.id} // Use option.id as key
            className={`option-box ${selectedOption === index ? index === quiz.correctAnswer - 1 ? "correct" : "incorrect" : ""}`}
            onClick={() => handleOptionClick(index)}
            style={{
              color: "black",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              margin: "5px 0",
              transition: "background-color 0.3s",
              backgroundColor: selectedOption === index ? (index === quiz.correctAnswer - 1 ? "#3c763d" : "#a94442") : "white",
              textAlign: "center",
            }} // Inline styles for option boxes
          >
            {option.text}
          </div>
        ))}
      </div>
      {answerStatus && (
        <p className={`feedback ${answerStatus === "correct" ? "correct" : "incorrect"}`}>
          {answerStatus === "correct" ? "Correct!" : "Incorrect! Try again."}
        </p>
      )}
    </div>
  );
};

export default UserQuiz;
