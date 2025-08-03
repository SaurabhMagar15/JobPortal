import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery} from ".././redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["pune", "mumbai", "delhi", "bangalore", "hyderabad", "chennai"],
  },
  {
    filterType: "Industry", 
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist"],
  },
  {
    filterType: "Salary (LPA)",
    array: ["0-3", "3-5", "5-8", "8-12", "12-20", "20+"],
  },
  {
    filterType: "Job Type",
    array: ["Full Time", "Part Time", "Contract", "Remote"],
  },
  {
    filterType: "Experience (Years)",
    array: ["0-1", "1-3", "3-5", "5+"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch=useDispatch();
  
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue))
  },[selectedValue])

  return (
    <div className="w-full bg-white rounded-md shadow-sm h-[88vh] flex flex-col">
      <div className="p-4 border-b">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((data, index) => (
            <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
              <h2 className="font-semibold text-sm mb-2 text-gray-700 sticky top-0 bg-white py-1">
                {data.filterType}
              </h2>
              <div className="grid grid-cols-1 gap-1">
                {data.array.map((item, itemIndex) => {
                  const itemId = `${data.filterType}-${itemIndex}`;
                  return (
                    <div key={itemIndex} className="flex items-center space-x-2 py-1">
                      <RadioGroupItem value={item} id={itemId} className="w-3 h-3" />
                      <Label htmlFor={itemId} className="text-xs cursor-pointer hover:text-blue-600 leading-tight">
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
