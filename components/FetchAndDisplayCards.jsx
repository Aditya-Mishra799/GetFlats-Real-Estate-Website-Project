"use client";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

const FetchAndDisplayCards = ({
  apiEndpoint,
  CardComponet,
  session,
  type,
  CardSkeleton,
  placeholderCount = 8,
  currentPage = 1,
  limit = 20,
}) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paginationData, setPaginationData] = useState({
    currentPage: currentPage,
    limit: limit,
    totalDocuments: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiEndpoint]);

  const handleReload = () => {
    if (window) {
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <>
        {CardSkeleton ? (
          <div className="flex flex-wrap justify-center gap-6">
            {Array(placeholderCount)
              .fill(null)
              .map((_, index) => (
                <CardSkeleton key={index} />
              ))}
          </div>
        ) : (
          <div className="w-full py-8 text-center flex justify-center items-center flex-col">
            <Loader2 className="animate-spin text-smooth-orange" size={56} />
          </div>
        )}
      </>
    );
  } else if (cards.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <p className="text-xl text-gray-600 font-semibold">
          Nothing to show here
        </p>
        <p className="text-gray-500">No items found in this section</p>
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
