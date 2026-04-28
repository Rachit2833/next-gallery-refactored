"use client";

import { fallbackAlbumCovers } from "@/app/_lib/avatar";
import Image from "next/image";
import React, { useState, useEffect } from "react";


const CoverPicker = ({ selected, setSelected }) => {




  const selectedImage = (() => {
    if (!selected) return "/avatar.jpg";
    const index = Number(selected);
    if (!isNaN(index) && fallbackAlbumCovers[index]) return fallbackAlbumCovers[index];
    return selected; // treat as custom image URL
  })();

  const isCustomImage = selected && isNaN(Number(selected));

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Selected Avatar Preview */}
   

      {/* Avatar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {fallbackAlbumCovers.map((url, i) => {
          const isSelected = selected === String(i);
          return (
            <div
              key={i}
              onClick={() => setSelected(String(i))}
              className={`w-14 h-14 rounded-full overflow-hidden shadow-md cursor-pointer 
                ${isSelected ? "border-2 border-blue-500 p-[2px]" : "border border-transparent"}`}
            >
              <Image
                src={url}
                width={56}
                height={56}
                alt={`Avatar ${i}`}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          );
        })}

        {/* Custom image preview as last option (if it's a URL) */}
   

      </div>
    </div>
  );
}

export default CoverPicker;
