import FavouriteImage from "@/app/_MyComponents/FavouriteComponent/FavouriteImage";
import Wrapper from "@/app/_MyComponents/Wrapper";
export const metadata = {
  title: "Favourites",
  description: "Your favourite images collected in one place. Relive your most loved memories on NextGallery.",
};

async function page({ searchParams }) {
  const query = await searchParams
  return (
    <Wrapper
      params={query}
      card={<FavouriteImage param={query} />}
    />
  );
}

export default page
