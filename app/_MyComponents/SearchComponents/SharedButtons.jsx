'use client';

import { useUser } from "@/app/_lib/context";
import IconButtons from "./IconButtons";
import { usePathname } from "next/navigation";

function SharedButtons({ albumComponent, params }) {
  const { selectedImages, user } = useUser();
  const pathname = usePathname();

  // ✅ check if on share route
  const isShareRoute = pathname.includes("services/share");

  // ✅ final logic
  const shouldShowLink = !isShareRoute && !albumComponent;

  return (
    <>
      {selectedImages.length > 0 && (
        <IconButtons
          link={shouldShowLink}
          params={params}
          save={true}
          album={shouldShowLink}
          leave={shouldShowLink}
          
          albumComponent={albumComponent}
        />
      )}
    </>
  );
}

export default SharedButtons;