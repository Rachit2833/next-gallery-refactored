"use client"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    ImageIcon,
    Search,
    X
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { logOutUser, searchImages } from "../_lib/actions"
import SearchLoader from "./Loaders/SearchLoader"

import { useEffect, useState } from "react"
import { useUser } from "../_lib/context"


const MainSearchBar = ({ profileImage }) => {
    const { searchVal, setSearchVaL, searchData, setSearchData,  setModelImages, setIsImageOpen, setModelType, } = useUser()
    const [isLoading, setIsLoading] = useState(false)
    const [interVar, setInterVar] = useState("")
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    
    function handleParams(filter, filterName) {
        if (!searchParams) return
        const params = new URLSearchParams(searchParams)
        params.set(filterName, filter)
        router.replace(`${pathName}?${params}`, { scroll: false })
    }

    function handleMultipleParams(updates) {
        const params = new URLSearchParams(searchParams)
        Object.entries(updates).forEach(([key, value]) => {
            params.set(key, value)
        })
        router.replace(`${pathName}?${params}`, { scroll: false })
    }



    useEffect(() => {
        if (!searchVal) {
            setSearchData(null)
            setIsLoading(false)
            const params = new URLSearchParams(searchParams)
            params.delete("query")
            params.delete("cod")
            params.delete("frId")
            params.delete("name")
            router.replace(`${pathName}?${params}`, { scroll: false })
            return
        }
        handleParams(searchVal, "query")

        async function search() {
            setIsLoading(true)
            const res = await searchImages(searchVal)
            setSearchData(res)
            setIsLoading(false)
        }

        search()
    }, [searchVal])

    useEffect(() => {
        if (!interVar) {
            setSearchVaL("")
            handleParams("", "query")
            return
        }
        const id = setTimeout(() => {
            setSearchVaL(interVar)

        }, 500);
        return () => clearTimeout(id)
    }, [interVar])


    const hasPeople = searchData?.peopleData?.length > 0
    const hasLocation = searchData?.LocationData?.[0]?.Location?.length > 0
    const hasDescriptions = searchData?.DesData?.length > 0

    const hasAnyResults = hasPeople || hasLocation || hasDescriptions

    return (
        <div
            className={`p-2 ${searchVal ? "rounded-xl border bg-card text-card-foreground shadow" : ""
                } sticky top-4 ml-auto  z-50`}
        >

            <div className="relative ml-auto flex gap-4 md:grow-0">

        
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                <Input
                    onChange={(e) => {
                        setInterVar(e.target.value)
                    }}
                    value={interVar}
                    type="search"
                    data-tour="SearchBar"
                    placeholder="Search..."
                    className="w-full pl-8 md:w-[200px] lg:w-[320px]   border rounded-md bg-muted text-muted-foreground outline-none"
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full shrink-0"
                        >
                            <Image
                            data-tour="UserAvatar"
                                src={profileImage}
                                width={36}
                                height={36}
                                alt="Avatar"
                                className="overflow-hidden rounded-full"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link href="/services/settings">Settings</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/services/settings/themes">Themes</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <form
                            className="p-0 m-0"
                            action={async () => {
                                await logOutUser()
                                router.push("/login")
                            }}
                        >
                            <button type="submit">
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </button>
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {["name", "cod"].map((key) => {
                const value = searchParams.get(key)
                return (
                    value && (
                        <Badge
                            key={key}
                            variant="outline"
                            className="flex items-center mt-1 bg-background w-fit gap-1 pr-1"
                        >
                            <span className="capitalize">{key}: {value}</span>
                            <button
                                onClick={() => {
                                    const newParams = new URLSearchParams(searchParams.toString())

                                    newParams.delete(key)
                                    if (key === "name") newParams.delete("frId")

                                    router.replace(`${pathName}?${newParams.toString()}`, {
                                        scroll: false,
                                    })
                                }}
                                className="ml-1 hover:text-red-500"
                            >
                                <X className="h-3 w-3" />
                            </button>

                        </Badge>
                    )
                )
            })}
            {searchVal && (
                <>
                    {isLoading ? (
                        <SearchLoader />
                    ) : hasAnyResults ? (
                        <div className="gap-2 h-[85%] my-2 grid grid-rows-auto">
                            {hasPeople && (
                                <Card className="p-2">
                                    <CardTitle className="my-2">People</CardTitle>
                                    <div className="grid grid-cols-3 gap-2 ">
                                        {searchData.peopleData.map((item, i) => (
                                            <Badge
                                                key={i}
                                                onClick={() => {
                                                    if (pathName !== "/services") {
                                                        router.push("/services")
                                                    }
                                                    handleMultipleParams({
                                                        frId: item._id,
                                                        name: item.label,
                                                    })
                                                }}
                                            >
                                                {item.label}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>
                            )}

                            {hasLocation && (
                                <Card className="p-2">
                                    <CardTitle className="my-2">Location</CardTitle>
                                    <div className="flex gap-2 ">
                                        {searchData.LocationData[0].Location.map((item, i) => (
                                            <Badge
                                                key={i}
                                                onClick={() => {
                                                    if (pathName !== "/services") {
                                                        router.push("/services")
                                                    }
                                                    handleParams(item, "cod")
                                                }}
                                            >
                                                {item.split(",")[0]}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>
                            )}

                            {hasDescriptions && (
                                <ScrollArea className="border bg-card max-h-72 w-full p-2">
                                    {searchData.DesData.map((item, i) => (
                                        <div
                                            key={i}
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setModelType(2)
                                                setIsImageOpen(true)
                                                setModelImages(item)
                                            }}
                                        >
                                            <Alert className="my-1">
                                                <div className="flex gap-4 items-center">
                                                    <ImageIcon className="h-4 w-4" />
                                                    <div className="flex-grow">
                                                        <AlertTitle>{item.Date.split("T")[0]}</AlertTitle>
                                                        <AlertDescription>{item.Description}</AlertDescription>
                                                    </div>
                                                    <div className="ml-auto shrink-0">
                                                        <Image
                                                            src={item.ImageUrl}
                                                            alt="Thumbnail"
                                                            width={36}
                                                            height={24}
                                                            className="rounded-sm object-cover"
                                                            blurDataURL={item.blurredImage}
                                                            loading="lazy"
                                                            quality={10}
                                                        />
                                                    </div>
                                                </div>
                                            </Alert>
                                            <Separator />
                                        </div>
                                    ))}
                                </ScrollArea>
                            )}
                        </div>
                    ) : (
                        <Card className="p-2 my-2">
                            <CardTitle className="my-2">Ohh snap !</CardTitle>
                            <CardDescription>No results found</CardDescription>
                        </Card>
                    )}
                </>
            )}

        </div>
    );
};

export default MainSearchBar;


