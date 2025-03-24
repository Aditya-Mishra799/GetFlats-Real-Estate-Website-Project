"use-client";
import React, { useState, useEffect } from "react";
import MenuButton from "./MenuButton";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const Menu = ({ menuOpen, setMenuOpen }) => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

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
      icon: "fa-solid fa-home",
    },
    {
      name: "Login/Sign Up",
      link: "/auth",
      hidden: session,
      icon: "fa-solid fa-right-to-bracket",
    },
    {
      name: "Profile",
      link: "/profile",
      hidden: !session,
      icon: "fa-solid fa-user",
      dropdown: [
        {
          name: "Add Listing",
          link: "/profile/add-listing",
          icon: "fa-solid fa-plus",
        },
        {
          name: "Logout",
          link: "/logout",
          hidden: !session,
          icon: "fa-solid fa-sign-out-alt",
        },
      ],
    },
    {
      name: "About",
      link: "/about",
      icon: "fa-solid fa-info-circle",
    },
    {
      name: "Contact",
      link: "/contact",
      icon: "fa-solid fa-envelope",
    },
    {
      name: "Search",
      link: "/search?page=1&query={}",
      icon: "fa-solid fa-search",
    },
    {
      name: "Map Search",
      link: "/map-search",
      icon: "fa-solid fa-map-location-dot",
    },
  ];

  const pathname = usePathname().split("/")[1];
  const index = menuButtons.findIndex(
    (menuButton) => menuButton.link.split("/")[1] === pathname
  );
  const [active, setActive] = useState(index);

  return (
    <AnimatePresence>
      {(
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className={
            "lg:w-auto w-full mt-2 lg:mt-0 h-full transition-all duration-500 " +
            (!menuOpen ? "hidden lg:inline-flex" : "inline-flex")
          }
        >
          <ul className="flex flex-col lg:flex-row w-full lg:w-auto space-y-1 lg:space-y-0 lg:space-x-1">
            {menuButtons.map((button, index) => (
              <MenuButton
                {...button}
                key={button.name}
                active={active === index}
                clickHandler={() => {
                  setActive(index);
                  setMenuOpen(false);
                }}
              />
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;