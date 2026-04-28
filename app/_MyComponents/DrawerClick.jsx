"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { PlusCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { getLocationInfo, saveMassImages } from "../_lib/actions"
import { useUser } from "../_lib/context"
import AddAlbumForm from "./AlbumsComponent/AddAlbumForm"
import PasteModule from "./PasteModule"
import ToggleButton from "./ToggleButton"
import Uploadcard, { Earthbutton } from "./UploadCard"

function DrawerClick({ datatour, name, formType = "Image" }) {
  const {
    isOn,
    setIsOn,
    imagesPasted,
    setImagesPasted,
    getSeasons,
    isLocationFetching, setIsLocationFetching,
    location, setLocation, autoDetectImages,
    isLocating, setIsLocating, isDrawerOpen, setDrawerOpen, stepIndex, setStepIndex, lat,
    long,
    setLat,
    setLong,
    country,
    setCountry
    , user } = useUser()



  const [uploadType, setUploadType] = useState(1)
  const [file, setFile] = useState([])

  const [globalDescription, setGlobalDescription] = useState(getSeasons || "")
  const [isSaving, setIsSaving] = useState(false)



  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const updatedFileUrls = files.map((file) => ({
      imageFile: file,
      imageUrl: URL.createObjectURL(file)
    }))
    setFile((prevFile) => [...prevFile, ...updatedFileUrls])
  }

  const handleSave = async () => {
    const allImages = [...imagesPasted, ...file]
    setIsSaving(true)

    const formData = new FormData()
    allImages.forEach((img) => {
      const imageFile = img?.imageFile
      if (imageFile instanceof File || imageFile instanceof Blob) {
        formData.append("images", imageFile)
      }
    })

    formData.append("LocationName", location)
    formData.append("Description", globalDescription || "No description provided")
    formData.append("Favourite", "false")
    formData.append("detection", "true")
    formData.append("People", JSON.stringify([]))
    formData.append("Country", country || "") // ✅ dynamic
    formData.append("coordinates", JSON.stringify([formData.get("lat"),formData.get("long")]));

    try {
      await saveMassImages(formData)
      file.forEach(f => URL.revokeObjectURL(f.imageUrl))
      imagesPasted.forEach(f => URL.revokeObjectURL(f.imageUrl))
      setImagesPasted([])
      setFile([])
    } catch (err) {
      console.error("Error saving image:", err)
    }

    setIsSaving(false)
    setDrawerOpen(false)
  }

  const handleGetCoordinates = async () => {
    if (isLocating || isLocationFetching) return;

    try {
      setIsLocating(true);

      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const formData = new FormData();
      formData.append("latitude", position.coords.latitude);
      formData.append("longitude", position.coords.longitude);

      const res = await getLocationInfo(formData);

      setLocation(`${res.city}, ${res.country}`);

      // ✅ ADD THESE
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      setCountry(res.country);

      setIsLocationFetching(true);
    } finally {
      setIsLocating(false);
    }
  };


  const handleCancel = () => {
    file.forEach(f => URL.revokeObjectURL(f.imageUrl))
    imagesPasted.forEach(f => URL.revokeObjectURL(f.imageUrl))

    setFile([])
    setImagesPasted([])
    setDrawerOpen(false)
  }


  useEffect(() => {
    if (!autoDetectImages) return; // 🔐 hard gate

    let cancelled = false;
    let permissionStatus = null;

    const autoFetchLocation = async () => {
      if (                    // menu not open
        isLocationFetching ||       // already fetching
        !navigator?.permissions    // unsupported browser
      ) {
        return;
      }

      try {
        permissionStatus = await navigator.permissions.query({
          name: "geolocation",
        });

        if (permissionStatus.state === "granted" && !cancelled) {
          handleGetCoordinates();
        }

        // Handle prompt → granted while menu is open
        permissionStatus.onchange = () => {
          if (
            permissionStatus.state === "granted" &&
            !cancelled &&
            !isLocationFetching
          ) {
            handleGetCoordinates();
          }
        };
      } catch (err) {
        console.error("Permission check failed", err);
      }
    };

    autoFetchLocation();

    return () => {
      cancelled = true;
      if (permissionStatus) {
        permissionStatus.onchange = null;
      }
    };
  }, [autoDetectImages, isOn]);



  return (
    <div className="relative">
      <Drawer
        open={isDrawerOpen}
        onOpenChange={(open) => {
          if (stepIndex <= 0) {
            setDrawerOpen(open);
            setIsOn(false); // close dialog when drawer closes

          }
        }}
      >
        <DrawerTrigger
          data-tour={datatour}
          onClick={() => setDrawerOpen(true)}
          className="h-7 px-3 text-xs gap-1 bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          {name}
        </DrawerTrigger>

        <DrawerContent className={formType === "Album" ? "min-h-[25rem]" : "min-h-[45rem]"}>
          {formType === "Image" ? (
            <>
              <div className="w-full flex justify-between items-center gap-4 px-4 py-2 sm:px-8">
                <button
                  data-tour="singleUploadMode"
                  onClick={() => setUploadType(1)}
                  className={`flex-1 text-center cursor-pointer pb-1 transition-all duration-300 ease-in-out ${uploadType === 1
                    ? "border-b-4 border-foreground text-foreground font-semibold"
                    : "border-b-4 border-transparent text-muted-foreground"
                    }`}
                >
                  Single Upload
                </button>

                <div className="h-6 w-px bg-border" />

                <button
                  data-tour="multipleUploadMode"
                  onClick={() => setUploadType(2)}
                  className={`flex-1 text-center cursor-pointer pb-1 transition-all duration-300 ease-in-out ${uploadType === 2
                    ? "border-b-4 border-foreground text-foreground font-semibold"
                    : "border-b-4 border-transparent text-muted-foreground"
                    }`}
                >
                  Multiple Upload
                </button>

              </div>
              <div className="h-10 w-full bg-red-700 flex items-center justify-center px-2 text-center">
                <p className="text-sm text-white font-medium">
                  Image uploads have been paused due to cloud costs, You can run the worker available on github locally to restart the services
                </p>
              </div>

              <Separator />

              {uploadType === 1 ? (
                <Uploadcard isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
              ) : (
                <>
                  <DrawerHeader className="relative px-4">
                    <DrawerTitle className="text-center text-base sm:text-lg">
                      Select Images from your Local Storage or Paste (Ctrl+V)
                    </DrawerTitle>

                    <Dialog open={isOn} onOpenChange={setIsOn}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          Save
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Save Images</DialogTitle>
                          <DialogDescription>
                            This will save all images selected by you.
                          </DialogDescription>
                        </DialogHeader>

                        {/* Body */}
                        <div className="space-y-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">
                                Enter the Details for Images
                              </CardTitle>
                              <CardDescription>
                                Common details for all images
                              </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                              <Input
                                name="Title"
                                type="text"
                                placeholder="Describe your image"
                                className="bg-muted text-muted-foreground"
                                value={globalDescription}
                                onChange={(e) => setGlobalDescription(e.target.value)}
                              />

                              <div className="space-y-2">
                                <span className="text-sm font-medium text-muted-foreground">
                                  Location
                                </span>

                                <div className="flex items-center gap-2">
                                  <Input
                                    name="Location"
                                    type="text"
                                    placeholder="Location of your image"
                                    onChange={(e) => setLocation(e.target.value)}
                                    value={location}
                                    disabled={isLocationFetching}
                                    className="bg-muted text-muted-foreground"
                                  />

                                  <form action={handleGetCoordinates}>
                                    <Earthbutton disabled={isLocationFetching} loading={isLocating} />
                                  </form>
                                </div>

                                {isLocationFetching && (
                                  <Badge
                                    variant="outline"
                                    className="flex items-center justify-between"
                                  >
                                    📍 {location}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setLocation("")
                                        setIsLocationFetching(false)
                                      }}
                                      className="ml-2 text-destructive"
                                    >
                                      ✖
                                    </button>
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <DialogFooter>
                          <Button
                            variant="secondary"
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>

                          <Button
                            onClick={handleSave}
                            disabled={isSaving}
                          >
                            {isSaving ? "Saving..." : "Save"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <DrawerDescription className="text-center text-sm mt-2">
                      Description and Location are editable below
                    </DrawerDescription>

                    <Input

                      name="photo"
                      onChange={handleFileChange}
                      multiple
                      className="sm:w-[35rem] mx-auto mt-4 w-full px-0 py-0 border rounded-md bg-muted text-muted-foreground
                     file:px-4 file:py-2 file:rounded-none file:border-none file:bg-accent 
                     file:text-accent-foreground file:m-0 file:mr-4 file:rounded-l-md file:shadow-none"
                      type="file"
                    />
                  </DrawerHeader>

                  <div className="max-h-[30rem] overflow-auto px-2 py-2 border border-border rounded-md mt-4 bg-background">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <PasteModule additionalData={file} setFile={setFile} />
                    </div>
                  </div>
                </>
              )}
            </>
          ) : formType === "Album" ? (
            <AddAlbumForm setIsOpen={setDrawerOpen} />
          ) : null}
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default DrawerClick