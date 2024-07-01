import React from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYou.css";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useTranslation } from "react-i18next";

const ThankYou = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function downloadCSV() {
    const questions = JSON.parse(localStorage.getItem("quizResults"));

    if (!questions || questions.length === 0) {
      alert("No data found");
      return;
    }

    const headers = "order,title,type,answer\n";
    const csvContent =
      headers +
      questions
        .map((q) => `${q.id},"${q.title}","${q.type}","${q.answer}"`)
        .join("\n");

    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "quiz_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleRetakeQuiz = () => {
    navigate("/quiz/1");
  };

  const handleDownloadAnswers = () => {
    downloadCSV();
  };

  return (
    <div className="thank-you-container">
      <h2 className="thank-you-title">{t("thankYou")}</h2>
      <div className="thank-you-icon">✔️</div>
      <button onClick={handleDownloadAnswers} className="thank-you-button">
        {t("downloadAnswers")}
      </button>
      <SubmitButton onClick={handleRetakeQuiz} title={t("retakeQuiz")} />
    </div>
  );
};

export default ThankYou;
