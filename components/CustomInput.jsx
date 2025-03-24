import React, { useState, useEffect } from "react";

const CustomInput = ({ value, setValue }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  }, [value]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`/api/auto-complete?query=${query}`);
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setValue(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <input
        placeholder="Enter search keywords"
        className="w-full border-2 border-highlight-orange px-2 py-1 rounded-md focus:outline-2 focus:outline-active-orange"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => value.length > 2 && setShowSuggestions(true)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomInput;
