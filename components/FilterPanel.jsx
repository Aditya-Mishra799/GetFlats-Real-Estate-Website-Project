"use client";
import {
  amenitiesOptions,
  furnishedStatusOptions,
  listingTypeOptions,
  propertyOptions,
} from "@utils/ListingData";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import MultiSelectMenu from "./MultiSelectMenu";
import RangeInput from "./RangeInput";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import dynamic from "next/dynamic";
import CustomInput from "./CustomInput";

const DynamicFilterMap = dynamic(() => import("@components/FilterMap"), {
  ssr: false,
  loading: () => (
    <p className="text-center text-gray-500 font-bold text-xl w-full h-full flex justify-center items-center">
      Loading Map...
    </p>
  ),
});

const initialFilterState = {
  amenities: [],
  listing_type: [],
  property_type: [],
  furnished_status: [],
  price: [1000, 1000000],
  area: [50, 5000],
  bedrooms: [1, 5],
  halls: [0, 3],
  bathrooms: [1, 5],
  coordinates: [],
  keywords: '',
};

const FilterPanel = ({ query, revalidateAndGetdata }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryObject = JSON.parse(query);
  const router = useRouter();
  const [openMapModal, setOpenMapModal] = useState(false);
  const initialValue =
    Object.keys(queryObject).length === 0 ? initialFilterState : queryObject;
  const [inputState, setInputState] = useState(initialValue);

  const mountInputs = (name, min, max) => {
    const value = inputState[name];
    const setValue = (updateValue) =>
      setInputState({ ...inputState, [name]: updateValue });

    return {
      value,
      setValue,
      min: min,
      max: max,
    };
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleFilterSubmit = (jsonQueryString) => {
    if (jsonQueryString === "{}") {
      setInputState(initialFilterState);
    }
    router.push(`/search?page=1&query=${jsonQueryString}`);
  };

  const FilterLocationInput = (
    <Modal
      isOpen={openMapModal}
      onClose={() => setOpenMapModal(false)}
      title={"All listings within 10km radius will be shown"}
    >
      <DynamicFilterMap {...mountInputs("coordinates")} />
    </Modal>
  );

  const filterComp = (
    <div className="w-full space-y-6 px-6 py-8">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-800">Filter Properties</h3>
        <p className="text-gray-600">Refine your search to find the perfect property</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Search</h4>
          <CustomInput {...mountInputs("keywords")} />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Property Type</h4>
          <MultiSelectMenu
            options={listingTypeOptions}
            menuLabel="Listing Types"
            {...mountInputs("listing_type")}
          />
          <MultiSelectMenu
            options={furnishedStatusOptions}
            menuLabel="Furnishing Status"
            {...mountInputs("furnished_status")}
          />
          <MultiSelectMenu
            options={propertyOptions}
            menuLabel="Property Types"
            {...mountInputs("property_type")}
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Price & Area</h4>
          <RangeInput label="Price Range (₹)" {...mountInputs("price", 1000, Infinity)} />
          <RangeInput label="Area (sq.ft)" {...mountInputs("area", 50, Infinity)} />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Rooms</h4>
          <div className="grid grid-cols-1 gap-4">
            <RangeInput label="Bedrooms" {...mountInputs("bedrooms", 1, 5)} />
            <RangeInput label="Bathrooms" {...mountInputs("bathrooms", 1, 5)} />
            <RangeInput label="Halls" {...mountInputs("halls", 0, 3)} />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Amenities</h4>
          <MultiSelectMenu
            options={amenitiesOptions}
            menuLabel="Select Amenities"
            {...mountInputs("amenities")}
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Location</h4>
          <button
            className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
            onClick={() => setOpenMapModal(true)}
          >
            <i className="fa-solid fa-location-dot"></i>
            Set Location
          </button>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <button
            className="w-full py-3 px-4 bg-active-orange text-white rounded-lg hover:bg-dark-orange transition-all duration-200 font-medium"
            onClick={() => {
              handleFilterSubmit(JSON.stringify(inputState));
              setIsOpen(false);
            }}
          >
            Apply Filters
          </button>
          <button
            className="w-full py-3 px-4 border border-active-orange text-active-orange rounded-lg hover:bg-active-orange/5 transition-all duration-200 font-medium"
            onClick={() => handleFilterSubmit("{}")}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
          {filterComp}
        </div>
      )}

      <div className="w-full hidden lg:block bg-white rounded-xl shadow-md">
        {filterComp}
      </div>

      <button
        className="fixed bottom-5 left-5 z-50 lg:hidden bg-active-orange text-white p-4 rounded-full shadow-lg hover:bg-dark-orange transition-all duration-200"
        onClick={() => {
          setIsOpen(true);
          scrollToTop();
        }}
      >
        <FaFilter size={20} />
      </button>

      {FilterLocationInput}
    </div>
  );
};

export default FilterPanel;