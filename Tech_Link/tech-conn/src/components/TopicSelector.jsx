import React from "react";

const TopicSelector = ({ onSelect }) => {
  const topics = [
    "JavaScript",
    "React",
    "Next.js",
    "Python",
    "Java",
    "Typescript",
    "DSA",
    "C++",
  ]; // Add more topics as needed

  return (
    <div className="topic-selector m-7">
      <h2 className="font-bold text-xl mb-4">Select a Topic</h2>
      <div className="topics-container">
        {topics.map((topic, index) => (
          <button
            key={index}
            className="topic-button"
            onClick={() => onSelect(index + 1)} // Assuming index + 1 corresponds to topicId
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;
