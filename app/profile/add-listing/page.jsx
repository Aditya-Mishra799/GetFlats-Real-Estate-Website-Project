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
import { useCheckLoginAndRedirect } from "@common_functions/check_login_and_redirect";
import { useSession } from "next-auth/react";
const page = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    trigger,
    getValues,
    clearErrors,
    setValue,
  } = useForm({
    resolver: zodResolver(PropertyListingSchema),
  });

  const commonProps = { control, errors, register, setValue, getValues };
  const formPages = [
    {
      title: "Add Listing Details",
      form: [
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
        {
          label: "Area of Flat",
          elementType: "input",
          type: "number",
          name: "area",
          ...commonProps,
        },
      ],
    },
    {
      title: "Add Description",
      form: [
        {
          label: "Description",
          elementType: "textarea",
          name: "property_description",
          ...commonProps,
        },
      ],
    },
    {
      title : 'Add Pricing and Contact Details',
      form : [
        {
          label: "Enter Pricing",
          elementType: "input",
          type: "number",
          name: "price",
          ...commonProps,
        },
        {
          label: "Phone Number",
          elementType: "input",
          type: "number",
          name: "phone",
          ...commonProps,
        },
      ]
    },
    {
      title: "Add Images",
      form: [
        {
          label: "Add Image",
          elementType: "image-input",
          name: "media",
          ...commonProps,
          defaultValue:  {
            thumbnail: null,
            images: [],
          },
        },
      ],
    },
    {
      title: "Add Location of Listing",
      form: [
        {
          label: "Location",
          elementType: "map-input",
          name: "location",
          ...commonProps,
          defaultValue: {
            coordinates:  [19.076,72.8777],
            address : {},
          }
        },
      ],
    },
  ];
  const { data: session } = useSession();
  useCheckLoginAndRedirect(session);
  return (
    <>
    {session?.user && <div>
      Add Listing
      <MultiStepForm
        formPages={formPages}
        handleSubmit={handleSubmit}
        getValues={getValues}
        trigger={trigger}
        clearErrors={clearErrors}
        errors={errors}
        reset = {reset}
      />
    </div>}
    </>
  );
};

export default page;
