import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";

export default function AdminQuizCreator() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(1);
  const [topicId, setTopicId] = useState(""); // State for selected topic
  const [topics, setTopics] = useState([]); // State for topics

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/topic/topics`); // Endpoint to fetch topics
        const data = await response.json();
        setTopics(data); // Set topics in state
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    };
    fetchTopics();
  }, []);
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = { question, options, correctAnswer, topicId };
    console.log("Submitting Quiz Data:", quizData);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/quiz/createquiz`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(quizData),
      });
      if (!res.ok) {
        // Parse response error only if available
        const errorData = await res.json().catch(() => null);
        const errorMessage = errorData?.error || "Failed to create quiz";
        alert(errorMessage);
        return;
      }
      const data = await res.json();
      alert("Quiz created successfully!");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer(1);
      setTopicId("");
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
          <h1 className="size-18">Options: </h1>
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
          <label className="form-label">Select Topic: </label>
          <select
            className="form-control"
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            required
            style={{ color: "black", fontWeight: "bold", width: "20%" }}
          >
            <option value="">Select a topic</option> {/* Default option */}
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Correct Answer Index : </label>
          <input
            type="number"
            // className="form-control"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
            min="1"
            max={options.length}
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
