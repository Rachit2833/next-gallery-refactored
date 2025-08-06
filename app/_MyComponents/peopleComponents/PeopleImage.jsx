import { cookies } from "next/headers";
import ImageCard from "../ImageCard";
import PeopleWrapper from "./PeopleWrapper";
async function PeopleImage({ name,param }) {

   const cookieStore = await cookies()
   const data = await fetch(`https://next-gallery-by-rachit2833.vercel.app/image?frId=${name._id}&year=${param.year}&sort=${param.sort}&page=${param.page}`,{

      headers: {
         "Content-Type": "application/json",
         authorization: `Bearer ${cookieStore.get("session").value}`,
      },
   })
   const res =  await data.json()
   console.log(res,"fss");

   return (



        <PeopleWrapper name={name} res={res} />


   )
}

export default PeopleImage
