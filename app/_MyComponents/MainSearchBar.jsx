"use client"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
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
import { logOutUser } from "../_lib/actions"
import SearchLoader from "./Loaders/SearchLoader"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useUser } from "../_lib/context"
import React, { useState } from "react";


const MainSearchBar = ({ profileImage }) => {
    const { searchVal, setSearchVaL, isDark, setIsDark, searchData, setSearchData, queryState, modelImages, setModelImages, setIsImageOpen, setModelType, } = useUser()
    const [isLoading, setIsLoading] = useState(false)
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathArray = pathName.split("/")
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

    return (
        <div
            className={`p-2 ${searchVal ? "rounded-xl border bg-card text-card-foreground shadow" : ""
                } top-1 absolute right-6 z-50`}
        >

            <div className="relative ml-auto flex gap-4 md:grow-0">


                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                <Input
                    onChange={(e) => {
                        setSearchVaL(e.target.value)
                        handleParams(e.target.value, "query")
                    }}
                    value={searchVal || queryState || ""}
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                        >
                            <Image
                                src={profileImage}/////h
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
                        <DropdownMenuItem><Link href="/settings">Settings</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/settings/themes">Themes</Link></DropdownMenuItem>
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
                                onClick={() => removeParam(key)}
                                className="ml-1 hover:text-red-500"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )
                )
            })}
            {isLoading && searchVal ? (
                <SearchLoader />
            ) : (
                <div
                    className={`${searchVal ? "" : "hidden"
                        } gap-2 h-[85%]  my-2 grid grid-rows-auto`}
                >
                    {searchData?.peopleData?.length !== 0 ? (
                        <Card className="p-2">
                            <CardTitle className="my-2">People</CardTitle>
                            <div className="flex gap-2">
                                {searchData?.peopleData?.map((item, i) => (
                                    <Badge
                                        key={i}
                                        onClick={() => {
                                            if (pathName !== "/") {
                                                router.push("/")
                                            }
                                            setSearchVaL(item.label)
                                            handleParamsObj({ name: item.label, frId: item._id })
                                        }}
                                    >
                                        {item.label}
                                    </Badge>
                                ))}
                            </div>
                        </Card>
                    ) : null}
                    {searchData?.LocationData?.length !== 0 ? (
                        <Card className="p-2">
                            <CardTitle className="my-2">Location</CardTitle>
                            <div className="flex gap-2">
                                {searchData?.LocationData[0]?.Location?.map((item, i) => (
                                    <Badge
                                        key={i}
                                        onClick={() => {
                                            if (pathName !== "/") {
                                                router.push("/")
                                            }
                                            setSearchVaL(item)
                                            handleParams(item, "cod")
                                        }}
                                    >
                                        {item.split(",")[0]}
                                    </Badge>
                                ))}
                            </div>
                        </Card>
                    ) : null}
                    {searchData?.DesData?.length !== 0 ? (
                        <ScrollArea className="border bg-card max-h-72 w-full p-2">
                            {searchData?.DesData?.map((item, i) => {
                                return <div onClick={() => {
                                    setModelType(2)
                                    setIsImageOpen(true)
                                    setModelImages(item)
                                }} className=" cursor-pointer" key={i}>
                                    <Alert className="my-1">
                                        <div className="flex gap-4 items-center">
                                            <ImageIcon className="h-4 w-4" />
                                            <div className="flex-grow">
                                                <AlertTitle>{item.Date.split("T")[0]}</AlertTitle>
                                                <AlertDescription>{item.Description}</AlertDescription>
                                            </div>
                                            <div className="ml-auto shrink-0">
                                                <Image
                                                    src={item?.ImageUrl}
                                                    alt="Thumbnail"
                                                    width={36}
                                                    height={24}
                                                    className="rounded-sm object-cover"
                                                    blurDataURL={item?.blurredImage}
                                                    loading="lazy"
                                                    quality={10}
                                                />
                                            </div>
                                        </div>
                                    </Alert>
                                    <Separator />
                                </div>

                            })}
                        </ScrollArea>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default MainSearchBar;