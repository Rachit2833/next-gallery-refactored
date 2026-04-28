"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { saveAs } from "file-saver";
import { Download, ListFilter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "../_lib/context";
import DrawerClick from "./DrawerClick";
import Filter from "./Filter";
import RefreshButton from "./RefreshButton";
import ModesButton from "./ModesButton";

function SideFilterLayout({ datatour, year, text, formType }) {
  const router = useRouter();
  const { toast } = useToast();
  const { selectedImages, isDark, setIsDark, } = useUser();
  const searchParams = useSearchParams();
  const pathname = usePathname();


  function handleSortChange(value) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.replace(`${pathname}?${params.toString()}`);
  }

  const currentYear = new Date().getFullYear();

  const filterArray = [
    { label: "All", value: "All" },
    ...Array.from({ length: 3 }, (_, i) => {
      const year = currentYear - i;
      return { label: String(year), value: year };
    }),
  ];

  const handleDownload = async () => {
    if (selectedImages.length === 0) {
      toast({
        title: "No Images Selected",
        description: "Please select Images to Download",
      });
      return;
    }


    toast({
      title: "Downloading images",
      description: `${selectedImages.length} downloads started`,
    });

    selectedImages.forEach((item) => {
      try {
        saveAs(item?.url, Date.now().toString());
      } catch (error) {
        toast({
          title: "Download failed",
          description: "There was an error starting your download.",
        });
      }
    });
  };

  return (
    <div className=" sm:flex  items-center">
      {pathname !== "/services/memory-map" && pathname !== "/services/post" && pathname !== "/services/people" && (
        <>

          <Filter
            paramName="year"
            values={filterArray}
            defaultValue="All"
            year={year}
          />
          <div className="ml-auto flex mt-6 sm:mt-0 justify-evenly  sm:items-center gap-2">
            {/* Dark/Light Mode Toggle */}
            <div className="block md:hidden" >
              <ModesButton isDark={isDark} setIsDark={setIsDark} />
            </div>

            <RefreshButton />

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button  size="sm" className="h-7 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup
                  value={searchParams.get("sort") ?? "-_id"}
                  onValueChange={handleSortChange}
                >
                  <DropdownMenuRadioItem value="_id">
                    Oldest to Newest
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="-_id">
                    Newest to Oldest
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>

              </DropdownMenuContent>
            </DropdownMenu>

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              size="sm"
              variant="outline"
              disabled={selectedImages.length === 0}
              className={`
    h-7 gap-1
    ${selectedImages.length === 0
                  ? "  h-7 gap-1 disabled:border-2 disabled:border-dotted disabled:border-primary"
                  : ""}
  `}
            >

              <Download className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Download
              </span>
            </Button>

            {/* Add Form Button */}
            {!pathname.startsWith('/albums/') && <DrawerClick datatour={datatour} name={text} formType={formType} />}

          </div>
        </>
      )}
    </div>
  );
}

export default SideFilterLayout;
