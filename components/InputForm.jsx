import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Select from "./Select";
import MultiChoice from "./MultiChoice";
import { Controller } from "react-hook-form";
import MutlipleSelect from "./MutlipleSelect";
import dynamic from "next/dynamic";
//importing the Map dynamically with lazy loading to avoid window object Reference error
//we turnoff server side rendering to stop window referrence error
const DynamicMap = dynamic(()=>import("./Map"),{
  ssr: false,
  loading: ()=> <p className="text-center text-gray-500 font-bold text-xl">Loading Map...</p>
});
const InputForm = ({ inputFeilds }) => {
  return (
    <div class="flex flex-wrap bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xl gap-2 w-full">
      {inputFeilds.map((inputFeild, index) => {
        switch (inputFeild.elementType) {
          case "input":
            return <Input {...inputFeild} key={inputFeild.label} />;
          case "textarea":
            return <TextArea {...inputFeild} key={inputFeild.label} />;
          case "select":
            return (
              <Controller
                control={inputFeild.control}
                name={inputFeild.name}
                defaultValue={inputFeild.defaultValue || inputFeild?.options[0]}
                render={({ field }) => (
                  <Select
                    {...inputFeild}
                    {...field}
                    key={inputFeild.label}
                  />
                )}
              />
            );          
          case "multi-choice":
            return (
              <Controller
                control={inputFeild.control}
                name={inputFeild.name}
                defaultValue={inputFeild.defaultValue || inputFeild?.options[0]}
                render={({ field }) => (
                  <MultiChoice
                    {...inputFeild}
                    {...field}
                    key={inputFeild.label}
                  />
                )}
              />
            );
            case "multi-select":
              return (
                <Controller
                  control={inputFeild.control}
                  name={inputFeild.name}
                  defaultValue={[]}
                  render={({ field }) => (
                    <MutlipleSelect
                      {...inputFeild}
                      {...field}
                      key={inputFeild.label}
                    />
                  )}
                />
              );
            case "map-input":
              return (
                <Controller
                  control={inputFeild.control}
                  name={inputFeild.name}
                  defaultValue={{}}
                  render={({ field }) => (
                    <DynamicMap
                      {...inputFeild}
                      {...field}
                      key={inputFeild.label}
                    />
                  )}
                />
              );
          default:
            return (
              <Input
                type={inputFeild.type}
                label={inputFeild.label}
                key={inputFeild.label}
                {...inputFeild.rest}
              />
            );
        }
      })}
    </div>
  );
};

export default InputForm;
