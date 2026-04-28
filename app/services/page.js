import Wrapper from "@/app/_MyComponents/Wrapper";
import ImagesGrid from "@/app/_MyComponents/ImagesGrid";
import AlbumList from "@/app/_MyComponents/SearchComponents/AlbumList";
import { Suspense } from "react";




export default async function page({ searchParams }) {
  const params = await searchParams
  
  return (

    <Wrapper
      params={params}
      alc={<AlbumList />}
      card={<ImagesGrid searchParams={params} />}
    />

  );
}
