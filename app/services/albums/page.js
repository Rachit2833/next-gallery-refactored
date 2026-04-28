
import { Suspense } from "react";
import AlbumGrid from "@/app/_MyComponents/AlbumsComponent/AlbumGrid";
import AlbumLoaders from "@/app/_MyComponents/Loaders/AlbumLoaders";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
export const metadata = {
  title: "Albums",
  description: "Browse, organize, and manage your photo albums to relive your cherished moments on NextGallery.",
};


async function page({ searchParams }) {
  const query = await searchParams
  const cookieStore = await cookies()
  let year = query.year
  let sort = query.sort
  return (
    <>


      <Card x-chunk="dashboard-06-chunk-0" className="w-full max-w-screen-2xl mx-auto ">
        <CardHeader>
          <CardTitle>Your Saved Album</CardTitle>
          <CardDescription>
            Manage All your Albums here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense key={JSON.stringify(searchParams)} fallback={<AlbumLoaders />}>
            <AlbumGrid cookieStore={cookieStore} searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>


    </>
  );
}

export default page
