import Image from "next/image"
import { Countries } from "@/app/_lib/countries";

function getCountryCodeByName(countryName) {
   const entries = Object.entries(Countries);
   const found = entries.find(([, name]) => name === countryName);
   return found ? found[0] : null;
}

function CountryCard({ data }) {
   return (
      <div className="flex flex-wrap gap-4">
         {data[0].countries.map((name, i) => {
            const code = getCountryCodeByName(name);

            return (
               <div
                  key={i}
                  className="relative w-16 h-10 flex-shrink-0"
               >
                  <Image
                     src={`https://flagcdn.com/256x192/${code}.png`}
                     alt={`National Flag Of ${name}`}
                     fill
                     className="object-cover"
                  />
               </div>
            );
         })}
      </div>
   );
}

export default CountryCard;