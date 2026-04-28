'use client'
import { useUser } from "@/app/_lib/context"
import Messages from "./Messages"

function IoMessages() {
   const { messages ,user } = useUser();


   return (
      [...messages].reverse().map((message, index) => (
         <Messages key={index} message={message} />
      ))
   );
}

export default IoMessages;
