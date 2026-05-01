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

function NavBar() {
  const pathname = usePathname();

  // useEffect(() => {
  //   setSelectedImages([]);
  //   setOpenCamera(false);
  //   setVideoSrc(null);
  // }, [pathname]);

  const navigationItems = [
    { name: 'Albums', icon: Album, href: '/services/albums' },
    { name: 'People & Sharing', icon: Users, href: '/services/people' },
    { name: 'Favourites', icon: Heart, href: '/services/favourites' },
    { name: 'Memory-Map', icon: Map, href: '/services/memory-map' },
    { name: 'Post', icon: Camera, href: '/services/post' },
  ];
  const isHomeActive =
    pathname === '/services' || pathname === '/services/';

  return (

    <aside
      aria-label="Primary sidebar"
      className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex"
    >
      <TooltipProvider>
        {/* Top navigation */}
        <nav
          aria-label="Main navigation"
          className="flex flex-col items-center gap-4 px-2 py-4"
        >
          {/* Home */}
          <Link
            href="/services"
            aria-current={isHomeActive ? 'page' : undefined}
            className={`group flex h-9 w-9 items-center justify-center rounded-full transition-colors ${isHomeActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
              }`}
          >
            <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="sr-only">Home</span>
          </Link>

          {/* Other nav items */}
          {navigationItems.map(item => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group flex h-9 w-9 items-center justify-center rounded-full transition-colors ${isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted'
                      }`}
                  >
                    <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
        <nav
          aria-label="Settings"
          className="mt-auto flex flex-col items-center gap-4 px-2 py-4"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/services/settings"
                aria-current={
                  pathname.startsWith('/services/settings') ? 'page' : undefined
                }
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${pathname.startsWith('/services/settings')
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
        </nav>
      </TooltipProvider>
    </aside>
  );
}

export default NavBar;
