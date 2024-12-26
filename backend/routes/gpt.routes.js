// import express from "express";
// import OpenAI from "openai";
// import dotenv from "dotenv";
// import compatibilityInfo from "../data/compatibilityInfo.json";
// dotenv.config();
// const router = express.Router();

// // Initialize OpenAI SDK
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_KEY,
// });

// router.post("/", async (req, res) => {
//   const { ingredient1, ingredient2, mySkinType } = req.body; // Extract user message from request body
//   if (!ingredient1 || !ingredient2 || !mySkinType) {
//     return res.status(400).json({ error: "all fields are required" });
//   }

//   if (ingredient1 === ingredient2 && ingredient1 !== "retinol") {
//     return res.json({
//       reply: "Please choose two different active ingredients",
//     });
//   }

//   // Check if compatibility information exists for the provided ingredients
//   const compatibility =
//     compatibilityInfo[ingredient1] &&
//     compatibilityInfo[ingredient1][ingredient2];

//   let responseType;
//   if (compatibility.toLowerCase().includes("safe")) {
//     responseType = "safe";
//   } else if (compatibility.toLowerCase().includes("not recommended")) {
//     responseType = "unsafe";
//   } else if (compatibility.toLowerCase().includes("opinions among experts")) {
//     responseType = "vary";
//   } else {
//     responseType = "unknown";
//   }

//   if (!compatibility) {
//     return res.status(400).json({
//       error: "No compatibility information available for these ingredients.",
//     });
//   }

//   try {
//     const systemContent = `
// You are a helpfull skincare expert helping users with ${mySkinType} skin.
// Always use the compatibility information as the basis for your response.
// ensure your response aligns with the provided data. In addition if you know any information regarding the ${mySkinType} skin type that might change the answer, also use that information. Respond in 8 words or less and add emojis to the response based on the response itself.
// `;
//     const userContent = `I want to mix a product with ${ingredient1} and another with ${ingredient2} in my skin care routine. Based on the compatibility information "${compatibility}", is this a good idea?`;
//     // Call OpenAI's chat API with the model and user message
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: systemContent },
//         { role: "user", content: userContent },
//       ],
//       max_tokens: 100,
//     });

//     // Send the AI's response back to the client
//     console.log(response.choices[0].message);
//     res.json({
//       reply: response.choices[0].message.content,
//       responseType,
//     });
//   } catch (error) {
//     console.log("Error communicating with OpenAI:", error);
//     res
//       .status(500)
//       .json({ error: "Something went wrong. Please try again later." });
//   }
// });

// export default router;

import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const router = express.Router();

// Load compatibility info
const compatibilityInfo = JSON.parse(
  await readFile(join(__dirname, "../data/compatibilityInfo.json"), "utf8")
);

// Initialize OpenAI SDK
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

router.post("/", async (req, res) => {
  const { ingredient1, ingredient2, mySkinType } = req.body;

  if (!ingredient1 || !ingredient2 || !mySkinType) {
    return res.status(400).json({ error: "all fields are required" });
  }

  if (ingredient1 === ingredient2 && ingredient1 !== "retinol") {
    return res.json({
      reply: "Please choose two different active ingredients",
    });
  }

  // Check compatibility
  const compatibility =
    compatibilityInfo[ingredient1] &&
    compatibilityInfo[ingredient1][ingredient2];

  if (!compatibility) {
    return res.status(400).json({
      error: "No compatibility information available for these ingredients.",
    });
  }

  let responseType;
  if (compatibility.toLowerCase().includes("safe")) {
    responseType = "safe";
  } else if (compatibility.toLowerCase().includes("not recommended")) {
    responseType = "unsafe";
  } else if (compatibility.toLowerCase().includes("opinions among experts")) {
    responseType = "vary";
  } else {
    responseType = "unknown";
  }

  try {
    const systemContent = `You are a helpfull skincare expert helping users with ${mySkinType} skin. Always use the compatibility information as the basis for your response. ensure your response aligns with the provided data. In addition if you know any information regarding the ${mySkinType} skin type that might change the answer, also use that information. Respond in 8 words or less and add emojis to the response based on the response itself.`;

    const userContent = `I want to mix a product with ${ingredient1} and another with ${ingredient2} in my skin care routine. Based on the compatibility information "${compatibility}", is this a good idea?`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: userContent },
      ],
      max_tokens: 100,
    });

    res.json({
      reply: response.choices[0].message.content,
      responseType,
    });
  } catch (error) {
    console.log("Error communicating with OpenAI:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
});

export default router;
