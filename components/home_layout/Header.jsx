"use client";
import React, { useState } from "react";
import tailwindConfig from "../../tailwind.config.js";
import resolveConfig from "tailwindcss/resolveConfig";
import { IoIosMenu } from "react-icons/io";
import Menu from "./Menu.jsx";
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import Link from "next/link.js";
const fullConfig = resolveConfig(tailwindConfig);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-smooth-orange  text-white fixed top-0 left-0 right-0 z-50 ">
      <div className={"container flex mx-auto py-2 flex-wrap px-1  transition-all ease-in-out duration-300 " }>
        <Link
          href="#"
          className="inline-flex p-2 text-xl font-bold uppercase tracking-wider"
        >
          GetFlats
        </Link>
        <button
          className="lg:hidden inline-flex items-center justify-center border h-10 w-10 rounded-md text-orange-100 text-2xl cursor-pointer outline-none focus:outline-2 focus:outline-orange-200 focus:border-none transition-all ease-in-out ml-auto"
          title="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <IoIosMenu />
        </button>

        {/* Menu */}
        <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
      </div>
    </nav>
  );
};

export default Header;
