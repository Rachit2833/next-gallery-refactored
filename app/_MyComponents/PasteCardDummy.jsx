"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { getLocationInfo } from "../_lib/actions";

function getSeason() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  let season;
  if (month === 11 || month <= 1) {
    season = "Winter";
  } else if (month >= 2 && month <= 4) {
    season = "Spring";
  } else if (month >= 5 && month <= 7) {
    season = "Summer";
  } else {
    season = "Fall";
  }
  return `${season} ${year}`;
}

function PasteCardDummy({ index, setDrawerOpen, fileInput = true, urlBlob, onRemove, onRemoveImage }) {
  const [location, setLocation] = useState("Your Location");
  const descriptionPlaceholder = getSeason();
  const abc =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVR4nAEnANj/AAwNOwENPwEAMQQDNwD+///L2eTO2ub+//8A/v395ejt5enu/v39Q/QXhr/juNAAAAAASUVORK5CYII=";

  return (
    <div
      className="transition-colors duration-100 ease-in-out mx-auto relative rounded-lg p-4 w-full max-w-xs lg:max-w-sm shadow-soft bg-card select-none"
    >
      {/* Image Container */}
      <div
        className="relative w-full h-[9rem] sm:h-[12rem] lg:h-[15rem] rounded-t-lg cursor-pointer overflow-hidden group"
      >
        {/* Blur Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${abc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px)",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent" />

        {/* Actual Image */}
        <Image
          src={urlBlob}
          alt="Placeholder"
          fill
          objectFit="cover"
          className="rounded-t-lg z-20"
          quality={10}
          loading="lazy"
          placeholder="blur"
          blurDataURL={abc}
        />

        {/* Remove Button on Hover */}
        <button
          type="button"
          onClick={() => onRemoveImage(index)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white z-30"
          aria-label="Remove"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Description Section */}
      <div className="overflow-y-auto max-h-24 mt-2 select-none">
        <p className="text-muted-foreground text-sm truncate">
          {location}
        </p>

        <Input
          name="Description"
          readOnly
          value={descriptionPlaceholder}
          className="heading cursor-pointer h-8 !text-[1.25rem] focus:outline-none focus:ring-0 focus:border-transparent"
        />

        <div className="text-xs text-muted-foreground mt-4 sm:block hidden">
          By <span className="font-semibold hover:cursor-pointer">Author Name</span> 4 days ago
        </div>
      </div>
    </div>
  );
}

export default PasteCardDummy;
