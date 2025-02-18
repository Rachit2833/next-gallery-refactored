
import "./global.css"
import { Album, Heart, Home, Settings } from "lucide-react";

import SideSheet from "./_Components/SideSheet";
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { Download, ListFilter } from "lucide-react";
import { UserProvider } from "./_lib/context";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageModel from "./_Components/Albums/ImageModel";
import NavBar from "./_Components/NavBar";
import Script from "next/script";



export default function RootLayout({ children }) {
   
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <Script defer src="@/lib/face-api.min.js"></Script>

      <body>
        <UserProvider>
          <ImageModel />

          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <NavBar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <SideSheet />
              <main className="grid  flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">{children}</Tabs>
              </main>
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
