import React, { useState } from "react";
import { ReactComponent as Logo } from "../../assets/Group.svg";
import "./InputIngredients.css";

const InputIngredients = () => {
  const [ingredient1, setIngredient1] = useState("");
  const [ingredient2, setIngredient2] = useState("");
  const [skinType, setSkinType] = useState("");
  const [gptResponse, setGptResponse] = useState(null);
  const ingredientsList = [
    "vitamin C",
    "retinol",
    "azelaic acid",
    "niacinamide",
    "AHA acids",
    "salicylic acid",
  ];
  const skinTypesList = ["oily", "dry", "sensitive", "regular"];

  const checkWithGPT = async () => {
    if (!ingredient1 || !ingredient2 || !skinType) {
      //alert("Please select two ingredients and your skin type.");
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
    } catch (error) {
      console.error("Error:", error);
      setGptResponse("Sorry, something went wrong. Please try again.");
    }
  };

  return (
    <div className="input-ingredients-container">
      <h1>אהלן כפור, בחרי מרשימת החומרים הפעילים למטה ואת סוג עורך</h1>
      <div className="inputs">
        <select
          id="ingredient1"
          value={ingredient1}
          onChange={(e) => setIngredient1(e.target.value)}
        >
          <option value="">בחרי חומר פעיל</option>
          {ingredientsList.map((ingredient) => {
            return (
              <option key={ingredient} value={ingredient}>
                {ingredient}
              </option>
            );
          })}
        </select>
        <select
          id="ingredient2"
          value={ingredient2}
          onChange={(e) => setIngredient2(e.target.value)}
        >
          <option value="">בחרי חומר פעיל</option>
          {ingredientsList.map((ingredient) => {
            return (
              <option key={ingredient} value={ingredient}>
                {ingredient}
              </option>
            );
          })}
        </select>
        <select
          id="skinType"
          value={skinType}
          onChange={(e) => setSkinType(e.target.value)}
        >
          <option value="">בחרי את סוג עורך</option>
          {skinTypesList.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button className="get-answer-button" onClick={checkWithGPT}>
        ?האם בטוח לערבב
      </button>
      <div>
        <h2 className="response-container">? האם זה בטוח</h2>
        {gptResponse && <h2 className="gpt-response">{gptResponse}</h2>}
      </div>
      <Logo />
    </div>
  );
};

export default InputIngredients;
