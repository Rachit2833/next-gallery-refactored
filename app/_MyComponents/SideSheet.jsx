"use client"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import {
  Home,
  ImageIcon,
  LineChart,
  Package,
  Package2,
  Users2
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { searchImages } from "../_lib/actions"
import { useUser } from "../_lib/context"


function SideSheet({open,onOpenChange}) {
  const { searchVal, setSearchVaL, isDark, setIsDark, searchData, setSearchData, queryState, modelImages, setModelImages, setIsImageOpen, setModelType, } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const pathName = usePathname()
  const pathArray = pathName.split("/")
  const uniqueArray = [...new Set(pathArray)]
  const searchParams = useSearchParams()
  const router = useRouter()
  function handleParamsObj(paramsObj) {
  if (!searchParams) return
  const params = new URLSearchParams(searchParams)

  for (const [key, value] of Object.entries(paramsObj)) {
    params.set(key, value)
  }

  router.replace(`${pathName}?${params}`, { scroll: false })
}
  const navigationItems = [
    {
      name: "Albums",
      icon: Package,
      href: "/albums",
    },
    {
      name: "People & Sharing",
      icon: Users2,
      href: "/people",
    },
    {
      name: "Favourites",
      icon: Home,
      href: "/favourites",
    },
    {
      name: "Memory-Map",
      icon: LineChart,
      href: "/memory-map",
    },
    {
      name: "Post",
      icon: ImageIcon,
      href: "/post",
    },
  ]


  function handleParams(filter, filterName) {
    if (!searchParams) return
    const params = new URLSearchParams(searchParams)
    params.set(filterName, filter)
    router.replace(`${pathName}?${params}`, { scroll: false })
  }
  const removeParam = (key) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.delete(key)
    router.push(`?${newParams.toString()}`)
  }

  useEffect(() => {
    if (!searchVal) {
      setSearchData(null)
      setIsLoading(false)

      // Remove all search-related params
      const params = new URLSearchParams(searchParams)
      params.delete("query")
      // params.delete("frId")
      // params.delete("cod")
      // Add more keys here as needed

      router.replace(`${pathName}?${params}`, { scroll: false })
      return
    }

    async function search() {
      setIsLoading(true)
      const res= await searchImages(searchVal)
      setSearchData(res)
      setIsLoading(false)
    }

    search()
  }, [searchVal])


  return pathName !== "/login" &&
    pathName !== "/sign-up" &&
    pathName !== "/not-found" ? (
    <aside className=" hidden sm:block  ">
      <Sheet open={open} onOpenChange={onOpenChange}>
      
        <SheetContent side="left" className="sm:max-w-xs">
          <SheetTitle />
          <nav className="grid gap-6 text-lg font-medium">
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
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-4 px-2.5 hover:text-foreground ${pathName.startsWith(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground"
                  }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

        
     
    </aside>
  ) : null
}

export default SideSheet
