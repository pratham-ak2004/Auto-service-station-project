import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-lime-700 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-8">
          <span className="font-semibold text-xl tracking-tight">
            Auto Service Station
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 border rounded border-black text-black hover:text-white hover:border-white"
          >
            <img src="./list.svg" alt="" />
          </button>
        </div>
        <div
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto hidden`}
        >
          <div className="text-base lg:flex-grow">
            <Link
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-slate-200 hover:text-white mr-6"
              to={"/"}
            >
              Home
            </Link>
            <Link
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-slate-200 hover:text-white mr-6"
              to={"/add"}
            >
              Add
            </Link>
            <Link
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-slate-200 hover:text-white mr-6"
              to={"/view"}
            >
              View
            </Link>
            <Link
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-slate-200 hover:text-white"
              to={"/analyse"}
            >
              Analyse
            </Link>
          </div>
        </div>
      </nav>

      <div
        className={`fixed bg-lime-700 top-0 right-0 h-full w-64 z-20 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-200 ease-in-out lg:hidden ${
          isOpen ? "block" : "hidden"
        }}`}
      >
        <div className="text-base text-center justify-between">
          <div className="w-full flex flex-row-reverse mt-6">
            <img
              src="./close.svg"
              className="right-0 mr-4 size-8"
              onClick={() => setIsOpen(false)}
              alt=""
            />
          </div>
          <Link
            href="#responsive-header"
            className="block mt-8 text-slate-200 hover:text-white mr-4"
            to={"/"}
          >
            Home
          </Link>
          <Link
            href="#responsive-header"
            className="block mt-8 text-slate-200 hover:text-white mr-4"
            to={"/add"}
          >
            Add
          </Link>
          <Link
            href="#responsive-header"
            className="block mt-8 text-slate-200 hover:text-white"
            to={"/view"}
          >
            View
          </Link>
          <Link
            href="#responsive-header"
            className="block mt-8 text-slate-200 hover:text-white"
            to={"/analyse"}
          >
            Analyse
          </Link>
        </div>
      </div>
    </>
  );
}
