'use client';
import { useUser } from "@/app/_lib/context";
import { useEffect } from "react";
import { io } from "socket.io-client";
function SocketWrapper({ joinedGroup}) {
   const currentUserId = user._id
   const { setSocket, setActiveUser, setMessages,user }= useUser()


   useEffect(() => {

      const socket = io("process.env.NEXT_PUBLIC_API_URL", { query: { userId: currentUserId } });
      setSocket(socket);

      socket.on("connect", () => console.log("Connected with socket id:", socket.id));
      socket.on("onlineUsers", (mess) => setActiveUser(mess));
      socket.on("disconnect", () => console.log("Disconnected"));
      socket.on("newIoMessage", (message) => setMessages((prev) => [...prev, message]));
      socket.emit('joinGroups', joinedGroup)
      socket.on("groupMessage", (message) => {
         setMessages((prev) => [...prev, message])
      });
      return () => socket.disconnect();
   }, []);
   return (
      <>
      </>
   )
}

export default SocketWrapper
