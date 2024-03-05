import * as z from "zod";
import {
  propertyOptions,
  amenitiesOptions,
  furnishedStatusOptions,
  listingTypeOptions,
} from "@utils/ListingData.js";

const validateChoosenOption = (value, options) => {
  return options.some(
    (option) => option.value === value.value && option.label === value.label
  );
};
//Schema for checking if a valid option is choosen from list of provided options
const optionSchema = (options) =>
  z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .refine((value) => validateChoosenOption(value, options), {
      message: "The Choosen option is not valid.",
    });
//validates if a string is number between min and max (inclusive of main and max)
const validNumberSchema = (min, max) =>
  z.string().refine(
    (val) => {
      const num = Number(val);
      return val !== '' && (num || num === 0) && (num >= min && num <= max);
    },
    { message: `Must be a valid integer between ${min} - ${max}.` }
  );

const validDateSchema = () =>
  z.string().refine(
    (date) => {
      const dateObj = new Date(date);
      return !isNaN(dateObj.getTime());
    },
    { message: "Please provide a valid Date." }
  );

const PropertyListingSchema = z.object({
  property_title: z
    .string()
    .min(5, { message: "Title must be more than 5 characters" }),
  property_description: z.string().min(30),
  listing_type: optionSchema(listingTypeOptions),
  property_type: optionSchema(propertyOptions),
  amenities: z
    .array(optionSchema(amenitiesOptions), { message: "Choose valid amenites" })
    .min(1, { message: "Must have atleast one amenities." }),
  furnished_status: optionSchema(furnishedStatusOptions),
  bathrooms: validNumberSchema(0, 10),
  bedrooms: validNumberSchema(0, 15),
  halls: validNumberSchema(0, 3),
  construction_date: validDateSchema(),
});

export default PropertyListingSchema;
