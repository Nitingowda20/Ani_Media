import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserQuiz from "../components/UserQuiz"; // Make sure to import your UserQuiz component

const QuizzesPage = () => {
  const { topicId } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch(`/api/quiz/getquizzes/${topicId}`);
      const data = await response.json();
      setQuizzes(data);
    };

    fetchQuizzes();
  }, [topicId]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quizzes for Topic ID {topicId}</h1>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => <UserQuiz key={quiz.id} quiz={quiz} />)
      ) : (
        <p>No quizzes available for this topic.</p>
      )}
    </div>
  );
};

export default QuizzesPage;
