import { Suspense } from "react";
import ShareImages from "@/app/_MyComponents/SearchComponents/ShareImages";
import ShareWrapper from "@/app/_MyComponents/SearchComponents/ShareWrapper";
import ImageLoader from "@/app/_MyComponents/Loaders/ImageLoader";

export const metadata = {
  title: "Share",
  description: "Share your favorite memories and albums with friends and family through secure links on NextGallery.",
};
export  default async function page({ searchParams }) {
  const params = await searchParams;

  return (
    <>
      <ShareWrapper params={params} />
      <Suspense fallback={<ImageLoader />}>
        <ShareImages params={params} />
      </Suspense>
    </>
  );
}
