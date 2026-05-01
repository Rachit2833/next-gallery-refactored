import { cookies } from "next/headers"
import AlbumCard from "./AlbumCard"
import NoImagesDoodle from "../NoImagesDoodle"
import { PagePagination } from "../Pagination"

async function AlbumGrid({ searchParams,cookieStore }) {


   const {
      year = "all",
      sort = -1,
      page = 1,
      limit = 10,
   } = await  searchParams || {}

   // Build query string safely
   const query = new URLSearchParams({
      year,
      sort,
      page,
      limit,
   }).toString()

   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/album?${query}`,
      {
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${cookieStore.get("session")?.value}`,
         },
         cache: "no-store", 
      }
   )
   
   const data = await res.json()

   return (
      <>
         <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-2">
            {data?.albums?.length > 0 ? (
               data.albums.map((album) => (
                  <AlbumCard item={album} key={album._id} />
               ))
            ) : (
               <div className="col-span-full">
                  <NoImagesDoodle />
               </div>
            )}
         </div>

         <PagePagination totalPagesLeft={data.totalPagesLeft} />
      </>
   )
}

export default AlbumGrid
