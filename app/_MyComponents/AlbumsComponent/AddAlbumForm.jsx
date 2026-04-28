'use client'


import {
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { SubmitButton } from "../SearchComponents/LeaveDialog";
import { createNewAlbum } from "@/app/_lib/actions";

function AddAlbumForm({ setIsOpen, }) {
   const { toast } = useToast()
   return (

      <div className="w-[80%] lg:w-[40%]  mx-auto">


         <DrawerHeader>
            <DrawerTitle className="text-center">
               Create New Albums And Share with Family & Friends
            </DrawerTitle>
            <DrawerDescription className="text-center">
               Description and Location can be Editable from the Input Fields Below
            </DrawerDescription>
         </DrawerHeader>
         <DrawerFooter>
            <form action={async (formData) => {
               try {
                  const options = {
                     weekday: "long",
                     year: "numeric",
                     month: "long",
                     day: "numeric",
                     hour: "numeric",
                     minute: "numeric",
                     hour12: true,
                  };
                  const description = new Date().toLocaleString("en-US", options);

                  const res = await createNewAlbum(formData);

                  setIsOpen(false);
                  toast({
                     title: "New album created successfully",
                     description: description,
                     action: <ToastAction altText="Goto schedule to undo">Done</ToastAction>,
                  });
               } catch (error) {
                  toast({
                     title: "Album Creation Failed",
                     description: error.message || "Something went wrong!",
                     action: <ToastAction altText="Try Again">Retry</ToastAction>,
                  });
               }
            }}>

               <div className="grid w-full grid-cols-2 items-center gap-1.5">
                  <div className="col-span-2">
                     <Label htmlFor="Title">Title</Label>
                     <Input
                        required
                        maxLength={20}
                        name="Title"
                        className="w-full px-4 py-2 border rounded-md bg-muted text-muted-foreground outline-none"
                        id="Title"
                        placeholder="Title or Name of the Album in 15 characters or less"
                        type="text"
                     />
                  </div>
                  <div className="col-span-2">
                     <Label htmlFor="Description">Description  <span className="text-xs text-muted-foreground">(optional)</span></Label>
                     <Input
                        name="Description"
                        className="w-full px-4 py-2 border rounded-md bg-muted text-muted-foreground outline-none"
                        id="Description"
                        placeholder="Describe your Album"
                        type="text"
                     />
                  </div>
                  <div className="col-span-2">
                     <Label htmlFor="Cover-Image">
                        Cover Image <span className="text-xs text-muted-foreground">(optional)</span>
                     </Label>
                     <Input
                        name="photo"
                        id="Cover-Image"
                        type="file"
                        className="mx-auto mt-4 w-full px-0 py-0 border rounded-md bg-muted text-muted-foreground
                     file:px-4 file:py-2 file:rounded-none file:border-none file:bg-accent 
                     file:text-accent-foreground file:m-0 file:mr-4 file:rounded-l-md file:shadow-none"
                     />
                  </div>
               </div>

               <div className="mt-4 flex flex-col gap-2 justify-center">
                  <SubmitButton buttonText="Create Album" />
               </div>
            </form>
         </DrawerFooter>
      </div>
   );
}

export default AddAlbumForm;
