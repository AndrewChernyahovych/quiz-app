import React, { useEffect, useState } from "react";
import "./Loader.css";
import { useTranslation } from "react-i18next";

const Loader = () => {
  const [percentage, setPercentage] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <div className="loader">
        <svg viewBox="0 0 250 250">
          <circle className="base" cx="125" cy="125" r="119" />
          <circle
            className="progress"
            cx="125"
            cy="125"
            r="119"
            style={{ strokeDashoffset: 748 - (748 * percentage) / 100 }}
          />
        </svg>
        <div className="loader-inner">
          <span className="loader-text">{percentage}%</span>
        </div>
      </div>
      <p className="loader-title">{t("loaderTitle")}</p>
    </div>
  );
};

export default Loader;
