// import React, { useState, useRef, useEffect } from "react";
// import "./Dropdown.css";

// const Dropdown = ({ items, onSelect }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSelect = (item) => {
//     onSelect(item);
//     setIsOpen(false); // Close dropdown on select
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsOpen(false); // Close dropdown on outside click
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="dropdown" ref={dropdownRef}>
//       <button className="dropdown-toggle" onClick={handleToggle}>
//         Toggle Dropdown
//       </button>
//       {isOpen && (
//         <ul className="dropdown-menu">
//           {items.map((item, index) => (
//             <li
//               key={index}
//               className="dropdown-item"
//               onClick={() => handleSelect(item)}
//             >
//               {item}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Dropdown;

import React from "react";
import "./Dropdown.css";

const Dropdown = ({ items, onSelect }) => {
  return (
    <div className="dropdown-menu">
      {items.map((item) => (
        <div
          key={item}
          className="dropdown-item"
          onClick={() => onSelect(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
