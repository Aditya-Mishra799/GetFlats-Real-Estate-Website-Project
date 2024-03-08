"use client";
import MultiStepForm from "@components/MultiStepForm";
import React from "react";
import InputForm from "@components/InputForm";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  propertyOptions,
  amenitiesOptions,
  furnishedStatusOptions,
  listingTypeOptions,
} from "@utils/ListingData.js";

import PropertyListingSchema from "@models/schema/PropertyListingSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    trigger,
    getValues,
    clearErrors,
  } = useForm({ resolver: zodResolver(PropertyListingSchema) });

  const commonProps = { control, errors, register };
  const formInputFeilds = [
    [
      {
        label: "Title",
        elementType: "input",
        type: "text",
        name: "property_title",
        ...commonProps,
      },
      {
        label: "Listing Type",
        elementType: "multi-choice",
        name: "listing_type",
        ...commonProps,
        options: listingTypeOptions,
      },
      {
        label: "Aemnities",
        elementType: "multi-select",
        name: "amenities",
        ...commonProps,
        options: amenitiesOptions,
      },
      {
        label: "Property Type",
        elementType: "select",
        name: "property_type",
        ...commonProps,
        options: propertyOptions,
      },
      {
        label: "Furnished Status",
        elementType: "multi-choice",
        name: "furnished_status",
        ...commonProps,
        options: furnishedStatusOptions,
      },
      {
        label: "Bathrooms",
        elementType: "input",
        type: "number",
        name: "bathrooms",
        ...commonProps,
      },
      {
        label: "Bedrooms",
        elementType: "input",
        type: "number",
        name: "bedrooms",
        ...commonProps,
      },
      {
        label: "Halls",
        elementType: "input",
        type: "number",
        name: "halls",
        ...commonProps,
      },
      {
        label: "Construction Date",
        elementType: "input",
        type: "date",
        name: "construction_date",
        ...commonProps,
      },
    ],
    [
      {
        label: "Description",
        elementType: "textarea",
        name: "property_description",
        ...commonProps,
      },
    ],
    [
      {
        label: "Location",
        elementType: "map-input",
        name: "loctaion",
        ...commonProps,
      },
    ],
  ];
  const steps = [
    {
      name: "Add Listing Details",
      component: <InputForm inputFeilds={formInputFeilds[0]} />,
    },
    {
      name: "Add Listing Description",
      component: <InputForm inputFeilds={formInputFeilds[1]} />,
    },
    {
      name: "Add Loctaion Details",
      component: <InputForm inputFeilds={formInputFeilds[2]} />,
    },
    {
      name: "Choose listing type",
      component: <div>Choose listing type!</div>,
    },
  ];
  return (
    <div>
      Add Listing
      <MultiStepForm
        steps={steps}
        handleSubmit={handleSubmit}
        getValues={getValues}
        trigger={trigger}
        clearErrors={clearErrors}
        errors={errors}
        formInputFeilds = {formInputFeilds}
      />
    </div>
  );
};

export default page;
