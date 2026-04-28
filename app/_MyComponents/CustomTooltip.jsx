"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "../_lib/context";

function CustomTooltip({
  step,
  index,
  isLastStep,
  backProps,
  primaryProps,
}) {
  const { title, description, media } = step.content ?? {};
  const { themeToggled,isDrawerOpen ,fileBlob,location} = useUser();
  console.log(step.target==='[data-tour="AddImageButton"]',step.target );


  return (
    <Card className="w-80 shadow-xl">
      <CardHeader className="pb-3">
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      {media && (
        <>
          <CardContent className="pt-0">{media}</CardContent>
          <Separator />
        </>
      )}

      {(!step.hideBackButton ||( step.target === "[data-tour=\"themeToggle\"]" && themeToggled)|| (step.target ==='[data-tour="AddImageButton"]' && isDrawerOpen)|| (step.target==='[data-tour="LocationButton"]' && location)|| !!fileBlob) && (
        <CardFooter className="flex justify-end gap-2 pt-3">
          {index > 0 && (
            <Button variant="outline" size="sm" {...backProps}>
              Back
            </Button>
          )}

          {(!step.hideCloseButton || (themeToggled)) && (
            <Button size="sm" {...primaryProps}>
              {isLastStep ? "Finish" : "Next"}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

export default CustomTooltip;
