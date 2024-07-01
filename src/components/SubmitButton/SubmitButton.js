import React from "react";
import './SubmitButton.css'

function SubmitButton({title, onClick, disabled = false}) {
  return (
    <button className="submit-btn" onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
}

export default SubmitButton;
