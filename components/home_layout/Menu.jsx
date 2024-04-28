"use-client";
import React, { useState, useEffect } from "react";
import MenuButton from "./MenuButton";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Menu = ({ menuOpen, setMenuOpen }) => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  // set providers
  useEffect(() => {
    const setUpProviders = async () => {
      const result = await getProviders();
      setProviders(result);
    };
    setUpProviders();
  }, []);
  const menuButtons = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Login/Sign Up",
      link: "/auth",
      hidden: session,
    },
    {
      name: "Profile",
      link: "/profile",
      hidden: !session,
      dropdown: [
        {
          name: "Add Listing",
          link: "/profile/add-listing",
        },
        {
          name: "Logout",
          link: "/logout",
          hidden: !session,
        },
      ],
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
   

    {
      name: "Search",
      link: "/search?page=1&query={}",
    },
    {
      name: "Map Search",
      link: "/map-search",
    },
  ];
  const pathname = usePathname().split("/")[1];
  const index = menuButtons.findIndex(
    (menuButton) => menuButton.link.split("/")[1] === pathname
  );
  const [active, setActive] = useState(index);
  return (
    <div
      className={
        " lg:w-auto w-full mt-2 lg:mt-0  h-full transition-all duration-500 " +
        (!menuOpen ? "hidden lg:inline-flex" : "inline-flex")
      }
    >
      <ul className="flex flex-col lg:flex-row space-y-2 w-full lg:space-x-2 lg:space-y-0  lg:w-auto">
        {menuButtons.map((button, index) => {
          return (
            <MenuButton
              {...button}
              key={button.name}
              active={active === index}
              clickHandler={() => {
                setActive(index);
                setMenuOpen(false)
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
