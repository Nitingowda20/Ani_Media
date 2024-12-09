import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserQuiz from "../components/UserQuiz"; // Make sure to import your UserQuiz component

const QuizzesPage = () => {
  const { topicId } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/quiz/getquizzes/${topicId}`);
      const data = await response.json();
      setQuizzes(data);
    };

    fetchQuizzes();
  }, [topicId]);

  return (
    <div className="min-h-screen" style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "28px"}}>Quizzes for Selected Topic :</h1>
      {quizzes.length > 0 ? (
        quizzes.map((quiz , index) => (
          <UserQuiz key={quiz.id} quiz={quiz} questionNumber={index + 1} />
        ))
      ) : (
        <p>No quizzes available for this topic.</p>
      )}
    </div>
  );
};

export default QuizzesPage;
