"use client";
// React
import { useEffect, useRef, useState } from "react";
// Next
import TradingViewWidget from "@/_components/organisms/TradingView";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Components

// Image
import Logo from "@/_assets/images/logo-full.png";
//

export const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);
  //
  const toggleMenu = () => {
    setMenu(!menu);
  };
  const toggleDropdown = () => {
    setDropDown(!dropdown);
  };
  const closeDropdown = () => {
    setDropDown(false);
  };

  //
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (dropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdown]);

  const pathname = usePathname();

  return (
    <div className="container">
      <div className="navbar-wrapper">
        <TradingViewWidget />
        <nav className="navbar">
          <a href="/">
            <Image width="" height="" src={Logo} alt="Logo" />
          </a>
          <div className="navbar-menu lg:hidden">
            <svg onClick={toggleMenu}>
              {/* <use href={`/images/sprite.svg#icon-menu`} /> */}
              <use
                href={
                  menu
                    ? "/images/sprite.svg#icon-close"
                    : "/images/sprite.svg#icon-menu"
                }
              />
            </svg>
          </div>
          <ul
            className={
              menu
                ? `flex bg-[#ffffff] h-auto absolute top-[9.6rem] left-0 py-[1.6rem] flex-col w-[100%] rounded-[.4rem] z-10`
                : `hidden lg:flex`
            }
          >
            <li>
              <a
                className={
                  pathname === "/"
                    ? "text-[#009F0B] font-semibold"
                    : "text-black font-normal"
                }
                href="/"
              >
                Home
              </a>
            </li>
            <li
              aria-label="dropdown"
              onClick={toggleDropdown}
              ref={dropdownRef}
            >
              <span
                className={
                  pathname === "/about" || pathname === "/team"
                    ? "text-[#009F0B] font-semibold"
                    : "text-black font-normal"
                }
              >
                {" "}
                Company
              </span>
              <hr className={dropdown ? `block` : "hidden"} />
              <svg>
                <use href={`/images/sprite.svg#icon-caret`} />
              </svg>
              <ul className={dropdown ? `block` : `hidden`}>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/team">The Team</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                className={
                  pathname === "/training"
                    ? "text-[#009F0B] font-semibold"
                    : "text-black font-normal"
                }
                href="/training"
              >
                Training
              </Link>
            </li>
            <li>
              <Link
                className={
                  pathname === "/contact"
                    ? "text-[#009F0B] font-semibold"
                    : "text-black font-normal"
                }
                href="/contact"
              >
                Get In Touch
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
