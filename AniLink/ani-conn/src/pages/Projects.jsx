// It is for Quizz open page
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Project = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await fetch("/api/topic/topics"); // Replace with your actual API endpoint
      const data = await response.json();
      setTopics(data);
    };

    fetchTopics();
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  };

  const titleStyle = {
    color: "black",
    fontSize: "2.5rem",
    marginBottom: "20px",
    textAlign: "center",
  };

  const topicsInlineStyle = {
    // display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    width: "80%",
    marginBottom: "10",
  };

  const topicCardStyle = {
    marginBottom: "10px",
    color: "black",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  };

  const handleTopicClick = (topicId) => {
    navigate(`/quizzes/${topicId}`); // Navigate to the QuizzesPage with the selected topic ID
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Available Topics</h1>
      <div style={topicsInlineStyle}>
        {topics.map((topic) => (
          <div
            key={topic.id}
            style={topicCardStyle}
            onClick={() => handleTopicClick(topic.id)} // Handle topic click
          >
            <h2>{topic.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
