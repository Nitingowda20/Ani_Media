import React, { useState } from "react";

const UserQuiz = ({ quiz }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerStatus, setAnswerStatus] = useState("");

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    setAnswerStatus(index === quiz.correctAnswer - 1 ? "correct" : "incorrect"); // Adjusted for zero-based indexing
  };

  // Return early if quiz or options are not available
  if (!quiz) {
    return <p>No Quiz yet</p>; // Handle loading state
  }
  if (!quiz.options) {
    return <p>Loading...</p>; // Handle loading state
  }

  return (
    <div className="quiz-container m-7">
      <h2 className="font-bold text-xl mb-5">
        Q{quiz.id}: {quiz.question}
      </h2>
      <div className="options-container">
        {quiz.options.map((option, index) => (
          <div
            key={option.id} // Use option.id as key
            className={`option-box ${
              selectedOption === index
                ? index === quiz.correctAnswer - 1 // Adjust for zero-based indexing
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
            onClick={() => handleOptionClick(index)}
            style={{
              color: "black",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              margin: "5px 0",
              transition: "background-color 0.3s",
              backgroundColor:
                selectedOption === index
                  ? index === quiz.correctAnswer - 1
                    ? "#3c763d "
                    : "#a94442 "
                  : "white",
            }} // Inline styles for option boxes
          >
            {option.text} {/* Display the option text */}
          </div>
        ))}
      </div>
      {answerStatus && (
        <p
          className={`feedback ${
            answerStatus === "correct" ? "correct" : "incorrect"
          }`}
        >
          {answerStatus === "correct" ? "Correct!" : "Incorrect! Try again."}
        </p>
      )}
    </div>
  );
};

export default UserQuiz;
