import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/taskSlice";

const Search = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.tasks.searchQuery);

  return (
    <div className="flex justify-center mb-4">

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search your task..."
        className="border border-slate-300 rounded-full p-5 w-80 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all placeholder:text-gray-400"
      />

    </div>
  );
};

export default Search;
