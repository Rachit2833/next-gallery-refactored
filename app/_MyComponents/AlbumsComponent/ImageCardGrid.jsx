import PasteCards from "./PasteCards";
import { cookies } from "next/headers";
import NoImagesDoodle from "../NoImagesDoodle";
import { PagePagination } from "../Pagination";


async function ImageCardGrid({ cookieStore,id, year, sort = "-_id",page }) {


  const yearParam = year === "All" ? "all" : year
  const sortParam = sort === "_id" ? "_id" : "-_id" 

  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/album/images/${id}?year=${yearParam}&sort=${sortParam}&page=${page}&limit=${21}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieStore.get("session").value}`,
      },
      cache: "no-store",
    }
  )

  res = await res.json()


  return (
    <>
      {res?.images?.length !== 0 ? (
        <PasteCards res={res?.images} />
      ) : (
        <NoImagesDoodle />
      )}


      {res?.images?.length !== 0 && (
        <PagePagination totalPagesLeft={res?.pagination?.totalPagesLeft} />
      )}
    </>
  )
}

export default ImageCardGrid
