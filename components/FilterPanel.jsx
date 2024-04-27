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
    //if reseset the reset the inputState
    if (jsonQueryString === "{}") {
      setInputState(initialFilterState);
    }
    router.push(`/search?page=1&query=${jsonQueryString}`)
  };

  const FilterLocationInput = (
    <Modal
      isOpen={openMapModal}
      onClose={() => setOpenMapModal(false)}
      title={"All the listings with in 10km radius will be shown"}
    >
      <DynamicFilterMap {...mountInputs("coordinates")} />
    </Modal>
  );
  const filterComp = (
    <div className={`w-full flex flex-col gap-4 text-center px-8 py-4 h-full `}>
      <h3 className="text-2xl font-semibold ">Filter listings</h3>
      <CustomInput  {...mountInputs("keywords")}/>
      <MultiSelectMenu
        options={listingTypeOptions}
        menuLabel={"Listing Types"}
        {...mountInputs("listing_type")}
      />
      <MultiSelectMenu
        options={furnishedStatusOptions}
        menuLabel={"Furnish status"}
        {...mountInputs("furnished_status")}
      />
      <MultiSelectMenu
        options={amenitiesOptions}
        menuLabel={"Amenities"}
        {...mountInputs("amenities")}
      />
      <MultiSelectMenu
        options={propertyOptions}
        menuLabel={"Property Types"}
        {...mountInputs("property_type")}
      />
      <RangeInput label={"Price"} {...mountInputs("price", 1000, Infinity)} />
      <RangeInput label={"Area"} {...mountInputs("area", 50, Infinity)} />
      <RangeInput label={"Bedrooms"} {...mountInputs("bedrooms", 1, 5)} />
      <RangeInput label={"Bathrooms"} {...mountInputs("bathrooms", 1, 5)} />
      <RangeInput label={"Halls"} {...mountInputs("halls", 0, 3)} />

      <button
        className="outline_btn upppercase"
        onClick={() => setOpenMapModal(true)}
      >
        Add Location
      </button>
      <div className="flex flex-col gap-2 mt-6">
        <button
          className="primary_btn uppercase tracking-wider font-medium"
          onClick={() => {
            handleFilterSubmit(JSON.stringify(inputState));
            setIsOpen(false);
          }}
        >
          Apply Filter
        </button>
        <button
          className="outline_btn uppercase tracking-wider font-medium"
          onClick={() => handleFilterSubmit("{}")}
        >
          Reset filter
        </button>
      </div>
    </div>
  );
  return (
    <div className="w-full">
      {isOpen && (
        <div
          className={` lg:hidden absolute z-20 w-[98vw] bg-slate-50 min-h-screen top-[50px] `}
        >
          <div className="w-full  relative h-full">
            <span
              className="text-xl absolute top-2 right-4 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              X
            </span>
            {filterComp}
          </div>
        </div>
      )}
      <div className="w-full  hidden lg:block">{filterComp}</div>
      <div
        className={`fixed bottom-5 left-5 text-white p-5 rounded-full bg-active-orange ${
          isOpen && "hidden"
        } lg:hidden cursor-pointer z-50 shadow-lg `}
        onClick={() => {
          setIsOpen(true);
          scrollToTop();
        }}
      >
        <FaFilter size={20} />
      </div>
      {FilterLocationInput}
    </div>
  );
};

export default FilterPanel;
