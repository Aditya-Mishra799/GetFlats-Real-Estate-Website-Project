import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import PropertyListingSchema from "@models/schema/PropertyListingSchema";
import { data } from "autoprefixer";

const MultiStepForm = ({
  steps,
  handleSubmit,
  errors,
  getValues,
  trigger,
  clearErrors,
  formInputFeilds,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const goBack = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  };
  const goForward = async () => {
    if (currentStep === steps.length - 1) return;
    // check if any field is invalid
    // if yes then don't move forward
    // else move ahead
    const fields = getValues();
    try {
      currentStep < formInputFeilds.length &&
        formInputFeilds[currentStep].map((inputField) => fields[inputField.name] &&
          PropertyListingSchema.pick({ [inputField.name]: true }).parse({
            [inputField.name]: fields[inputField.name],
          })
        );
      setCurrentStep(currentStep + 1);
      clearErrors();
    } catch (error) {
      trigger();
      console.log(error);
    }
  };
  const handleClickOnNextButton = (data) => {
    if (currentStep < steps.length - 1) {
      goForward();
    }
    console.log(data);
  };
  useEffect(() => {
    console.log(errors, getValues());
  }, [errors]);
  return (
    <form
      className="flex flex-col space-y-3 py-3 gap-2 px-5 border"
      onSubmit={handleSubmit(handleClickOnNextButton)}
    >
      {/* Progress Bar */}
      <div className="flex flex-col items-center space-y-2 my-3 ">
        <div className="flex gap-8 flex-wrap justify-around lg:gap-16 relative">
          <div className="w-full bg-slate-300 h-1 absolute left-0 top-1/2">
            <div
              className="bg-smooth-orange h-1"
              style={{
                width:
                  currentStep && `${(currentStep / steps.length) * 100 + 15}%`,
              }}
            ></div>
          </div>
          {steps.map((step, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 z-10 transition-all duration-300"
              >
                <div
                  className={`h-10 w-10 p-2 rounded-full  text-white ${
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
          {steps[currentStep].name}
        </div>
      </div>
      {/* Current Form */}
      <div className="flex w-full justify-center">
        {steps[currentStep].component}
      </div>
      {/* Navigation buttons */}
      <div className="w-full flex justify-around px-10">
        <Button disable={currentStep === 0} onClick={goBack}>
          &larr; Previous
        </Button>
        <Button
          type="submit"
          {...(currentStep < steps.length - 1 && {
            type: "button",
            onClick: goForward,
          })}
        >
          Next &rarr;
        </Button>
      </div>
    </form>
  );
};

export default MultiStepForm;
