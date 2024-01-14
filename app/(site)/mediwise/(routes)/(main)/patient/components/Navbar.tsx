"use client";
import UserMenu from "@/components/UserMenu";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

type NavbarProps = {
  currentUser: Session["user"] | null;
};

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const routes = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Appointments",
      href: "/appointments",
    },
    {
      label: "Announcement",
      href: "/events",
    },
    {
      label: "Doctors",
      href: "/doctors",
    },
    {
      label: "Prescriptions",
      href: "/prescriptions",
    },
  ];
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 px-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <img
          src="/images/bhaLogo.png"
          className="w-20 h-20 object-contain"
          alt="Flowbite Logo"
        />
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <UserMenu currentUser={currentUser} />
          {/* Dropdown menu  */}
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              {routes.map((route) => (
                <li key={route.label}>
                  <Link
                    href={`/mediwise/${currentUser?.role.toLowerCase()}${
                      route.href
                    }`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {routes.map((route) => (
              <li key={route.label}>
                <Link
                  href={`/mediwise/${currentUser?.role.toLowerCase()}${
                    route.href
                  }`}
                  className="block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 md:dark:text-green-500"
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
