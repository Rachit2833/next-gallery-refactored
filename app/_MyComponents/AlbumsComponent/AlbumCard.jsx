"use client"

import {
  deleteAlbumAction,
  generateShareLinkAlbum,
  saveSharedAlbum,
} from "@/app/_lib/actions"
import { useUser } from "@/app/_lib/context"
import fallbackImage from "@/public/Images/dune.jpg"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DialogTrigger } from "@/components/ui/dialog"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { ChevronRight, Share2, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Deletebutton } from "../ImageCard"
import LInkDialog from "../SearchComponents/LInkDialog"
import { fallbackAlbumCovers } from "@/app/_lib/avatar"
import LoadingButton from "../LoadingButton"

const overlayButton =
  "bg-black/40 text-white backdrop-blur-sm border border-white/30 \
   hover:bg-white hover:text-black transition-colors h-10"

const iconClass = "h-5 w-5"

function AlbumCard({ item, shared }) {
  const [isOpen, setIsOpen] = useState(false)

  const {
    personalDetails,
    setIsLoadingLink,
    setUrl,
    user,
    getAltText,
  } = useUser()

  const router = useRouter()
  const { toast } = useToast()

  const isNumeric = (val) => !isNaN(val) && Number.isInteger(Number(val))

  async function submitDeleteForm(formData) {
    await deleteAlbumAction(formData)
    setIsOpen(false)
  }

  return (
    <article>
      <Card className="relative overflow-hidden min-h-[20rem] sm:min-h-[24rem] lg:min-h-[30rem] rounded-xl">
        {/* IMAGE */}
        <figure className="absolute inset-0">
          <Image
            src={
              isNumeric(item.ImageUrl)
                ? fallbackAlbumCovers[Number(item.ImageUrl)]
                : item.ImageUrl || fallbackImage
            }
            alt={getAltText(fallbackImage, personalDetails)}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={item.blurredImage}
          />

          {/* SCRIM */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </figure>

        {/* TEXT */}
        <div className="absolute z-10 top-6 sm:top-12 left-4 sm:left-8">
          <div className="max-w-[22rem] rounded-lg bg-background/60 backdrop-blur-sm border border-white/20 px-4 py-3">
            <h2 className="text-foreground text-[1.5rem] sm:text-[2rem] font-semibold">
              {item.Name}
            </h2>
            {item.Description && (
              <p className="mt-1 text-muted-foreground text-[0.95rem] sm:text-[1.05rem]">
                {item.Description}
              </p>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="absolute z-20 bottom-6 sm:bottom-12 right-4 sm:right-8 flex items-center gap-3">
          {!shared ? (
            <>
              {/* DELETE */}
              <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    aria-label="Delete album"
                    size="icon"
                    className={`${overlayButton} `}
                  >
                    <Trash2 className={iconClass} />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your album.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter className="flex items-center justify-end gap-2">

                    <AlertDialogCancel className="border rounded-md bg-muted text-muted-foreground">
                      Cancel
                    </AlertDialogCancel>

                    <form action={deleteAlbumAction}>
                      <input type="hidden" name="albumId" value={item._id} />

                      <Deletebutton />
                    </form>

                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* SHARE */}
              <LInkDialog>
                <DialogTrigger asChild>
                  <Button
                    aria-label="Share album"
                    size="icon"
                    className={`${overlayButton} w-10`}
                    onClick={async () => {
                      setIsLoadingLink(true)
                      const res = await generateShareLinkAlbum(
                        item._id,
                        user._id
                      )
                      setUrl(res)
                      setIsLoadingLink(false)
                    }}
                  >
                    <Share2 className={iconClass} />
                  </Button>
                </DialogTrigger>
              </LInkDialog>
            </>
          ) : (
            <form
              action={async () => {
                try {
                  delete item.__v
                  await saveSharedAlbum(item)

                  toast({
                    title: "Album Saved!",
                    description:
                      "Your album has been saved successfully.",
                    action: (
                      <ToastAction altText="Done">
                        Done
                      </ToastAction>
                    ),
                  })

                  router.push("/services/albums")
                } catch (error) {
                  toast({
                    title: "Something went wrong",
                    description:
                      error.message || "Unexpected error",
                    action: (
                      <ToastAction altText="Retry">
                        Retry
                      </ToastAction>
                    ),
                  })
                }
              }}
            >
              <Button className={`${overlayButton} px-5`}>
                Save
              </Button>
            </form>
          )}

          {/* VISIT */}
          {shared && (<Button
            aria-label="Visit album"
            onClick={() => router.push(`/services/albums/${item._id}`)}
            className={`${overlayButton} px-5 flex items-center gap-2`}
          >
            Visit
            <ChevronRight className={iconClass} />
          </Button>)}
        </div>
      </Card>
    </article>
  )
}

export default AlbumCard
