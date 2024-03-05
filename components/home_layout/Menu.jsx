"use-client";
import React, { useState, useEffect } from "react";
import MenuButton from "./MenuButton";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Menu = ({ menuOpen }) => {
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
          name: "Your listings",
          link: "/profile/listings",
        },
        {
          name: "Enquiries",
          link: "/profile/enquiries",
        },
        {
          name: "Wishlist",
          link: "/profile/wishlist",
        },
        {
          name: "Add Listing",
          link: "/profile/add-listing",
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
      name: "Blog",
      link: "/blog",
    },
    {
      name: "Logout",
      link: "/logout",
      hidden: !session,
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
        " lg:w-auto w-full mt-2 lg:mt-0 " +
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
              clickHandler={() => setActive(index)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
