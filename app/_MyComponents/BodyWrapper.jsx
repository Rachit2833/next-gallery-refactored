'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PanelRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { avatarImages } from '../_lib/avatar';
import { useUser } from '../_lib/context';
import { themes } from '../_lib/themes';
import ImageModel from './AlbumsComponent/ImageModel';
import LayoutWrapper from './LayoutWrapper';
import MainSearchBar from './MainSearchBar';
import NavBar from './NavBar';
import SideSheet from './SideSheet';
import SideFilterLayout from "./SideFilterLayout";
import ModesButton from "./ModesButton";
const BodyWrapper = ({ children, user, params }) => {
  const { selectedTheme, isDark, setIsDark, setPersonalDetails, isHydrated, setIsHydrated } = useUser()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const image = user?.profilePicture
  const pathName = usePathname()
  const pathArray = pathName.split("/")
  const uniqueArray = [...new Set(pathArray)]

  useEffect(() => {
    setPersonalDetails(user?.seoPrivacy)

  }, [user])
  let profilImage

  if (!isNaN(Number(image)) && avatarImages[Number(image)]) {
    profilImage = avatarImages[Number(image)];
  }
  return (
    <>

      <NavBar />
      <SideSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} profileImage={profilImage || image} />
      <header className="sm:my-2 sm:ml-16 z-30 border-b bg-background px-4 sm:static sm:border-0 sm:bg-transparent sm:px-6">
        {/* Row 1 */}
        <div className="flex h-14 mb-6 items-center gap-4 sm:h-auto">
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
                const href = item === "services" ? "/services" : `/${item}`;

                return (
                  <React.Fragment key={i}>
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


          <div className="md:block hidden" >
            <ModesButton isDark={isDark} setIsDark={setIsDark} />
          </div>

          <MainSearchBar profileImage={profilImage || image} />

        </div>

        {/* Row 2 */}
        <div className="mt-4 ">
          <SideFilterLayout text="Add Images" year={params.year} />

        </div>

      </header>


      {/* <Toaster /> */}

      <LayoutWrapper image={user?.profilePicture}>
        <ImageModel />
        {children}
      </LayoutWrapper>
    </>
  );
};

export default BodyWrapper;