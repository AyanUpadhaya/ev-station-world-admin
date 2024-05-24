import React from "react";
import { Link } from "react-router-dom";
import AddSvg from "../../Svg/AddSvg";

function SearchBar({ title, value, onChange, path, isNotAddable, children,isWallpaperSearchBar,modalId }) {
  return (
    <div className="bg-primary px-3 py-4 sm:p-4 flex items-center justify-between rounded-t-2xl">
      <div className="flex items-center gap-8">
        <h4 className=" text-white text-lg sm:text-xl font-bold">{title}</h4>
        {children}
      </div>
      <div
        className={`flex items-center justify-end ${
          isNotAddable ? "" : "gap-2 md:gap-6"
        } `}
      >
        <div className="flex gap-6 items-center">
          <div className="relative">
            <label
              className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2"
              htmlFor="search"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                  fill="#707D9B"
                />
                <path
                  d="M22.0004 22.7495C21.8104 22.7495 21.6204 22.6795 21.4704 22.5295L19.4704 20.5295C19.1804 20.2395 19.1804 19.7595 19.4704 19.4695C19.7604 19.1795 20.2404 19.1795 20.5304 19.4695L22.5304 21.4695C22.8204 21.7595 22.8204 22.2395 22.5304 22.5295C22.3804 22.6795 22.1904 22.7495 22.0004 22.7495Z"
                  fill="#707D9B"
                />
              </svg>
            </label>
            <input
              id="search"
              value={value}
              onChange={onChange}
              className="pl-10 sm:pl-11 p-3 h-[46px] xs:w-[150px] sm:w-[200px] lg:w-[512px] text-xs sm:text-sm md:text-base text-blackLow rounded-md border-none focus:outline-none bg-white"
              type="text"
              name="searchInput"
              placeholder="Search"
            />
          </div>
          <div>
            {!isNotAddable && (
              <Link
                to={path}
                className="cursor-pointer"
              >
                <AddSvg/>
              </Link>
            )}
            {
              isWallpaperSearchBar && (
                <label className="cursor-pointer"
                htmlFor={modalId}
                >
                  <AddSvg/>
                </label>
                )
            }
            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
