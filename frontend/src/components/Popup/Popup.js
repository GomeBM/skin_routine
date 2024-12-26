import React, { useState } from "react";
import { motion } from "framer-motion";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import "./Popup.css";

const containerVarients = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: "100vh",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: "-100vh",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const Popup = ({ onClose, message, responseType }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(); // Trigger unmount after animation ends
    }, 300); // Match the duration of the exit animation
  };

  return (
    <motion.div
      className="popup-container"
      initial="hidden"
      animate={isExiting ? "exit" : "visible"}
      variants={containerVarients}
    >
      <motion.div className="popup">
        <h1>{message}</h1>
        {responseType === "safe" && (
          <SentimentSatisfiedAltIcon className="response-icon-safe" />
        )}
        {responseType === "unsafe" && (
          <SentimentVeryDissatisfiedIcon className="response-icon-unsafe" />
        )}
        {responseType === "vary" && (
          <QuestionMarkIcon className="response-icon-vary" />
        )}
        <div className="popup-buttons">
          <button className="ok-button" onClick={handleExit}>
            OK
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Popup;
