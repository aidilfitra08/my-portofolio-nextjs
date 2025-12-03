"use client";

import { faBars, faXmark, faTerminal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navMobile, setNavMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const listenScrollEvent = (e: Event) => {
    const window = e.currentTarget as Window;
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  const navItems = [
    { href: "#about-me", label: "About" },
    { href: "#skill", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "/playground", label: "Playground" },
    { href: "#contact-me", label: "Contact" },
  ];

  return (
    <nav
      className={`${
        isScrolled
          ? "bg-[#f5f1e8] dark:bg-[#0d0d0d] shadow-lg border-b-2 border-accent-green border-opacity-30"
          : "bg-transparent"
      } fixed inset-x-0 top-0 w-full h-16 md:h-20 flex items-center justify-between z-50 px-4 md:px-8 lg:px-12 transition-all duration-300 font-mono backdrop-blur-md`}
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-3">
        <div
          className={`${
            isScrolled ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <FontAwesomeIcon
            icon={faTerminal}
            className="text-accent-green text-xl"
          />
        </div>
        <Link href="/" className="font-bold text-2xl md:text-3xl group">
          <span className="text-[#2a2a2a] dark:text-[#e0e0e0]">Aidil</span>
          <span className="text-accent-green terminal-glow group-hover:text-[#00d9ff] transition-colors">
            Dev
          </span>
          <span className="text-[#ff6b6b] animate-pulse">_</span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setNavMobile(true)}
        className="md:hidden text-[#2a2a2a] dark:text-accent-green hover:text-accent-green dark:hover:text-[#00d9ff] transition-colors p-2"
        aria-label="Open menu"
      >
        <FontAwesomeIcon icon={faBars} size="xl" />
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2 lg:gap-4">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            prefetch={item.href === "/playground"}
            className="group relative px-4 lg:px-6 py-2 text-sm lg:text-base font-semibold text-[#2a2a2a] dark:text-[#c0c0c0] hover:text-accent-green dark:hover:text-accent-green transition-all duration-300"
          >
            {/* Terminal-style bracket decoration */}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ff6b6b]">
              [
            </span>
            <span className="mx-1">{item.label}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ff6b6b]">
              ]
            </span>

            {/* Underline effect */}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-green group-hover:w-full transition-all duration-300"></span>
          </Link>
        ))}
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`${
          navMobile ? "left-0" : "left-full"
        } fixed top-0 h-screen w-screen bg-[#0d0d0d] bg-opacity-98 backdrop-blur-lg transition-all duration-300 ease-in-out md:hidden z-50`}
      >
        {/* Close Button */}
        <button
          onClick={() => setNavMobile(false)}
          className="absolute right-6 top-6 text-accent-green hover:text-[#ff6b6b] transition-colors p-2"
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faXmark} size="2xl" />
        </button>

        {/* Mobile Menu Header */}
        <div className="px-8 py-6 border-b border-accent-green border-opacity-30">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faTerminal}
              className="text-accent-green text-2xl"
            />
            <span className="text-2xl font-bold">
              <span className="text-[#e0e0e0]">Aidil</span>
              <span className="text-accent-green terminal-glow">Dev</span>
            </span>
          </div>
          <p className="text-sm text-[#a0a0a0] mt-2 font-mono">
            <span className="text-[#ff6b6b]">$</span> navigate --menu
          </p>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex flex-col items-start justify-center h-[calc(100vh-120px)] px-8 space-y-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              prefetch={item.href === "/playground"}
              onClick={() => setNavMobile(false)}
              className="group w-full text-left text-2xl font-bold text-[#c0c0c0] hover:text-accent-green transition-all duration-300 hover:translate-x-4"
            >
              <span className="text-[#ff6b6b] opacity-0 group-hover:opacity-100 transition-opacity mr-2">
                ►
              </span>
              <span className="text-[#ffb000] mr-2">0{index + 1}.</span>
              {item.label}
              <span className="text-accent-green opacity-0 group-hover:opacity-100 transition-opacity ml-2 animate-pulse">
                _
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Footer */}
        <div className="absolute bottom-8 left-8 right-8 border-t border-accent-green border-opacity-30 pt-4">
          <p className="text-xs text-[#606060] font-mono">
            <span className="text-accent-green">status:</span> ready to
            collaborate
          </p>
        </div>
      </div>
    </nav>
  );
}
