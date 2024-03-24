import React from "react";
import InputForm from "./InputForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./Button";
import { useSnackBar } from "./SnackBar/SnackBarService";
import { useSession } from 'next-auth/react';
import Link from "next/link";
import * as z from "zod";

const formInputFields = (commonProps) => [
    {
      label: "Link (from Momento360)",
      elementType: "input",
      type: "text",
      name: "panorama",
      ...commonProps,
    },
  ];
const validLink = z.object({
    panorama : z.string().refine((link)=>/^https:\/\/(www\.)?momento360\.com\/e\/u\/.*$/gm.test(
        link
    ), {message: 'Must be a valid momento 360 link (https://momento360.com/e/u/*)'})
})
const Add3DImagePage = ({listing_id}) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
        getValues,
        clearErrors,
        setValue,
      } = useForm({
        resolver: zodResolver(validLink),
      });
      const snackBar = useSnackBar();
      const { data: session } = useSession()
      const commonProps = { control, errors, register, setValue, getValues };
      const submitForm = async (data) => {
        const snackBarId = snackBar.open(
          "loading",
          {
            label: "Submitting Form...",
            message: "Please wait until form is submitting",
          },
          Infinity
        );
        try {
          const result = await fetch("/api/listing/add-panorama", {
            method: "POST",
            body: JSON.stringify({
              ...data,
              creator: session?.user?.id,
              property_listing_id: listing_id,
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
              message: "Your 3D image has been submitted successfully",
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
            Please Login to add 3D image!
          </div>
        );
      }
  return (
    <form
      className="w-full flex flex-col"
      onSubmit={handleSubmit(submitForm)}
    >
        <div className="px-2 py-1 border-2 border-dashed mb-5 hover:border-faded-orange transition-all ">
            <h3 className="text-md text-slate-600">Instructions</h3>
            <p className="text-xs tracking-wide">Please Upload your panorama image to momento 360 and add the link here.</p>
            <Link 
            href = 'https://www.momento360.com/'
            target="_blank"
            className="text-xs underline cursor-pointer text-active-orange"
            >Momento 360</Link>
        </div>
      <InputForm inputFeilds={formInputFields(commonProps)} />
      <Button
        className={"uppercase tracking-wide mx-4 my-1 md:mx-6 lg:mx-8"}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

export default Add3DImagePage