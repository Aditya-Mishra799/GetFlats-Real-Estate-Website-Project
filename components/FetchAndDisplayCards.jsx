"use client";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

const limitOptions = [5, 10, 20, 30];

const FetchAndDisplayCards = ({
  apiEndpoint,
  CardComponet,
  session,
  type,
  CardSkeleton,
  placeholderCount = 8,
  currentPage = 1,
  limit = 20,
  paginate = false,
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
        let params = "";
        if (paginate) {
          const searchParams = new URLSearchParams({
            page: paginationData.currentPage,
            limit: paginationData.limit,
          });
          params = searchParams.toString();
          apiEndpoint += `?${params}`
        }
        const response = await fetch(apiEndpoint);
        if(!response.ok){
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCards(data?.items || []);
        if (paginate) {
          setPaginationData((prev) => ({
            ...prev,
            totalDocuments: data?.totalDocuments ?? 0,
            totalPages: data?.totalPages ?? 0,
          }));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiEndpoint, paginationData.currentPage, paginationData.limit]);

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

  const generatePagination = (currentPage, totalPages, maxVisiblePages = 5) => {
    if (totalPages === 0) return []; // No pages to show

    const pages = [];
    // Always show first page
    if (currentPage > 2) pages.push(1);

    // Add "..." if there’s a gap between first and current
    if (currentPage > 3) pages.push("...");

    // Generate a range of pages around the current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add "..." if there’s a gap between last and current
    if (currentPage < totalPages - 2) pages.push("...");

    // Always show last page
    if (currentPage < totalPages - 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col gap-4">
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
      {paginate && (
        <div className="flex w-full flex-col justify-between gap-2 ">
          <div className="w-full flex gap-1 justify-center">
            <button
              className="px-2 py-1 rounded-md text-white shadow-md bg-smooth-orange hover:bg-active-orange transition-colors disabled:bg-gray-400 cursor-pointer"
              disabled={
                paginationData.currentPage === 1 ||
                paginationData.totalPages === 0
              }
              onClick={() =>
                setPaginationData((prev) => ({
                  ...prev,
                  currentPage: prev.currentPage - 1,
                }))
              }
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex gap-0.5 md:gap-2">
              {generatePagination(
                paginationData.currentPage,
                paginationData.totalPages
              ).map((page, index) => (
                <button
                  key={"" + page + index}
                  onClick={() => {
                    if (page !== "...") {
                      setPaginationData((prev) => ({
                        ...prev,
                        currentPage: page,
                      }));
                    }
                  }}
                  className={`font-medium tracking-wider px-1.5 py-0.5 text-xs md:text-sm lg:text-base rounded-sm ${
                    paginationData.currentPage === page
                      ? "text-white bg-active-orange"
                      : ""
                  } ${
                    page !== "..."
                      ? "hover:underline cursor-pointer text-smooth-orange "
                      : ""
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              className="px-2 py-1 rounded-md text-white shadow-md bg-smooth-orange hover:bg-active-orange transition-colors disabled:bg-gray-400 cursor-pointer"
              disabled={
                paginationData.currentPage === paginationData.totalPages ||
                paginationData.totalPages === 0
              }
              onClick={() =>
                setPaginationData((prev) => ({
                  ...prev,
                  currentPage: prev.currentPage + 1,
                }))
              }
            >
              <ArrowRight size={24} />
            </button>
          </div>
          <div className="flex items-center gap-2 self-end">
            <label
              htmlFor="perPageSelect"
              className="text-gray-600 text-xs md:text-sm"
            >
              Show:
            </label>
            <select
              id="perPageSelect"
              className="border border-gray-300 text-gray-700 rounded-md px-2 md:px-3 py-1 text-sm focus:outline-none focus:ring-1  focus:ring-active-orange focus:border-none"
              value={paginationData.limit}
              onChange={(e) =>
                setPaginationData((prev) => ({
                  ...prev,
                  limit: e.target.value,
                  currentPage: 1,
                }))
              }
            >
              {limitOptions.map((optionValue) => (
                <option value={optionValue} key={optionValue}>
                  {optionValue}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchAndDisplayCards;
