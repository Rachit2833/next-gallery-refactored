'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { Toaster } from "@/components/ui/toaster";
import { PanelRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { avatarImages } from '../_lib/avatar';
import { useUser } from '../_lib/context';
import ImageModel from './AlbumsComponent/ImageModel';
import LayoutWrapper from './LayoutWrapper';
import MainSearchBar from './MainSearchBar';
import ModesButton from "./ModesButton";
import NavBar from './NavBar';
import SideFilterLayout from "./SideFilterLayout";
import SideSheet from './SideSheet';
const BodyWrapper = ({ children, params }) => {
  const { isDark, setIsDark, user } = useUser()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const image = user?.profilePicture
  const pathName = usePathname()
  const uniqueArray = pathName.split("/").filter(Boolean)
  let profileImage
  if (!isNaN(Number(image)) && avatarImages[Number(image)]) {
    profileImage = avatarImages[Number(image)];
  }
  const text = pathName.startsWith("/services/albums") ? "Add Albums" : "Add Images"
  const formType = pathName.startsWith("/services/albums") ? "Album" : "Image"
  const dataTour = pathName.startsWith("/services/albums") ? "AddAlbumButton" : "AddImageButton"
  return (
    <>
      <NavBar />
      <SideSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} profileImage={profileImage || image} />
      <header className="sm:my-2 sm:ml-16 z-30 border-b bg-background px-4 sm:static sm:border-0 sm:bg-transparent sm:px-6">
        {/* Row 1 */}
        <div className="flex h-14  items-center justify-between gap-4 sm:h-auto">
          <div className="flex gap-6">
            <Button
              onClick={() => setIsSheetOpen(true)}
              size="icon"
              variant="outline"
              className="sm:hidden"
            >
              <PanelRight className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                {uniqueArray.map((item, i) => {
                  const href = `/${uniqueArray.slice(0, i + 1).join("/")}`;
                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbItem>
                        <BreadcrumbLink href={href}>
                          {item}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {i < uniqueArray.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
            <ModesButton isDark={isDark} setIsDark={setIsDark} />
          </div>

          <div className="relative h-14 ">
            <MainSearchBar profileImage={profileImage || image} />
          </div>
        </div>

        {/* Row 2 */}
        <SideFilterLayout datatour={dataTour} text={text} year={params.year} formType={formType} />
      </header>


      <Toaster />

      <LayoutWrapper>
        <ImageModel />
        {children}
      </LayoutWrapper>
    </>
  );
};

export default BodyWrapper;