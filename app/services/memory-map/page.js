import { cookies } from "next/headers";
import MapSideImages from "@/app/_MyComponents/MapComponents/MapSideImages";
import MapSideOption from "@/app/_MyComponents/MapComponents/MapSideOption";
import MapWrapper from "@/app/_MyComponents/MapComponents/MapWrapper";
import { Suspense } from "react";

export const metadata = {
  title: "Memory Map",
  description: "Explore your memories on an interactive map, organized by location and travel history.",
};

export default async function page({searchParams}) {
  const cookieStore = await cookies();
  let searchURLParams = await searchParams;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/image/location?yearRange=${searchURLParams.yearRange}`,
    {
  
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookieStore.get("session").value}`,
      },
    }
  );
  const Location = await res.json();
  console.log(Location);
  return (
    <Suspense fallback={<>Loading..</>}>
      <MapWrapper
        param={searchURLParams}
        Location={Location}
        sideField={<MapSideOption cookieStore={cookieStore} year={searchURLParams.yearRange} />}
        imageCard={<MapSideImages cookieStore={cookieStore} search={searchURLParams.cod} />}
      />
    </Suspense>
  );
}
