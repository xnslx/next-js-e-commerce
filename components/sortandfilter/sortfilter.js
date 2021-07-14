import React from "react";
import FilterIcon from "../ui/filter";

const SortFilter = () => {
  return (
    <div className="flex flex-row justify-end ml-4 mt-2 w-11/12 -mb-4 lg:mr-12">
      <span className="font-semibold">SORT & FILTER</span>
      <FilterIcon />
    </div>
  );
};

export default SortFilter;
