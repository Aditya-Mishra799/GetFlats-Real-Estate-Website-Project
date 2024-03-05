import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuButton = ({ name, link, dropdown, hidden, icon, active, clickHandler }) => {
  const pathname = usePathname();
  const index = dropdown?.findIndex(
    (menuButton) => menuButton.link === pathname
  );
  const [isHovering, setIsHovering] = useState(false)
  if (hidden) return null;
  return (
    <li
      className={`flex ${
        active && "bg-active-orange"
      } px-4 py-2 font-medium rounded-md text-orange-50 hover:${
        active ? "bg-active-orange" : "bg-dark-orange"
      } hover:text-white cursor-pointer relative w-full transition-all`}
      onClick={clickHandler}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link href={link} className="w-full">
       <pre className="inline-flex items-center font-sans">{name }{(dropdown ?<pre> &#x2193;</pre>: '')}</pre> 
        {dropdown && (
          <div className={"lg:absolute w-full lg:w-48 bg-white rounded-md shadow-md mt-2 p-2 right-0  border border-orange-300  flex-col " + (isHovering ? "flex" : "hidden")}>
            <ul className="space-y-2">
              {dropdown.map((dropdownOption, i) => (
                <li
                  key={dropdownOption.name}
                  className={
                    `flex p-1 font-medium  rounded-md ${
                      index !== i &&
                      "hover:bg-orange-100 hover:text-active-orange"
                    } transition-all ` +
                    (index === i
                      ? "bg-active-orange text-white"
                      : "text-active-orange")
                  }
                >
                  <Link href={dropdownOption.link} className="w-full">
                    {dropdownOption.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Link>
    </li>
  );
};

export default MenuButton;
