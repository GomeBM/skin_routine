import React from "react";
import { Link } from "react-router-dom";
import skinRoutineTitle from "../../assets/skin-routine-title-new.png"; // Adjust path if necessary
import { motion } from "framer-motion";
import "./HomePage.css";
import { duration } from "@mui/material";

const containerVarients = {
  hidden: {
    opacity: 0,
    scale: 0.95, // Page starts slightly scaled down
    x: "100vw", // Slides in from the right
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.3, // Duration for entry animation
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: "-100vw", // Slides out to the left
    transition: {
      duration: 0.3, // Duration for exit animation
      ease: "easeInOut",
    },
  },
};

const HomePage = () => {
  return (
    <motion.div
      className="homepage-container"
      variants={containerVarients}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <img
        src={skinRoutineTitle}
        className="skin-routine-title-img"
        alt="Skin Routine Title"
      />
      <div className="page-links">
        <Link to="/main-page" className="get-started-link">
          Get Started
        </Link>
      </div>
    </motion.div>
  );
};

export default HomePage;
