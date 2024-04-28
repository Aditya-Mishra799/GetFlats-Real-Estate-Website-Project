import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";

const MenuButton = ({
  name,
  link,
  dropdown,
  hidden,
  icon,
  active,
  clickHandler,
}) => {
  if (hidden) return null;
  const pathname = usePathname();
  const index = dropdown?.findIndex(
    (menuButton) => menuButton.link === pathname
  );
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const dropDownComp = dropdown && (
    <div
      className={
        "lg:absolute w-full lg:w-48 bg-white rounded-md shadow-md mt-2 p-2 right-0  border border-orange-300  flex-col " +
        ((isClicked) ? "flex" : "hidden")
      }
    >
      <ul className="space-y-2">
        {dropdown.map((dropdownOption, i) => (
          <li
            key={dropdownOption.name}
            className={
              `flex p-1 font-medium  rounded-md ${
                index !== i && "hover:bg-orange-100 hover:text-active-orange"
              } transition-all ` +
              (index === i
                ? "bg-active-orange text-white"
                : "text-active-orange")
            }
          >
            <Link href={dropdownOption.link} className="w-full"   onClick={clickHandler}>
              {dropdownOption.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <li
      className={`flex ${
        active && "bg-active-orange"
      } px-4 py-2 font-medium rounded-md text-orange-50 hover:${
        active ? "bg-active-orange" : "bg-dark-orange"
      } hover:text-white  relative w-full transition-all hover:bg-dark-orange`}
    >
      {dropdown ? (
        <div className="w-full">
          <div
            className="flex items-center font-sans gap-3"
          >
            {dropdown ?  <FaChevronRight
            size= {20} 
            className = {`cursor-pointer ${isClicked && "rotate-90"} transition-transform duration-300`}
            onClick={()=>setIsClicked(!isClicked)}
            /> : <></>}
            <Link href={link}  onClick={clickHandler}>{name}</Link>
          </div>
          {dropDownComp}
        </div>
      ) : (
        <Link href={link} className="w-full" onClick={clickHandler} >
          <pre className="inline-flex items-center font-sans">{name}</pre>
        </Link>
      )}
    </li>
  );
};

export default MenuButton;
