import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cookies } from "next/headers";
import { avatarImages } from "@/app/_lib/avatar";
import { AvatarDialog } from "@/app/_MyComponents/AvatarDialog";
import { EditableField } from "@/app/_MyComponents/EditableField";
import PrivacyControlSection from "@/app/_MyComponents/PrivacyControlSection";

const Page = async () => {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/verify-user`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${cookieStore.get("session")?.value}`,
    },
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();
  const user = data.user;
  let image = user?.profilePicture;

  if (!isNaN(Number(image)) && avatarImages[Number(image)]) {
    image = avatarImages[Number(image)];
  }

  return (

    
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 flex justify-center">
        <div className="w-full max-w-3xl flex flex-col gap-8 mt-6">

          {/* 👤 Avatar Section */}
          <div id="change-avatar" className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div className="rounded-full p-[3px] bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 shadow-md group-hover:scale-105 transition-transform">
                <div className="rounded-full bg-white p-1">
                  <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
                    <AvatarImage src={image} alt={user?.name} />
                    <AvatarFallback className="text-2xl sm:text-3xl">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Edit icon */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute bottom-2 right-2">
                      <AvatarDialog image={image} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">Edit Avatar</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Your Profile
              </h2>
              <p className="text-muted-foreground">
                Update your account info
              </p>
            </div>
          </div>

          <Separator />

          {/* 📋 Account Info */}
          <h2 id="account-info" className="text-xl sm:text-2xl font-semibold">
            Account Info
          </h2>
          <div className="flex flex-col gap-6">
            <EditableField
              label="Name"
              value={user?.name || ""}
              inputClassName="w-full max-w-md shadow-sm"
            />
          </div>

          {/* 🏆 Achievements */}
          <h2 className="text-xl sm:text-2xl font-semibold mt-4">
            Achievements
          </h2>
          <Card className="w-full max-w-3xl border-none shadow-none bg-gradient-to-tr from-purple-700 via-indigo-600 to-blue-500 p-[2px] rounded-xl">
            <div className="rounded-xl bg-white dark:bg-zinc-900">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                  Unlock Achievements
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Trophies, badges, and level-ups are on their way!
                </p>
              </CardHeader>

              <CardContent className="flex flex-col items-center gap-6">
                <div className="w-full aspect-video rounded-xl overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-800 shadow-lg transition hover:scale-[1.01]">
                  <video
                    src="/videos/coming-soon.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-medium shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m0-4h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Coming Soon
                </div>
              </CardContent>
            </div>
          </Card>

          {/* 🔒 Privacy Settings */}
          <div id="privacy" className="mt-4">
            <PrivacyControlSection />
          </div>
        </div>
      </div>

  );
};

export default Page;
