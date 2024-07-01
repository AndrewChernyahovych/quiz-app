import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Email.css";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useTranslation } from "react-i18next";

const Email = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const termsOfUse = t("termsOfUse", { returnObjects: true });

  const handleSubmit = () => {
    if (validateEmail(email)) {
      navigate("/thank-you");
    } else {
      setError("Invalid email");
    }
  };

  const handleEntedEmail = (e) => {
    setError("");
    setEmail(e.target.value);
  };

  return (
    <div className="email-container">
      <div className="email-inner-container">
        <div className="email-title-container">
          <h2 className="email-title">Email</h2>
          <p>{t("emailInstruction")}</p>
        </div>

        <input
          type="email"
          value={email}
          onChange={handleEntedEmail}
          placeholder={t("emailPlaceholder")}
          className="email-input"
        />
        {error && <div className="email-error">{error}</div>}
        <div className="email-agreement">
          {termsOfUse[0]}
          <a className="email-agreement--link" href="#">
            {termsOfUse[1]}
          </a>{" "}
          {termsOfUse[2]}
          <a className="email-agreement--link" href="#">
            {" "}
            {termsOfUse[3]}
          </a>
          .
        </div>
      </div>
      <SubmitButton
        title={t("nextBtnTitle")}
        onClick={handleSubmit}
        disabled={!email}
      />
    </div>
  );
};

export default Email;
