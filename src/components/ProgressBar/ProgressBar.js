import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ step, total }) => {
  const progress = (step / total) * 100;

  return (
    <>
      <div className="progress-bar-counter">
        <b>{step} </b> /{total}
      </div>

      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
