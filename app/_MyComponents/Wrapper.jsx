"use client"
import MainSlide from "./MainSlide"
import SideFilterLayout from "./SideFilterLayout"
import { useUser } from "../_lib/context"
import { useEffect, useState } from "react"

function Wrapper({alc, card, params }) {
   const [val, setVal] = useState(null);
   const { setUserId ,user } = useUser()

   useEffect(() => {
      const storedVal = user?._id;

      if (storedVal) {

         setVal(storedVal);
         setUserId(storedVal);
      }
   }, [setUserId]);

   return (
      <>
 
         <MainSlide params={params} val={val} albumComponent={alc||<></>} card={card} />
      </>
   )
}

export default Wrapper