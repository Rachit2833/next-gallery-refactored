import PasteCards from "@/app/_Components/Albums/PasteCards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Download,
  Heart,
  ListFilter,
  Share2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import DrawerClick from "@/app/_Components/DrawerClick";
import { TabsContent } from "@radix-ui/react-tabs";

function page() {
   return (
     <>
       {" "}
       <div className="flex items-center">
         <TabsList>
           <TabsTrigger value="all">All</TabsTrigger>
           <TabsTrigger value="active">2024</TabsTrigger>
           <TabsTrigger value="draft">2023</TabsTrigger>
           <TabsTrigger value="archived" className="hidden sm:flex">
             2022
           </TabsTrigger>
         </TabsList>
         <div className="ml-auto flex items-center gap-2">
           <DropdownMenu>
             <DropdownMenuTrigger asChild>
               <Button variant="outline" size="sm" className="h-7 gap-1">
                 <ListFilter className="h-3.5 w-3.5" />
                 <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                   Filter
                 </span>
               </Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent align="end">
               <DropdownMenuLabel>Filter by</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuCheckboxItem checked>
                 Oldest to Newest
               </DropdownMenuCheckboxItem>
               <DropdownMenuCheckboxItem>
                 {" "}
                 Newest to Oldest
               </DropdownMenuCheckboxItem>
             </DropdownMenuContent>
           </DropdownMenu>
    
           <DrawerClick />
         </div>
       </div>
       <TabsContent value="all">
         <Card x-chunk="dashboard-06-chunk-0">
           <CardHeader>
             <CardTitle>Your Saved Images From Album August 2024</CardTitle>
             <CardDescription>
               Paste your Copied Images Here Or Directly Add Images
             </CardDescription>
           </CardHeader>
           <CardContent>
             <PasteCards />
           </CardContent>
         </Card>
       </TabsContent>
     </>
   );
}

export default page
