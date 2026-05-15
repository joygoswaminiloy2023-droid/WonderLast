'use client'
import {
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  TextArea,
  Button,
} from "@heroui/react";
import React from "react";
import { HiCheck, HiChevronDown } from "react-icons/hi";

const page =() => {
  const onsubmit = async (e) => {
 e.preventDefault();
 const data=new FormData(e.currentTarget)

 const des_data=Object.fromEntries(data.entries())
console.log(des_data);

const res= await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`,{
method: 'POST',
headers:{
'content-type': 'application/json'
},
body: JSON.stringify(des_data)

})
  };

  const inputClass =
    "rounded-xl border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition w-full px-3 py-2";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 mt-20">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-3xl border border-gray-100">

        {/* Header */}
        <div className="px-10 py-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add Travel Package
          </h2>
          <p className="text-sm text-gray-500">
            Fill in the details below to create a new destination
          </p>
        </div>

        <form onSubmit={onsubmit} className="p-10 space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Destination Name */}
            <div className="md:col-span-2 space-y-2">
              <TextField name="destinationName" isRequired>
                <Label className="text-sm font-medium text-gray-700">
                  Destination Name
                </Label>
                <Input
                  placeholder="Bali Paradise"
                  className={inputClass}
                />
                <FieldError className="text-red-500 text-sm" />
              </TextField>
            </div>

            {/* Country */}
            <div className="space-y-2">
              <TextField name="country" isRequired>
                <Label className="text-sm font-medium text-gray-700">
                  Country
                </Label>
                <Input
                  placeholder="Indonesia"
                  className={inputClass}
                />
                <FieldError className="text-red-500 text-sm" />
              </TextField>
            </div>

            {/* Category (FIXED) */}

<div className="space-y-2 relative">
  <Label className="text-sm font-medium text-gray-700">
    Category
  </Label>

  <Select name="category" className="w-full">
    <Select.Trigger
      className="w-full rounded-xl border border-gray-300 px-3 py-2.5 
      flex justify-between items-center bg-white text-gray-700
      focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition outline-none"
    >
      <Select.Value placeholder="Select category" />
      <Select.Indicator>
        <HiChevronDown className="h-5 w-5 text-gray-400" />
      </Select.Indicator>
    </Select.Trigger>

    {/* The Popover container */}
    <Select.Popover className="z-[9999] w-xl mt-1">
      <ListBox className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden focus:outline-none">
        {[
          "Beach",
          "Mountain",
          "City",
          "Adventure",
          "Cultural",
          "Luxury",
        ].map((item) => (
          <ListBox.Item 
            key={item} 
            id={item} 
            textValue={item}
            className="px-4 py-3 cursor-pointer flex justify-between items-center text-sm text-gray-700
            hover:bg-cyan-50 hover:text-cyan-700 focus:bg-cyan-50 focus:outline-none transition-colors"
          >
            <span className="font-medium">{item}</span>
            <ListBox.ItemIndicator>
               <HiCheck className="h-5 w-5 text-cyan-600" />
            </ListBox.ItemIndicator>
          </ListBox.Item>
        ))}
      </ListBox>
    </Select.Popover>
  </Select>

  <FieldError className="text-red-500 text-sm" />
</div>

            {/* Price */}
            <div className="space-y-2">
              <TextField name="price" isRequired>
                <Label className="text-sm font-medium text-gray-700">
                  Price (USD)
                </Label>
                <Input
                  type="number"
                  placeholder="1299"
                  className={inputClass}
                />
                <FieldError className="text-red-500 text-sm" />
              </TextField>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <TextField name="duration" isRequired>
                <Label className="text-sm font-medium text-gray-700">
                  Duration
                </Label>
                <Input
                  placeholder="7 Days / 6 Nights"
                  className={inputClass}
                />
                <FieldError className="text-red-500 text-sm" />
              </TextField>
            </div>

            {/* Departure Date */}
            <div className="md:col-span-2 space-y-2">
              <TextField name="departureDate" isRequired>
                <Label className="text-sm font-medium text-gray-700">
                  Departure Date
                </Label>
                <Input type="date" className={inputClass} />
                <FieldError className="text-red-500 text-sm" />
              </TextField>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2 space-y-2">
              <TextField name="imageUrl" isRequired>
                <Label className="text-sm font-medium text-gray-700">
                  Image URL
                </Label>
                <Input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className={inputClass}
                />
                <FieldError className="text-red-500 text-sm" />
              </TextField>
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-2">
              <TextField name="description" isRequired>
                <Label className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <TextArea
                  placeholder="Describe the travel experience..."
                  className={`${inputClass} min-h-[120px]`}
                />
                <FieldError className="text-red-500 text-sm" />
              </TextField>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 rounded-xl transition"
          >
            Add Travel Package
          </Button>
        </form>
      </div>
    </div>
  );
};

export default page;