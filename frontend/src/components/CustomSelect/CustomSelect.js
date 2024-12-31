import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./CustomSelect.css";

const CustomSelect = ({ value, onChange, options = [], placeholder }) => {
  const safeOptions = Array.isArray(options) ? options.filter(Boolean) : [];

  return (
    <div className="select-wrapper">
      <select value={value} onChange={onChange} className="select">
        <option value="">{placeholder}</option>
        {safeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ExpandMoreIcon className="select-icon" />
    </div>
  );
};

export default CustomSelect;
