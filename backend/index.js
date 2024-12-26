// Import required libraries
import express from "express";
import cors from "cors";
import router from "./routes/gpt.routes.js";

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

app.use("/api", router);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
