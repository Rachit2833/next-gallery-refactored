'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Album,
  Camera,
  Heart,
  Home,
  Map,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '../_lib/context';

function NavBar() {
  const pathname = usePathname();
  const { setSelectedImages, setOpenCamera, setVideoSrc } = useUser();

  useEffect(() => {
    setSelectedImages([]);
    setOpenCamera(false);
    setVideoSrc(null);
  }, [pathname]);

  const navigationItems = [
    { name: 'Albums', icon: Album, href: '/services/albums' },
    { name: 'People & Sharing', icon: Users, href: '/services/people' },
    { name: 'Favourites', icon: Heart, href: '/services/favourites' },
    { name: 'Memory-Map', icon: Map, href: '/services/memory-map' },
    { name: 'Post', icon: Camera, href: '/services/post' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      {/* Top Nav */}
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        {/* Home */}
        <Link
          href="/services/"
          className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full ${
            pathname === '/services/' || pathname === '/services'
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted text-muted-foreground'
          } transition-colors`}
        >
          <Home className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Home</span>
        </Link>

        {/* Other Nav Items */}
        <TooltipProvider>
          {navigationItems.map((item, index) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground'
                    } transition-colors`}
                  >
                    <item.icon className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>

      {/* Bottom Nav */}
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  pathname.startsWith('/settings')
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}

export default NavBar;
