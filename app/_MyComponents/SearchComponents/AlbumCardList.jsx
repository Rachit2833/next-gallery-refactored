"use client";

import { addImagesToAlbum } from "@/app/_lib/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { SubmitButton } from "./LeaveDialog";
import { useUser } from "@/app/_lib/context";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { fallbackAlbumCovers } from "@/app/_lib/avatar";

function AlbumCardList({ album }) {
   const { selectedImages, setSelectedImages } = useUser();
   const { toast } = useToast();

   // ✅ SAFE IMAGE SOURCE (theme-independent)
   const albumCover =
      !isNaN(album.ImageUrl) && Number.isInteger(Number(album.ImageUrl))
         ? fallbackAlbumCovers[Number(album.ImageUrl)]
         : typeof album.ImageUrl === "string" &&
            (album.ImageUrl.startsWith("/") ||
               album.ImageUrl.startsWith("http"))
            ? album.ImageUrl
            : "https://plus.unsplash.com/premium_photo-1666739388993-67fec77e2e4d?w=900&auto=format&fit=crop&q=60";


   return (
      <div
         className="
        grid grid-cols-[auto_1fr] gap-4 p-4
        rounded-lg
        border border-border
        bg-card text-card-foreground
        shadow-md
      "
      >
         {/* Album Cover */}
         <Image
            alt="Album Cover"
            width={128}
            height={160}
            src={albumCover}
            className="h-40 w-32 rounded-md object-cover ring-1 ring-border"
         />

         {/* Album Details */}
         <div className="flex h-full flex-col">
            <h1 className="text-lg font-semibold text-foreground">
               {album.Name}
            </h1>

            <p className="text-sm leading-relaxed text-muted-foreground">
               {album.Description}
            </p>

            {/* Bottom Section */}
            <div className="mt-auto flex items-center justify-between">
               {/* Avatars */}
               <div className="flex">
                  {Array.from({ length: 3 }).map((_, index) => (
                     <Avatar
                        key={index}
                        className="
                  h-8 w-8 -ml-2
                  ring-2 ring-background
                  transition-all duration-300
                "
                     >
                        <AvatarImage
                           src="https://github.com/shadcn.png"
                           alt="User avatar"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                     </Avatar>
                  ))}
               </div>

               {/* Action */}
               <form
                  action={async () => {
                     try {
                        const res = await addImagesToAlbum(
                           album._id,
                           selectedImages
                        );

                        const description = new Date().toLocaleString("en-US", {
                           weekday: "long",
                           year: "numeric",
                           month: "long",
                           day: "numeric",
                           hour: "numeric",
                           minute: "numeric",
                           hour12: true,
                        });

                        if (res?.addedImages === 0) {
                           toast({
                              title: "Duplicate Images",
                              description:
                                 "All images already exist in this album",
                              variant: "destructive",
                           });
                        } else if (res?.duplicateImages.length === 0) {
                           toast({
                              title: "All Images Saved To Album",
                              description,
                              action: (
                                 <ToastAction altText="Undo">
                                    Undo
                                 </ToastAction>
                              ),
                           });
                        } else {
                           toast({
                              title: `${res.addedImages.length} Images Saved To Album`,
                              description: `${res.duplicateImages.length} images were duplicates`,
                              action: (
                                 <ToastAction altText="Undo">
                                    Undo
                                 </ToastAction>
                              ),
                           });
                        }

                        setSelectedImages([]);
                     } catch (error) {
                        console.error("Failed to add images:", error);
                        toast({
                           title: "Error",
                           description:
                              "Failed to save images. Please try again.",
                           variant: "destructive",
                        });
                     }
                  }}
               >
                  <SubmitButton buttonText="Add" />
               </form>
            </div>
         </div>
      </div>
   );
}

export default AlbumCardList;
