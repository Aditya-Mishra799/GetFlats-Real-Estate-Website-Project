'use client'
import React from "react";
import { SiDependabot } from "react-icons/si";
import { usePathname } from 'next/navigation'
import Chatbot from "./Chatbot";
const ChatBotFAB = () => {  
  const pathname = usePathname()
  if(pathname === '/map-search') return <></>
  return (
    <div className=" fixed top-16 left-0 z-50">
    <Chatbot />
    </div>
  );
};

export default ChatBotFAB;
