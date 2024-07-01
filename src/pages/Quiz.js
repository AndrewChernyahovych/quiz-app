import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Question from "../components/Question/Question";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { useQuestionData } from "../hooks/useQuestionsData";
import Loader from "../components/Loader/Loader";
import { useTranslation } from "react-i18next";

const Quiz = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const questionsData = useQuestionData();
  const { t } = useTranslation();

  const [answers, setAnswers] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(null);

  useEffect(() => {
    if (isQuizFinished) {
      localStorage.setItem("quizResults", JSON.stringify(answers));
    }
  }, [isQuizFinished]);

  const handleAnswer = (answer) => {
    setAnswers((current) => [
      ...current,
      {
        id: step,
        title: t(`${questionsData[step - 1].title}.title`),
        type: questionsData[step - 1].type,
        answer: answer,
      },
    ]);

    if (parseInt(step) < questionsData.length) {
      navigate(`/quiz/${parseInt(step) + 1}`);
    } else {
      setIsQuizFinished(true);
      setTimeout(() => {
        navigate("/email");
      }, 5500);
    }
  };

  const currentStep = parseInt(step);
  if (currentStep < 1 || currentStep > questionsData.length) {
    return <div>Invalid step.</div>;
  }

  const currentQuestion = questionsData[currentStep - 1];

  return (
    <div className="container">
      {isQuizFinished ? (
        <Loader />
      ) : (
        <>
          <ProgressBar step={currentStep} total={questionsData.length} />
          <Question question={currentQuestion} onAnswer={handleAnswer} />
        </>
      )}
    </div>
  );
};

export default Quiz;
