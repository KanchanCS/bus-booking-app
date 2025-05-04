import React from "react";
import { FaWifi } from "react-icons/fa";
import { GiWaterBottle } from "react-icons/gi";

const TopSearchCard = ({ routeForm, routeTo, timeDuration, price }) => {
    return (
        <div className="w-full rounded-xl p-5 border border-neutral-300 space-y-5 shadow-sm bg-white mt-10">
      <div className="space-y-4 w-full">

        {/* Route Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-normal">
            <p>From</p>
            <p>To</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* From */}
            <h1 className="text-sm sm:text-base md:text-lg  text-neutral-600 font-semibold">{routeForm}</h1>

            {/* Time Duration Line */}
            <div className="flex-1 border-dashed border border-neutral-400 relative w-full sm:mx-2 h-10 sm:h-auto">
              <p className="absolute inset-0 flex items-center justify-center px-3 h-full text-sm text-neutral-500 font-normal bg-neutral-50 rounded-full border border-dashed border-neutral-400">
                {timeDuration}
              </p>
            </div>

            {/* To */}
            <h1 className="text-sm sm:text-base md:text-lg text-neutral-600 font-semibold">{routeTo}</h1>
          </div>
        </div>

        {/* Facilities */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-x-1">
            <FaWifi className="w-4 h-4 text-neutral-500" />
            <p className="text-xs text-neutral-600">Internet</p>
          </div>
          <div className="flex items-center gap-x-1">
            <GiWaterBottle className="w-4 h-4 text-neutral-500" />
            <p className="text-xs text-neutral-600">Water Bottle</p>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-1xl text-neutral-600 font-semibold">Rs. {price}</h1>
          <button className="w-full sm:w-auto px-5 h-12 bg-primary hover:bg-red-600 border-2 border-primary hover:border-red-600 rounded-xl text-base font-medium text-white flex items-center gap-x-2 justify-center transition duration-300">
            Reserve Seat
          </button>
                </div>
                
      </div>
        </div>
        
    
  )
}
export default TopSearchCard;
