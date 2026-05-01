"use client";

import imgs from "@/public/Images/dune.jpg";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Earth } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getLocationInfo, saveNewImage } from "../_lib/actions";
import { useUser } from "../_lib/context";
import { Deletebutton } from "./ImageCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useFormStatus } from "react-dom";

/* ----------------------------------------
   Utils
---------------------------------------- */

function getSeason() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  if (month === 11 || month <= 1) return `Winter ${year}`;
  if (month >= 2 && month <= 4) return `Spring ${year}`;
  if (month >= 5 && month <= 7) return `Summer ${year}`;
  return `Fall ${year}`;
}

/* ----------------------------------------
   Component
---------------------------------------- */

function Uploadcard({
  setDrawerOpen,
  fileInput = true,
  urlBlob,
  people = [],
}) {
  const [file, setFile] = useState();
 // ✅ NEW
  const [hasShownDeniedToast, setHasShownDeniedToast] = useState(false);

  const descriptionPlaceholder = getSeason();

  const {
    isLocationFetching,
    setIsLocationFetching,
    location,
    setLocation,
    lat,
    long,
    user,
    autoDetectImages,
    fileBlob,
    setFileBlob,
    isLocating,
    setIsLocating,
setLat,setLong,country, setCountry
  } = useUser();
 

  const { toast } = useToast();

  useEffect(() => {
    setHasShownDeniedToast(false);
  }, [file]);

  useEffect(() => {
    if (!file || !autoDetectImages) return;

    let cancelled = false;

    const autoFetchLocation = async () => {
      if (isLocationFetching || !navigator?.permissions) return;

      try {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });

        if (permission.state === "granted" && !cancelled) {
          handleGetCoordinates();
        }

        if (
          permission.state === "denied" &&
          !hasShownDeniedToast &&
          !cancelled
        ) {
          setHasShownDeniedToast(true);
          toast({
            title: "Location access denied",
            description: "You can enter location manually.",
          });
        }
      } catch (err) {
        console.error("Permission check failed", err);
      }
    };

    autoFetchLocation();
    return () => (cancelled = true);
  }, [file, autoDetectImages]);

  async function urlToBlob(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch image");
      return await res.blob();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  /* ----------------------------------------
     Location
  ---------------------------------------- */

  const handleGetCoordinates = async () => {
    if (isLocating || isLocationFetching) return;

    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLocating(true);

      const position = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, {
          timeout: 10000,
        })
      );

      const fd = new FormData();
      fd.append("latitude", String(position.coords.latitude));
      fd.append("longitude", String(position.coords.longitude));

      const loc = await getLocationInfo(fd);

      if (!loc?.city || !loc?.country)
        throw new Error("Invalid location");

      setLocation(`${loc.city}, ${loc.country}`);
      setCountry(loc.country); // ✅ dynamic country
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)
      setIsLocationFetching(true);

    } catch (e) {
      toast({
        title: "Unable to fetch location",
        description: e.message,
        variant: "destructive",
      });
    } finally {
      setIsLocating(false);
    }
  };

  /* ----------------------------------------
     Submit
  ---------------------------------------- */

  async function onSubmit(formData) {
    try {
      const description =
        formData.get("Description")?.toString().trim() || "";

      formData.set("Description", description);

      const peopleData =
        people.length > 0 && !people.includes("unknown")
          ? people
          : [];

      formData.set(
        "detection",
        peopleData.length ? "false" : "true"
      );

      formData.set("People", JSON.stringify(peopleData));

      if (fileInput && !fileBlob) {
        throw new Error("Please select an image");
      }

      if (fileInput) {
        formData.set("photo", fileBlob);
      } else {
        const blob = await urlToBlob(urlBlob);
        if (!blob) throw new Error("Image load failed");
        formData.set("photo", blob);
      }

      await saveNewImage(formData, user._id);

      toast({
        title: "Upload successful",
      });

      setDrawerOpen(false);
    } catch (e) {
      toast({
        title: "Upload failed",
        description: e.message,
        variant: "destructive",
      });
    }
  }

  /* ----------------------------------------
     JSX
  ---------------------------------------- */

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 max-w-xl mx-auto">
      <DrawerHeader>
        <DrawerTitle className="text-center">
          Select Images
        </DrawerTitle>
        <DrawerDescription className="text-center">
          Edit description & location
        </DrawerDescription>
      </DrawerHeader>

      <DrawerFooter>
        <form action={onSubmit} className="grid gap-4">

          <Card className="p-3 space-y-3">
            <Image
              width={352}
              height={240}
              src={fileInput && file ? file : urlBlob || imgs}
              alt="Preview"
              className="w-full h-[15rem] object-cover rounded-md"
            />

            {/* Location */}
            <div className="flex gap-2">
              <Input
                name="LocationName"
                value={location}
                onChange={(e) => {
                  const value = e.target.value;
                  setLocation(value);

                  // ✅ extract country from manual input
                  const parts = value.split(",");
                  if (parts.length > 1) {
                    setCountry(parts[parts.length - 1].trim());
                  } else {
                    setCountry("");
                  }
                }}
                placeholder="Enter location"
                className="w-full border rounded-md bg-muted text-muted-foreground outline-none"
              />

              <Button
                type="button"
                onClick={handleGetCoordinates}
                disabled={isLocating || isLocationFetching}
              >
                {isLocating ? (
                  <div className="w-4 h-4 border-2 border-muted border-t-primary rounded-full animate-spin" />
                ) : (
                  <Earth className="w-4 h-4" />
                )}
              </Button>
            </div>

            {isLocationFetching && (
              <Badge className="flex justify-between">
                📍 {location}
                <button
                  type="button"
                  onClick={() => {
                    setLocation("");
                    setCountry(""); // ✅ reset country
                    setIsLocationFetching(false);
                  }}
                >
                  ✖
                </button>
              </Badge>
            )}

            {/* Description */}
            <Input
              name="Description"
              defaultValue={descriptionPlaceholder}
              className="w-full border rounded-md bg-muted text-muted-foreground outline-none"
            />
          </Card>

          {/* File */}
          {fileInput && (
            <Input
              type="file"
              accept="image/*"
  className="mx-auto mt-4 w-full px-0 py-0 border rounded-md bg-muted text-muted-foreground
                     file:px-4 file:py-2 file:rounded-none file:border-none file:bg-accent 
                     file:text-accent-foreground file:m-0 file:mr-4 file:rounded-l-md file:shadow-none"
             onChange={(e) => {
                const f = e.target.files?.[0];

                if (!f) return;

                if (!f.type.startsWith("image/")) {
                  toast({
                    title: "Invalid file",
                    description: "Only image files are allowed.",
                    variant: "destructive",
                  });
                  return;
                }

                setFile(URL.createObjectURL(f));
                setFileBlob(f);
              }}
            />
          )}

          {/* Hidden */}
          <input name="lat" value={lat || ""} hidden readOnly />
          <input name="long" value={long || ""} hidden readOnly />
          <input name="Country" value={country || ""} hidden readOnly /> {/* ✅ FIXED */}

          {/* Submit */}
          <Deletebutton
            text="Submit"
            disabled={fileInput && !fileBlob}
          />

          <DrawerClose className="border rounded-md h-9">
            Cancel
          </DrawerClose>
        </form>
      </DrawerFooter>
    </div>
  );
}

export default Uploadcard;


export function Earthbutton({ disabled, loading }) {
  const { pending } = useFormStatus();

  return (
    <Button
      data-tour="LocationButton"
      type="submit"
      disabled={pending || disabled}
    >
      {pending || loading ? (
        <div className="w-4 h-4 border-2 border-muted border-t-primary rounded-full animate-spin" />
      ) : (
        <Earth className="w-4 h-4" />
      )}
    </Button>
  );
}