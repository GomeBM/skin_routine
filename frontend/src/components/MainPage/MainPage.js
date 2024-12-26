import React, { useState } from "react";
import { ReactComponent as Logo } from "../../assets/Group.svg";
import CustomSelect from "../CustomSelect/CustomSelect.js";
import Popup from "../Popup/Popup";
import { motion } from "framer-motion";
import "./MainPage.css";

const MainPage = () => {
  const [ingredient1, setIngredient1] = useState("");
  const [ingredient2, setIngredient2] = useState("");
  const [skinType, setSkinType] = useState("");
  const [gptResponse, setGptResponse] = useState(null);
  const [responseType, setResponseType] = useState(null);

  const ingredientsList = [
    "vitamin C",
    "retinol",
    "azelaic acid",
    "niacinamide",
    "AHA acids",
    "salicylic acid",
  ];
  const skinTypesList = ["oily", "dry", "sensitive", "regular"];

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

  const [showPopup, setShowPopup] = useState({
    show: false,
    message: "",
  });

  const handlePopup = (message) => {
    setShowPopup({
      show: true,
      message,
    });
  };

  const checkWithGPT = async () => {
    if (!ingredient1 || !ingredient2 || !skinType) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredient1,
            ingredient2,
            mySkinType: skinType,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch the response from the server.");
      }

      const data = await response.json();
      setGptResponse(data.reply);
      setResponseType(data.responseType);
      handlePopup(data.reply);
    } catch (error) {
      console.error("Error:", error);
      setGptResponse("Sorry, something went wrong. Please try again.");
      handlePopup("Sorry, something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      className="main-page-container"
      variants={containerVarients}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="gradient-overlay"></div>
      <div className="gradient-section">
        <div className="gradient-sction-top">
          <Logo className="logo" />
        </div>
        <div className="gradient-sction-middle">
          <h2 className="gradient-sction-middle-text">
            <span>HI GORGEOUS!</span>
            <span>HOW DO</span>
            <span>YOU FEEL</span>
            <span>TODAY?</span>
          </h2>
        </div>
        <div className="gradient-sction-bottom">
          <h3 className="gradient-sction-bottom-text">
            Mixing skincare actives can be beneficial but depends on the
            ingredients and your skin type; some pairings work well, others may
            irritate or lose effectiveness.
          </h3>
        </div>
      </div>
      <div className="white-section">
        <h2 className="white-section-header">
          Please select your skin type and active ingredients
        </h2>
        <div className="white-section-selects">
          <CustomSelect
            value={skinType}
            onChange={(e) => setSkinType(e.target.value)}
            options={skinTypesList}
            placeholder="SKIN TYPE"
          />
          <CustomSelect
            value={ingredient1}
            onChange={(e) => setIngredient1(e.target.value)}
            options={ingredientsList}
            placeholder="INGREDIENT"
          />
          <CustomSelect
            value={ingredient2}
            onChange={(e) => setIngredient2(e.target.value)}
            options={ingredientsList}
            placeholder="INGREDIENT"
          />
        </div>
        <h3 className="white-section-button" onClick={checkWithGPT}>
          CHECK COMBINATION
        </h3>
      </div>
      {showPopup.show && (
        <Popup
          message={showPopup.message}
          responseType={responseType}
          onClose={() => setShowPopup({ show: false, message: "" })}
        />
      )}
    </motion.div>
  );
};

export default MainPage;
