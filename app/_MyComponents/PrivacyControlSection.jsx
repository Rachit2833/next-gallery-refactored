"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useUser } from "../_lib/context";
import { useEffect, useState } from "react";

const PrivacyControlSection = ({ privacySettings }) => {
  const {
    personalDetails,
    setPersonalDetails,
    user,
    autoDetectImages,
    setAutoDetectImages,
  } = useUser();

  const [mounted, setMounted] = useState(false);

  // UI-only state
  const [shareDetails, setShareDetails] = useState(false);
  const [locationPermission, setLocationPermission] = useState("prompt");
  const [locationAccess, setLocationAccess] = useState(false);
  const [locationError, setLocationError] = useState("");

  /* ----------------------------
   * Mount guard
   * ---------------------------- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ----------------------------
   * Sync profile privacy
   * ---------------------------- */
  useEffect(() => {
    if (!mounted) return;
    setPersonalDetails(user?.seoPrivacy ?? false);
  }, [mounted, user?.seoPrivacy, setPersonalDetails]);

  useEffect(() => {
    if (!mounted) return;
    setShareDetails(privacySettings?.details ?? false);
  }, [mounted, privacySettings?.details]);

  /* ----------------------------
   * Read browser permission (signal only)
   * ---------------------------- */
  useEffect(() => {
    if (!mounted || !navigator?.permissions) return;

    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        setLocationPermission(result.state);

        // 🔑 One-time sync: if permission is already granted,
        // allow location usage by default (user can turn it off)
        if (result.state === "granted") {
          setLocationAccess((prev) => prev || true);
        }

        result.onchange = () => {
          setLocationPermission(result.state);

          // If browser revokes permission → force-disable
          if (result.state !== "granted") {
            setLocationAccess(false);
            setAutoDetectImages(false);
          }
        };
      })
      .catch(() => setLocationPermission("prompt"));
  }, [mounted, setAutoDetectImages]);

  /* ----------------------------
   * Handle Location toggle (USER INTENT)
   * ---------------------------- */
  const handleLocationToggle = async (checked) => {
    setLocationError("");

    // User turns OFF location usage
    if (!checked) {
      setLocationAccess(false);
      setAutoDetectImages(false);
      return;
    }

    // User turns ON → request permission
    try {
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      setLocationPermission("granted");
      setLocationAccess(true);
    } catch {
      setLocationPermission("denied");
      setLocationAccess(false);
      setAutoDetectImages(false);
      setLocationError(
        "Location access is disabled. Enable it from your browser settings to use this feature."
      );
    }
  };

  /* ----------------------------
   * Prevent hydration mismatch
   * ---------------------------- */
  if (!mounted) return null;

  return (
    <Card className="w-full max-w-3xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Privacy Controls</CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage how your data is used and what others can see.
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* SEO Visibility */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <Label className="font-medium">Allow Search Engines</Label>
            <p className="text-sm text-muted-foreground max-w-sm">
              Let search engines index your profile for discoverability.
            </p>
          </div>
          <Switch
            checked={personalDetails}
            onCheckedChange={setPersonalDetails}
          />
        </div>

        {/* Personal Info */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <Label className="font-medium">Share Personal Info</Label>
            <p className="text-sm text-muted-foreground max-w-sm">
              Control whether your name and profile details are visible to others.
            </p>
          </div>
          <Switch
            checked={shareDetails}
            onCheckedChange={setShareDetails}
          />
        </div>

        {/* Location Access */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <Label className="font-medium">Enable Location Access</Label>
            <p className="text-sm text-muted-foreground max-w-sm">
              We use your location to organize memories by place and improve
              timelines.
            </p>

            {locationPermission === "granted" && (
              <p className="text-sm text-green-600 mt-1">
                Browser permission granted.
              </p>
            )}

            {locationPermission === "granted" && !locationAccess && (
              <p className="text-xs text-muted-foreground mt-1">
                Permission is granted, but location usage is disabled in app
                settings.
              </p>
            )}

            {locationPermission === "denied" && (
              <p className="text-sm text-destructive mt-1">
                Location permission denied in browser settings.
              </p>
            )}

            {locationError && (
              <p className="text-sm text-destructive mt-1">
                {locationError}
              </p>
            )}
          </div>

          <Switch
            checked={locationAccess}
            onCheckedChange={handleLocationToggle}
          />
        </div>

        {/* Auto Location for Images */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <Label className="font-medium">
              Auto-detect Location for Images
            </Label>
            <p className="text-sm text-muted-foreground max-w-sm">
              Automatically attach location data to images. Requires location
              access to be enabled.
            </p>
          </div>

          <Switch
            checked={autoDetectImages}
            disabled={!locationAccess}
            onCheckedChange={setAutoDetectImages}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyControlSection;
