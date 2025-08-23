import { UserProvider } from "../_lib/context";
import { cookies } from "next/headers";
import BodyWrapper from "../_MyComponents/BodyWrapper";
export const metadata = {
  title: {
    template: "%s / NextGallery",
    default: " Welcome / NextGallery",
  },
  description: "A modern photo gallery application for organizing and viewing your memories.",
  // keywords: ["photo gallery", "image management", "albums", "memories", "Next.js gallery"],
  // authors: [{ name: "Rachit2833", url: "https://github.com/Rachit2833" }],
  // creator: "Rachit Rawat",
  // themeColor: "#ffffff",
};
export default async function RootLayout({ children, params }) {
  const cookieStore = await cookies();
  const res = await fetch("https://next-gallery-by-rachit2833.vercel.app/user/verify-user", {
    method: "POST",
    headers: {
      authorization: `Bearer ${cookieStore.get("session")?.value}`,
    },
    credentials: "include",
    cache: "no-store",
  });
  const user = await res.json();


  return (


      <BodyWrapper params={params} user={user?.user}>
        {children}
      </BodyWrapper>

  );
}
