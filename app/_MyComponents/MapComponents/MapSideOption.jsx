import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import CountryCard from "./CountryCard";
import { Countries } from "@/app/_lib/countries";
import Paris from "./paris.jpg";
import { cookies } from "next/headers";

function getCountryCodeByName(countryName) {
  const entries = Object.entries(Countries);
  const found = entries.find(([, name]) => name === countryName);
  return found ? found[0] : null;
}

async function MapSideOption({ cookieStore,year, yearRange }) {


  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/stats/countries?year=${year}&yearRange=${yearRange}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookieStore.get("session")?.value}`,
      },
    }
  );

  const resData = await data.json();

  const allCountries = resData?.AllCountries?.[0]?.countries || [];
  const favouriteCountryData = resData?.favouriteCountry?.[0];
  const favouriteLocationData = resData?.favouriteLocation?.[0];

  const favouriteCountry = favouriteCountryData?._id;
  const favouriteLocation = favouriteLocationData?._id?.locationName;
  const favCode = getCountryCodeByName(favouriteCountry);


  return (
    <div className="my-4 grid gap-4 h-[70vh] max-h-[80vh] overflow-y-auto px-2 sm:px-4">

      {/* Countries Visited */}
      <Card>
        <CardHeader>
          <CardTitle>
            {allCountries.length} Countries Visited in Previous{" "}
            {!yearRange
              ? "all years"
              : yearRange === "all"
              ? "years"
              : yearRange === 1
              ? `${year} year`
              : `${year} years`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CountryCard data={resData?.AllCountries} />
        </CardContent>
      </Card>

      {/* Favourite Country */}
      <Card>
        <CardHeader>
          <CardTitle>
            {favouriteCountryData?.numImages || 0} Photos Clicked In Previous 1 year
          </CardTitle>
          <CardDescription>
            {favouriteCountry ? (
              <>
                with <strong>{favouriteCountry}</strong> being your favourite country
              </>
            ) : (
              "No favourite country yet"
            )}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {favouriteCountry && favCode ? (
            <div className="flex justify-center items-center h-32 w-full relative">
              <Image
                src={`https://flagcdn.com/h240/${favCode}.png`}
                alt={`${favouriteCountry} Flag`}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-sm text-muted-foreground border rounded-md">
              No data available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Favourite Location */}
      <Card>
        <CardHeader>
          <CardTitle>
            {favouriteLocation || "No favourite location"}
          </CardTitle>
          <CardDescription>
            {favouriteLocation
              ? "was your favourite destination"
              : "Start exploring to see your favourite destination"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {favouriteLocation ? (
            <div className="relative w-full h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden">
              <Image
                src={favouriteLocationData.image}
                fill
                alt={favouriteLocation}
                className="object-cover rounded-md"
              />
              <h1 className="absolute bottom-2 left-4 text-white text-lg sm:text-xl font-bold drop-shadow-md">
                {favouriteLocation?.split(",")[0]}
              </h1>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-sm text-muted-foreground border rounded-md">
              No location data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default MapSideOption;