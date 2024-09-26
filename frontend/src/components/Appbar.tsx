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
    <div className="border-b flex justify-between items-center px-4 py-3 sm:px-10 sm:py-5">
      {/* Title / Logo */}
      <Link
        to={'/blogs'}
        className="flex items-center font-semibold text-2xl sm:text-3xl font-serif"
      >
        BlogSphere
      </Link>

      {/* Right-side elements */}
      <div className="flex items-center">
        {click && (
          <Link to={'/publish'} onClick={touch}>
            <button
              type="button"
              className="flex items-center focus:outline-none text-slate-500 hover:text-black rounded-lg px-3 py-2 sm:px-5 sm:py-2.5 mr-2 sm:mr-4 text-sm sm:text-md font-semibold"
            >
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 sm:h-6 sm:w-6 mr-0 sm:mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              {/* Text */}
              <div className="hidden sm:block">Write</div>
            </button>
          </Link>
        )}
        {/* Avatar */}
        <BarAvatar name={name} />
      </div>
    </div>
  );
};
