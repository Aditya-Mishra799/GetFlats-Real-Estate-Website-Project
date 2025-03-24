"use client";
import React, { useState, useEffect } from "react";

const FetchAndDisplayCards = ({ apiEndpoint, CardComponet, session, type }) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    try {
      fetch(apiEndpoint)
        .then((response) => response.json())
        .then((data) => setCards(data));
    } catch (err) {
      setError(err);
    }
  }, [apiEndpoint]);

  const handleReload = () => {
    if (window) {
      window.location.reload();
    }
  };
  if (cards.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <p className="text-xl text-gray-600 font-semibold">
          Nothing to show here
        </p>
        <p className="text-gray-500">No items found in this section</p>
      </div>
    );
  } else if (error === null && cards.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <div className="loading-circle mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading...</p>
      </div>
    );
  }

  if (error !== null) {
    return (
      <div className="w-full py-8 text-center">
        <p className="text-xl text-red-500 font-bold mb-2">
          Error while loading
        </p>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={handleReload}
          className="px-4 py-2 bg-active-orange text-white rounded-lg hover:bg-dark-orange transition-colors duration-300"
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {cards.map((cardData, index) => (
        <CardComponet
          key={cardData._id || index}
          data={cardData}
          session={session}
          setCards={setCards}
          index={index}
          {...(type && { type: type })}
        />
      ))}
    </div>
  );
};

export default FetchAndDisplayCards;
