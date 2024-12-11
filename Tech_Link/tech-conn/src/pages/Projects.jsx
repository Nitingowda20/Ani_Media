import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/topic/topics`); // Replace with your actual API endpoint
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#08024c47",
    padding: "20px",
    color: "#333",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    marginBottom: "20px",
    textAlign: "center",
    color: "white",
  };

  const topicsInlineStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    width: "100%",
    maxWidth: "1200px",
    fontSize: "25px",
  };

  const topicCardStyle = {
    color: "black",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
    width: "250px",
    height: "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const topicCardHoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  };

  const handleTopicClick = (topicId) => {
    navigate(`/quizzes/${topicId}`);
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Available Topics</h1>
      {loading ? (
        <p>Loading topics...</p>
      ) : (
        <div style={topicsInlineStyle}>
          {topics.map((topic) => (
            <div
              key={topic.id}
              style={topicCardStyle}
              onMouseEnter={(e) =>
                Object.assign(e.target.style, topicCardHoverStyle)
              }
              onMouseLeave={(e) =>
                Object.assign(e.target.style, {
                  transform: "scale(1)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                })
              }
              onClick={() => handleTopicClick(topic.id)}
            >
              <h2>{topic.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Project;
