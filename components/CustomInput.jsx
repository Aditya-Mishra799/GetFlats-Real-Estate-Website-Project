import React, { useState, useEffect, useRef } from "react";

const CustomInput = ({ value, setValue }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const selectedSuggestionRef = useRef(null);


  useEffect(() => {
    let timer = null 
    if (value.length > 2) {
      timer = setTimeout(()=> fetchSuggestions(value), 300)
    } else {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
    return () => clearTimeout(timer)
  }, [value]);

  useEffect(()=>{
    if(selectedSuggestionRef.current){
      selectedSuggestionRef.current.scrollIntoView({
        behaviour : "smooth",
        block : "nearest",
      })
    }
  }, [selectedSuggestionRef.current])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    // Arrow Down
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }
    // Arrow Up
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }
    // Enter
    else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[selectedIndex]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setValue(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          placeholder="Search properties..."
          className="w-full px-4 pr-8 py-3 rounded-lg border border-gray-200 focus:border-active-orange focus:ring-2 focus:ring-active-orange/20 transition-all duration-200 bg-white shadow-sm"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length > 2 && setShowSuggestions(true)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              ref = {index === selectedIndex ? selectedSuggestionRef : null}
              className={`px-4 py-3 cursor-pointer transition-colors duration-150
                ${index === selectedIndex 
                  ? 'bg-active-orange text-white' 
                  : 'hover:bg-gray-50 text-gray-700'}`}
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-search text-sm opacity-70"></i>
                <span className={`${index === selectedIndex ? 'text-white' : 'text-gray-700'}`}>
                  {suggestion}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomInput;