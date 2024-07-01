import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Question.css";
import SubmitButton from "../SubmitButton/SubmitButton";

const Question = ({ question, onAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { i18n, t } = useTranslation();

  if (!question) {
    return <div>Loading question...</div>;
  }

  const { title, type, answerOptions } = question;

  const handleSingleAnswer = (answer) => {
    if (question.id === 1) {
      switch (answer) {
        case "English":
          i18n.changeLanguage("en");
          break;
        case "French":
          i18n.changeLanguage("fr");
          break;
        case "German":
          i18n.changeLanguage("de");
          break;
        case "Spanish":
          i18n.changeLanguage("es");
          break;
        default:
          i18n.changeLanguage("en");
          break;
      }
    }
    onAnswer(answer);
  };

  const handleMultipleAnswer = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const handleBubbleAnswer = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.length === 3 && !prevSelected.includes(option)) {
        const newSelected = [...prevSelected];
        newSelected.shift();
        return [...newSelected, option];
      } else if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };
  

  const renderOptions = () => {
    switch (type) {
      case "single-select":
        return answerOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleSingleAnswer(option)}
            className={`question-option ${
              selectedOptions.includes(option) && "selected"
            }`}
          >
            {option}
          </button>
        ));

      case "single-select-image":
        return answerOptions.map((option) => (
          <button
            key={option.text}
            onClick={() => handleSingleAnswer(option.text)}
            className={`question-option ${
              selectedOptions.includes(option) && "selected"
            }`}
          >
            <span>{option.icon} </span>
            {option.text}
          </button>
        ));

      case "multiple-select":
        return (
          <div>
            {answerOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleMultipleAnswer(option)}
                className={`question-option ${
                  selectedOptions.includes(option) && "selected"
                }`}
              >
                {option}
              </button>
            ))}
            <SubmitButton
              title={t("nextBtnTitle")}
              onClick={() => onAnswer(selectedOptions)}
            />
          </div>
        );

      case "bubble":
        return (
          <div>
            {answerOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleBubbleAnswer(option)}
                className={`question-option ${
                  selectedOptions.includes(option) && "selected"
                }`}
              >
                {option}
              </button>
            ))}
            <SubmitButton
              title={t("nextBtnTitle")}
              onClick={() => onAnswer(selectedOptions)}
            />
          </div>
        );

      default:
        return answerOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleSingleAnswer(option)}
            className={selectedOptions.includes(option) ? "selected" : ""}
          >
            {option}
          </button>
        ));
    }
  };

  const instructionKey = `${title}.instruction`;
  const instruction = t(instructionKey);
  const showInstruction = instruction !== instructionKey;

  return (
    <div className="question">
      <h2>{t(`${title}.title`)}</h2>
      {showInstruction && <h3 className="question__instruction">{instruction}</h3>}
      {renderOptions()}
    </div>
  );
};

export default Question;
