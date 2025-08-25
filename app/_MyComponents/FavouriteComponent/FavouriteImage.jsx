import { cookies } from "next/headers";
import ImageCard from "../ImageCard";
import { CloudCog } from "lucide-react";
import FavouriteGridWrapper from "../FavouriteGridWrapper";
async function FavouriteImage({param}) {
   const cookieStore = await cookies()
   const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image?favourite=true&year=${param.year}`,{
      headers: {
         "Content-Type": "application/json",
         authorization: `Bearer ${cookieStore.get("session").value}`,
      },
   })
   const res =  await data.json()

   return (
      
            <FavouriteGridWrapper res={res} />
   )
}

export default FavouriteImage
