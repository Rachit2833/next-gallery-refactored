"use client"

import { useUser } from "@/app/_lib/context"
import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Copy } from "lucide-react"
import { useState } from "react"

function LinkDialog({ children }) {
   const [copied, setCopied] = useState(false)

   const {
      isLoadingLink: isLoading,
      url,
   } = useUser()

   const handleCopy = async () => {
      if (!url) return
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
   }

   return (
      <Dialog>
         {children}

         <DialogContent>
            <DialogTitle>Link Generated</DialogTitle>
            <DialogDescription>
               This link is valid for only 6 hours
            </DialogDescription>

            {isLoading ? (
               <Skeleton className="mt-4 space-y-3">
                  <Skeleton className="h-10 w-full rounded-md" />
                  <Skeleton className="flex justify-end" />
               </Skeleton>
            ) : (
               <>
                  {/* URL FIELD */}
                  <div className="flex items-center gap-2 mt-4">
                     <Input
                        type="text"
                        value={url}
                        readOnly
                        className="
                  h-10
                  flex-1
                  overflow-x-auto
                  whitespace-nowrap
                  font-mono
                  text-sm
                  border rounded-md bg-muted text-muted-foreground outline-none
                "
                     />

                     <Button
                        onClick={handleCopy}
                        size="icon"
                        className="h-10 w-10 shrink-0"
                        aria-label="Copy link"
                     >
                        <Copy className="h-5 w-5" />
                     </Button>
                  </div>

                  {/* COPIED FEEDBACK */}
                  {copied && (
                     <p className="mt-2 text-xs text-green-600">
                        Copied to clipboard
                     </p>
                  )}

                  {/* FOOTER */}
                  <div className="flex mt-6 justify-end">
                     <DialogClose asChild>
                        <Button variant="default">
                           Done
                        </Button>
                     </DialogClose>
                  </div>
               </>
            )}
         </DialogContent>
      </Dialog>
   )
}

export default LinkDialog
