import React, { useEffect, useState } from "react";

function QuizApp() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await fetch("/api/topics"); // Adjust the endpoint if needed
      const data = await response.json();
      setTopics(data);
    };
    fetchTopics();
  }, []);

  const handleTopicSelect = async (topicId) => {
    const response = await fetch(`/api/quiz/getquizzes/${topicId}`);
    if (!response.ok) {
      console.error("Failed to fetch quizzes for topic", topicId);
      return;
    }
    const data = await response.json();
    setQuizzes(data);
    setSelectedTopic(topicId);
  };

  return (
    <div>
      <h1>Select a Topic</h1>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id} onClick={() => handleTopicSelect(topic.id)}>
            {topic.name}
          </li>
        ))}
      </ul>
      {selectedTopic && quizzes.length > 0 && (
        <div>
          <h2>
            Quizzes for {topics.find((t) => t.id === selectedTopic)?.name}
          </h2>
          {quizzes.map((quiz) => (
            <div key={quiz.id}>
              <p>{quiz.question}</p>
              {/* Render options here, as per your requirement */}
            </div>
          ))}
        </div>
      )}
      {selectedTopic && quizzes.length === 0 && (
        <p>No quizzes available for this topic.</p>
      )}
    </div>
  );
}

export default QuizApp;
