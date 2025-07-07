"use client";

import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [bgColor, setBgColor] = useState(false);
  const [navMobile, setNavMobile] = useState(false);
  const listenScrollEvent = (e: Event) => {
    const window = e.currentTarget as Window;
    if (window.scrollY > 10) {
      setBgColor(true);
    } else setBgColor(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, []);
  // const [scrollTo, setScrollTo] = useState();
  return (
    <nav
      className={`${
        bgColor ? " bg-opacity-90 dark:bg-neutral-800 dark:bg-opacity-80" : ""
      } ease-out duration-300 fixed inset-x-0 w-screen h-16 flex flex-row text-center sm:flex-row sm:text-left justify-between items-center z-40 pr-2 sm:pr-10 font-mono backdrop-blur-sm`}
    >
      <div className="flex">
        <div className=" px-10 h-full ">
          <Link className=" font-bold text-4xl" href="/">
            {bgColor ? "AidilDev" : ""}
          </Link>
        </div>
      </div>
      <div className="md:hidden" onClick={() => setNavMobile(true)}>
        <FontAwesomeIcon icon={faBars} size="xl" className="pr-8" />
      </div>
      <div className="flex content-center h-full max-md:hidden">
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
            href="#contact-me"
            className={`${
              bgColor ? " hover:bg-white " : ""
            }px-5 hover:bg-black dark:hover:bg-white w-32 align-middle text-center  ease-in duration-200 h-16 table-cell`}
          >
            Contact Me
          </Link>
        </p>
      </div>
      <div
        className={`${
          navMobile ? "left-0" : " left-full"
        } top-0  grid-cols-1 fixed  bg-neutral-900 h-screen grid items-center w-screen bg-opacity-95 transition-all duration-300 ease-in`}
      >
        <div
          className="absolute right-2 top-5 text-1xl"
          onClick={() => setNavMobile(false)}
        >
          <FontAwesomeIcon icon={faXmark} size="2xl" className="pr-8" />
        </div>
        <div className="text-1xl">
          <p
            className={`${
              bgColor
                ? " hover:text-black "
                : " hover:text-white dark:hover:text-black "
            } `}
          >
            <Link
              href="#about-me"
              className={`${
                bgColor ? " hover:bg-white " : ""
              }px-5 hover:bg-black dark:hover:bg-white align-middle text-center ease-in duration-200 h-16 table-cell w-screen`}
              onClick={() => setNavMobile(false)}
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
              }px-5 hover:bg-black dark:hover:bg-white align-middle text-center  ease-in duration-200 h-16 table-cell w-screen`}
              onClick={() => setNavMobile(false)}
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
              href="#contact-me"
              className={`${
                bgColor ? " hover:bg-white " : ""
              }px-5 hover:bg-black dark:hover:bg-white align-middle text-center  ease-in duration-200 h-16 table-cell w-screen`}
              onClick={() => setNavMobile(false)}
            >
              Contact Me
            </Link>
          </p>
        </div>
      </div>
    </nav>
  );
}
