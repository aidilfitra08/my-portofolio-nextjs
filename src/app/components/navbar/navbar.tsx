"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [bgColor, setBgColor] = useState(false);
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setBgColor(true) : setBgColor(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, []);
  // const [scrollTo, setScrollTo] = useState();
  return (
    <nav
      className={`${
        bgColor
          ? " bg-black bg-opacity-90 text-white dark:bg-neutral-800 dark:bg-opacity-90"
          : ""
      } ease-out duration-300 fixed inset-x-0 w-screen h-16 flex flex-row text-center sm:flex-row sm:text-left justify-between items-center z-40 pr-2 sm:pr-10 font-mono`}
    >
      <div className="flex">
        <div className=" px-10 h-full ">
          <a className=" font-bold text-4xl" href="/">
            Logo
          </a>
        </div>
      </div>
      <div className="flex content-center h-full ">
        <p
          className={`${
            bgColor
              ? " hover:text-black "
              : " hover:text-white dark:hover:text-black "
          }`}
        >
          <Link
            href="#about-me"
            className={`${
              bgColor ? " hover:bg-white " : ""
            }px-5 hover:bg-black dark:hover:bg-white w-28 align-middle text-center  ease-in duration-200 h-16 table-cell`}
          >
            About me
          </Link>
        </p>
        <p
          className={`${
            bgColor
              ? " hover:text-black "
              : "hover:text-white dark:hover:text-black"
          }`}
        >
          <Link
            href="#projects"
            className={`${
              bgColor ? " hover:bg-white " : ""
            }px-5 hover:bg-black dark:hover:bg-white w-28 align-middle text-center  ease-in duration-200 h-16 table-cell`}
          >
            Projects
          </Link>
        </p>
        <p
          className={`${
            bgColor
              ? " hover:text-black "
              : "hover:text-white dark:hover:text-black"
          }`}
        >
          <Link
            href="#footer"
            className={`${
              bgColor ? " hover:bg-white " : ""
            }px-5 hover:bg-black dark:hover:bg-white w-32 align-middle text-center  ease-in duration-200 h-16 table-cell`}
          >
            Contact Me
          </Link>
        </p>
      </div>
    </nav>
  );
}
