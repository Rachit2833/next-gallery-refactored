"use client"
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet"
import {
  Home,
  ImageIcon,
  LineChart,
  Package,
  Package2,
  Users2
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


function SideSheet({ open, onOpenChange }) {
  const pathName = usePathname()
  const navigationItems = [
    {
      name: "Albums",
      icon: Package,
      href: "/services/albums",
    },
    {
      name: "People & Sharing",
      icon: Users2,
      href: "/services/people",
    },
    {
      name: "Favourites",
      icon: Home,
      href: "/services/favourites",
    },
    {
      name: "Memory-Map",
      icon: LineChart,
      href: "/services/memory-map",
    },
    {
      name: "Post",
      icon: ImageIcon,
      href: "/services/post",
    },
  ]


  return (

    <Sheet open={open} onOpenChange={onOpenChange}>

      <SheetContent side="left" className="sm:max-w-xs">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <nav className="grid gap-6 text-lg font-medium">
          <SheetClose asChild>
            <Link
              href="/"
              className={`flex items-center gap-4 px-2.5 hover:text-foreground ${pathName === "/"
                ? "text-foreground"
                : "text-muted-foreground"
                }`}
            >
              <Package2 />
              Home
            </Link>
          </SheetClose>
          {navigationItems.map((item, index) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-4 px-2.5 hover:text-foreground ${pathName.startsWith(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground"
                  }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>

  )
}

export default SideSheet
