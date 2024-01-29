import React from "react";

const SearchBar = () => {
  return (
    <div className=" mt-5 xl:w-96 ">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <input
        type="search"
        className="relative m-0 block flex-auto text-black border border-gray-800 p-5 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-sm font-normal leading-[1.6] placeholder-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder-text-neutral-200 dark:focus:border-primary"
        placeholder="What are you looking for?"
        aria-label="Search"
        aria-describedby="button-addon2"
    />


        {/* <!--Search icon--> */}
        <span
          className="input-group-text flex items-center whitespace-nowrap bg-black px-3 py-1.5 text-center text-base font-normal text-white"
          id="basic-addon2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
