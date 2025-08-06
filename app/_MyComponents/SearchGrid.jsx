'use client'
import { useUser } from "../_lib/context"
import ImageCard from "./ImageCard"

function SearchGrid({optimisticImages}) {

   return (
      optimisticImages?.map((item, index) => (
         <ImageCard key={index} image={item} />
      ))
   )
}

export default SearchGrid
