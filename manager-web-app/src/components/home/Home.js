import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="bg-slate-300 w-96 mt-12 min-w-64 ml-6 mr-6 flex flex-col p-6 text-white">
        <Link to={"/add"} className="mt-2 mb-2 bg-lime-700 h-10">
          <button className="w-full h-full hover:text-slate-300">Add</button>
        </Link>
        <Link to={"/view"} className="mt-2 mb-2 bg-lime-700 h-10">
          <button className="w-full h-full hover:text-slate-300">View</button>
        </Link>
        <Link to={"/analyse"} className="mt-2 mb-2 bg-lime-700 h-10">
          <button className="w-full h-full hover:text-slate-300">Analyse</button>
        </Link>
      </div>
    </>
  );
}
