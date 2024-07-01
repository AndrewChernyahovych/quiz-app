import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Quiz from "./pages/Quiz";
import Email from "./pages/Email/Email";
import ThankYou from "./pages/ThankYou/ThankYou";
import { useTranslation } from "react-i18next";

const App = () => {
  const {i18n} = useTranslation();

  useEffect(() => {
    i18n.changeLanguage('en')
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="quiz/:step" element={<Quiz />} />
        <Route path="email" element={<Email />} />
        <Route path="thank-you" element={<ThankYou />} />
        <Route path="/" element={<Navigate to="/quiz/1" />} />
      </Routes>
    </Router>
  );
};

export default App;
