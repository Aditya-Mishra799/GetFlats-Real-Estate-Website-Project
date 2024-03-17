import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import PropertyListingSchema from "@models/schema/PropertyListingSchema";
import InputForm from "./InputForm";
import { useSession } from 'next-auth/react'
import { data } from "autoprefixer";
import { createFormData } from "@common_functions/create_form_data";
import { useSnackBar } from "./SnackBar/SnackBarService";
const MultiStepForm = ({
  formPages,
  errors,
  getValues,
  trigger,
  clearErrors,
  reset,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const {data:session} = useSession()
  const markerRef = useRef(null)
  const progressBarRef = useRef(null)
  const [submitting, setSubmitting] = useState(false);
  const snackBar = useSnackBar()
  const goBack = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  };
  //this will set the with of progress Bar Fill
  const updateBarWidth = ()=>{
    const progressBarRect = progressBarRef.current.getBoundingClientRect();
    const markerRect = markerRef.current.getBoundingClientRect();
    const width =  markerRect.right - progressBarRect.left;
    setProgressBarWidth(width)
  }

  useEffect(()=>{
    updateBarWidth()
     // Attach event listener for window resize
     window.addEventListener('resize', updateBarWidth);

     // Cleanup function to remove event listener
     return () => {
       window.removeEventListener('resize', updateBarWidth);
     };
  }, [currentStep])
 
  
  const goForward = async () => {
    if (currentStep === formPages.length - 1) return;
    // check if any field is invalid
    // if yes then don't move forward
    // else move ahead
    const fields = getValues();
    try {
      console.log(errors, fields);
      currentStep < formPages.length &&
        formPages[currentStep]?.form.map((inputField) => 
          PropertyListingSchema.pick({ [inputField.name]: true }).parse({
            [inputField.name]: fields[inputField.name],
          })
        );
      setCurrentStep(currentStep + 1);
      clearErrors()
    } catch (error) {
      trigger();
      console.log(error);
    }
  };
  // const  handleClickOnNextButton = ()=>{}
  const handleClickOnNextButton = async () => {
    if (currentStep < formPages.length - 1) {
      goForward()
    }
    if(currentStep === formPages.length - 1){
       if(Object.keys(errors).length === 0){
        const data = getValues()
        //convert object to form data
        const formData = createFormData({...data, creator: session?.user.id})
        setSubmitting(true)
        const id = snackBar.open('loading', {
          label: 'Submitting Form...',
          message: 'Please wait until form is submitting',
        }, Infinity)
        //push the data to backend
        try {
          const res = await fetch('/api/listing/new',{
            method: 'POST',
            body: formData,
          })
          const responseData = await res.json()
          snackBar.open('success', {
            label: 'Submission Successfull',
            message: 'click to view',
            link: {
              label: 'show',
              href :`/listing/?id=${responseData?._id}`
            }
          }, 7000)
          setCurrentStep(0)
          reset()
         }
        catch (error) {
          console.error(error)
          snackBar.open('alert', {
            label: 'Submission Failed',
            message: <div className="max-w-16 truncate ...">`Error : ${JSON.stringify(error)}`</div>,
          }, 7000)
        }finally{
          setSubmitting(false)
          snackBar.close(id)
        }
    }
  }
}
  useEffect(()=>{
    console.log(errors, getValues());
  }, [errors])
  return (
    <form
      className="flex flex-col space-y-3 py-3 gap-2 px-5 border"
    >
      {/* Progress Bar */}
      <div className="flex flex-col items-center space-y-2 my-3 ">
        <div className="w-52 flex justify-between flex-nowrap   relative sm:w-72 md:w-80 lg:w-96">
          <div className="w-full bg-slate-300 h-1 absolute left-0 top-1/2"  ref = {progressBarRef}>
            <div
              className="bg-smooth-orange h-1"
              style={{
                width: progressBarWidth
              }}
            ></div>
          </div>
          {formPages.map((step, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 z-10 transition-all duration-300"
                ref = {index === currentStep ? markerRef : null}
              >
                <div
                  className={`h-7 w-7 p-2 rounded-full  text-white ${
                    index <= currentStep
                      ? index == currentStep
                        ? "bg-active-orange"
                        : "bg-dark-orange"
                      : "bg-slate-400"
                  }  flex items-center justify-center transition-all duration-300`}
                >
                  {index < currentStep ? "\u2713" : index + 1}
                </div>
              </div>
            );
          })}
        </div>
        <div className={"text-pretty text-2xl font-semibold  flex pt-3"}>
          {formPages[currentStep].title}
        </div>
      </div>
      {/* Current Form */}
      <div className="flex w-full justify-center">
        <InputForm inputFeilds={formPages[currentStep].form} />
      </div>
      {/* Navigation buttons */}
      <div className="w-full flex justify-around px-10">
        <Button disable={currentStep === 0 || submitting} onClick={goBack}>
          &larr; Previous
        </Button>
        <Button
          type="button"
          onClick = {handleClickOnNextButton}
          disable = {submitting }
        >
          {currentStep === formPages.length - 1 ? 'Submit' : <>Next &rarr;</>}
        </Button>
      </div>
    </form>
  );
};

export default MultiStepForm;
