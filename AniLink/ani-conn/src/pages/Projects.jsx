import React, { useState } from 'react'

export default function Projects() {
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
        const res = await fetch(`/api/quiz/getquizzes`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        alert("Quiz created successfully!");
        setQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectAnswer(0);
      } catch (error) {
        console.error("Failed to create quiz", error);
      }
    };

   return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>
      <div>
        {options.map((option, index) => (
          <div key={index}>
            <label>Option {index + 1}:</label>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          </div>
        ))}
      </div>
      <div>
        <label>Correct Answer Index:</label>
        <input
          type="number"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
          min="0"
          max={options.length - 1}
          required
        />
      </div>
      <button type="submit">Create Quiz</button>
    </form>
  );
};


