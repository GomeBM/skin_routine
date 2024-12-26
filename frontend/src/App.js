import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import InputIngredients from "./components/InputIngredients/InputIngredients";
import HomePage from "./components/HomePage/HomePage";
import MainPage from "./components/MainPage/MainPage";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/input-ingredients" element={<InputIngredients />} />
          <Route path="/main-page" element={<MainPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
