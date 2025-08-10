'use client';

import React from 'react';
import NavBar from './NavBar';
import SideSheet from './SideSheet';
import { usePathname } from 'next/navigation';
import { avatarImages } from '../_lib/avatar';

const LayoutWrapper = ({ children,image }) => {
  const pathName = usePathname();

  const noLayoutRoutes = ['/login', '/sign-up', '/not-found'];

  // If current route is in the excluded list, render children only
  if (noLayoutRoutes.includes(pathName)) {
    return <>{children}</>;
  }
  return (
      <main className="  sm:py-4 sm:pl-14">

        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">

          {children}
        </div>
      </main>
  );
};

export default LayoutWrapper;
