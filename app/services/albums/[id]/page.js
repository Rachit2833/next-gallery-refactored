import ImageCardGrid from "@/app/_MyComponents/AlbumsComponent/ImageCardGrid";
import ImageLoader from "@/app/_MyComponents/Loaders/ImageLoader";
import SideFilterLayout from "@/app/_MyComponents/SideFilterLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import { Suspense } from "react";
export const metadata = {
  title: "Albums",
  description: "Browse, organize, and manage your photo albums to relive your cherished moments on NextGallery.",
};
async function page({ params, searchParams }) {
  const { id } = await params
  const cookieStore = await cookies()
  let paramval = await searchParams
  let year = paramval.year || "All"
  let sort = paramval.sort || -1
  let page = paramval.page || 1
  return (
    <>
      <Card className="w-full max-w-screen-2xl mx-auto overflow-hidden" x-chunk="dashboard-06-chunk-0 ">
        <CardHeader>
          <CardTitle>Your Saved Images </CardTitle>
        </CardHeader>
        <CardContent >
          <Suspense key={[year, sort,page]} fallback={<ImageLoader />}>
            <ImageCardGrid cookieStore={cookieStore} page={page} id={id} year={year} sort={sort} />
          </Suspense>
        </CardContent>
      </Card>
    </>
  );
}

export default page
