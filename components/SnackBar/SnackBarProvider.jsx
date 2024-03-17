"use client";
import SnackBarContext from "./SnackBarService";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { IoAlertCircle } from "react-icons/io5";
import { FiZap } from "react-icons/fi";
import Link from "next/link";

export default function SnackBarProvider({ children }) {
  const [snackBars, setSnackBars] = useState([]);
  const close = (id) =>
    setSnackBars((snackBars) =>
      snackBars.filter((snackBar) => snackBar.id !== id)
    );
  const open = (type, component, timeout = 5000) => {
    const id = Date.now();
    if (type === "custom") {
      setSnackBars((snackBars) => [...snackBars, { id, component }]);
    } else {
      const builtInComponent = defaultSnackBarComponents(
        type,
        component?.message,
        component?.link,
        component?.label,
      );
      console.log(builtInComponent);
      setSnackBars((snackBars) => [
        ...snackBars,
        { id, component: builtInComponent },
      ]);
    }
    if (timeout !== Infinity) {
      setTimeout(() => close(id), timeout);
    }
    return id;
  };
  const defaultLabels = {
    success: 'Success',
    loading: 'Loading...',
    alert: 'Action Failed',
  }
  const defaultSnackBarComponents = (type, message, link, label = defaultLabels[type]) => {
    console.log(type, message);
    switch (type) {
      case "success":
        return (
          <div className="flex gap-2 bg-green-300 text-green-800 p-4 rounded-lg shadow-lg w-full">
            <FiZap size={40} />
            <div>
              <h3 className="font-bold">{label}</h3>
              <div className="flex gap-1 w-full items-center">
                <p className="text-sm">{message}</p>
                {link && link?.href && link?.label && (
                  <Link
                    href={link?.href}
                    className="font-bold text-xs underline"
                  >
                    {link?.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      case "loading":
        return (
          <div className="flex gap-2 bg-highlight-orange text-dark-orange p-4 rounded-lg shadow-lg w-full">
            <div className="loading-circle-container">
              <div className="loading-circle"></div>
            </div>
            <div>
              <h3 className="font-bold">{label}</h3>
              <div className="flex gap-1 w-full items-center">
                <p className="text-sm">{message}</p>
                {link && link?.href && link?.label && (
                  <Link
                    href={link?.href}
                    className="font-bold text-xs underline"
                  >
                    {link?.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      case "alert":
        return (
          <div className="flex gap-2 bg-red-300 text-red-800 p-4 rounded-lg shadow-lg w-full">
            <IoAlertCircle size={40} />
            <div>
              <h3 className="font-bold">{label}</h3>
              <div className="flex gap-1 w-full items-center">
                <p className="text-sm">{message}</p>
                {link && link?.href && link?.label && (
                  <Link
                    href={link?.href}
                    className="font-bold text-xs underline"
                  >
                    {link?.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
    }
  };
  return (
    <SnackBarContext.Provider value={{ open, close }}>
      {children}
      <div className="space-y-2 absolute bottom-4 right-4 z-50  w-xs md:w-96">
        {snackBars.map(({ id, component }) => (
          <div key={id} className="relative flex gap-1 w-full">
            <button
              onClick={() => close(id)}
              className="cursor-pointer absolute top-2 right-2 p-1 rounded-lg bg-gray-200/20 text-gray-800/60 "
            >
              <RxCross1 size={16} />
            </button>
            {component}
          </div>
        ))}
      </div>
    </SnackBarContext.Provider>
  );
}
