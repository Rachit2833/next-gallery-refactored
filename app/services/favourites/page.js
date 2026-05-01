import FavouriteImage from "@/app/_MyComponents/FavouriteComponent/FavouriteImage";
import Wrapper from "@/app/_MyComponents/Wrapper";
import { cookies } from "next/headers";
export const metadata = {
  title: "Favourites",
  description: "Your favourite images collected in one place. Relive your most loved memories on NextGallery.",
};

async function page({ searchParams }) {
  const query = await searchParams
  const cookieStore = await cookies()
  return (
    <Wrapper
      params={query}
      card={<FavouriteImage cookieStore={cookieStore} param={query} />}
    />
  );
}

export default page
