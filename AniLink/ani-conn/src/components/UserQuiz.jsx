// UserQuiz.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserQuiz.css";

const UserQuiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerStatus, setAnswerStatus] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await axios.get("/api/quizzes/1"); // example endpoint
      setQuiz(response.data);
    };
    fetchQuiz();
  }, []);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    if (index === quiz.correctAnswer) {
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("incorrect");
    }
  };

  return quiz ? (
    <div className="quiz-container">
      <h2>{quiz.question}</h2>
      <div className="options-container">
        {quiz.options.map((option, index) => (
          <div
            key={index}
            className={`option-box ${
              selectedOption === index
                ? index === quiz.correctAnswer
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
            onClick={() => handleOptionClick(index)}
          >
            {option}
          </div>
        ))}
      </div>
      {answerStatus === "incorrect" && (
        <p className="feedback">
          Incorrect! The correct answer is highlighted.
        </p>
      )}
      {answerStatus === "correct" && <p className="feedback">Correct!</p>}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default UserQuiz;
