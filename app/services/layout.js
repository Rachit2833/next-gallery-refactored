import { UserProvider } from "../_lib/context";
import { cookies } from "next/headers";
import BodyWrapper from "../_MyComponents/BodyWrapper";
import { verifyUserSession } from "../_lib/user.auth";
export const metadata = {
  title: {
    template: "%s / NextGallery",
    default: " Welcome / NextGallery",
  },
  description: "A modern photo gallery application for organizing and viewing your memories.",
};
export default async function RootLayout({ children, params }) {
  const cookieStore = await cookies()
  const user =await verifyUserSession(cookieStore)
  return (

    <UserProvider user={user}>
      <BodyWrapper params={params} >
        {children}
      </BodyWrapper>
    </UserProvider>

  );
}
