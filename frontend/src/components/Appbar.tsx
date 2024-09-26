import { useState, useEffect } from "react";
import { BarAvatar } from "./BarAvatar";
import { Link, useLocation } from "react-router-dom";

export const Appbar = () => {
  const name = localStorage.getItem("name") || "Anonymous";
  const [click, setClick] = useState(true);
  const location = useLocation();  // Get the current route

  const touch = () => {
    setClick(!click); 
  };


  useEffect(() => {
    if (location.pathname === '/publish') {
      setClick(false); 
    }
  }, [location]);

  return (
    <div className="border-b flex justify-between px-10 py-5">
      <Link
        to={'/blogs'}
        className="flex flex-col justify-center font-semibold cursor-pointer text-3xl font-serif"
      >
        BlogSphere
      </Link>

      <div className="flex">
        {click && (
          <Link to={'/publish'} onClick={touch}>
            <button
              type="button"
              className="flex mr-4 focus:outline-none hover:text-black text-slate-500 rounded-lg text-md px-5 py-2.5 me-2 mb-2 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <div className="mt-0.5">Write</div>
            </button>
          </Link>
        )}
        <BarAvatar name={name} />
      </div>
    </div>
  );
};
