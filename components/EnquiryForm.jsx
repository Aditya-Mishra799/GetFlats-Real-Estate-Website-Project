import React from "react";
import InputForm from "./InputForm";
import EnquirySchema from "@models/schema/EnquirySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./Button";
import { useSnackBar } from "./SnackBar/SnackBarService";
const formInputFields = (commonProps) => [
  {
    label: "Phone Number",
    elementType: "input",
    type: "number",
    name: "phone",
    ...commonProps,
  },
  {
    label: "Other Email",
    elementType: "input",
    type: "text",
    name: "email",
    ...commonProps,
  },
  {
    label: "Description",
    elementType: "textarea",
    name: "description",
    ...commonProps,
  },
];
const EnquiryForm = ({ listing_id, session }) => {
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
    resolver: zodResolver(EnquirySchema),
  });
  const snackBar = useSnackBar();
  const commonProps = { control, errors, register, setValue, getValues };
  const submitEnquiry = async (data) => {
    const snackBarId = snackBar.open(
      "loading",
      {
        label: "Submitting Form...",
        message: "Please wait until form is submitting",
      },
      Infinity
    );
    try {
      const result = await fetch("/api/enquiry/new", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          creator: session?.user?.id,
          property_listing: listing_id,
        }),
      });
      if (!result.ok) {
        throw new Error( JSON.stringify( (await result.json())?.message));
      }
      reset();
      clearErrors();
      snackBar.open(
        "success",
        {
          label: "Submission Successful",
          message: "Your enquiry has been submitted successfully",
          link: {
            href: "/profile",
            label: "view",
          },
        },
        7000
      );
    } catch (error) {
      snackBar.open(
        "alert",
        {
          label: "Submission Failed",
          message: (
            <div className="">{`Error : ${error?.message}`}</div>
          ),
        },
        7000
      );
    } finally {
      snackBar.close(snackBarId);
    }
  };
  if (!session?.user) {
    return (
      <div className="w-full h-full text-xl font-bold flex justify-center items-center text-red-500">
        Please Login to make an Enquiry!
      </div>
    );
  }
  return (
    <form
      className="w-full flex flex-col"
      onSubmit={handleSubmit(submitEnquiry)}
    >
      <InputForm inputFeilds={formInputFields(commonProps)} />
      <Button
        className={"uppercase tracking-wide mx-4 my-1 md:mx-6 lg:mx-8"}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default EnquiryForm;
