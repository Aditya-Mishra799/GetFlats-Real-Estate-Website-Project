import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Select from "./Select";
import MultiChoice from "./MultiChoice";
import { Controller } from "react-hook-form";
import MutlipleSelect from "./MutlipleSelect";
import dynamic from "next/dynamic";
import ImageInput from "./ImageInput";
//importing the Map dynamically with lazy loading to avoid window object Reference error
//we turnoff server side rendering to stop window referrence error
const DynamicMap = dynamic(()=>import("./Map"),{
  ssr: false,
  loading: ()=> <p className="text-center text-gray-500 font-bold text-xl">Loading Map...</p>
});
const InputForm = ({ inputFeilds }) => {
  return (
    <div className="flex flex-wrap bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xl min-w-sm gap-2 w-full">
      {inputFeilds.map((inputFeild, index) => {
        switch (inputFeild.elementType) {
          case "input":
            return <Input {...inputFeild} key={inputFeild.name} />;
          case "textarea":
            return <TextArea {...inputFeild} key={inputFeild.name} />;
          case "select":
            return (
              <Controller
                control={inputFeild.control}
                name={inputFeild.name}
                key={inputFeild.name}
                defaultValue={inputFeild.defaultValue || inputFeild?.options[0]}
                render={({ field }) => (
                  <Select
                    {...inputFeild}
                    {...field}
                    key={inputFeild.name}
                  />
                )}
              />
            ); 
          case 'image-input':
            return    (
              <Controller
                control={inputFeild.control}
                name={inputFeild.name}
                key={inputFeild.name}
                defaultValue = {inputFeild?.defaultValue}
                render={({ field: { onChange, } }) => {
                  return (
                  <ImageInput
                    {...inputFeild}
                    onChange = {onChange}
                    ref ={null}
                    key={inputFeild.name}
                  />
                )}
              }
              />
            );        
          case "multi-choice":
            return (
              <Controller
                control={inputFeild.control}
                name={inputFeild.name}
                key={inputFeild.name}
                defaultValue={inputFeild.defaultValue || inputFeild?.options[0]}
                render={({ field }) => (
                  <MultiChoice
                    {...inputFeild}
                    {...field}
                    ref ={null}
                    key={inputFeild.name}
                  />
                )}
              />
            );
            case "multi-select":
              return (
                <Controller
                  control={inputFeild.control}
                  name={inputFeild.name}
                  key={inputFeild.name}
                  defaultValue={[]}
                  render={({ field }) => (
                    <MutlipleSelect
                      {...inputFeild}
                      {...field}
                      key={inputFeild.name}
                    />
                  )}
                />
              );
            case "map-input":
              return (
                <Controller
                  control={inputFeild.control}
                  name={inputFeild?.name}
                  key={inputFeild.name}
                  defaultValue = {inputFeild?.defaultValue}
                  render={({ field: { onChange, } }) => {
                    return (
                    <DynamicMap
                      {...inputFeild}
                      onChange = {onChange}
                      ref ={null}
                      key={inputFeild.name}
                    />
                  )}}
                />
              );
          default:
            return (
              <Input
                type={inputFeild.type}
                label={inputFeild.label}
                key={inputFeild.name}
                {...inputFeild.rest}
              />
            );
        }
      })}
    </div>
  );
};

export default InputForm;
