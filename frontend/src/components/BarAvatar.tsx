import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

interface Custom {
  id: string;
}

export const BarAvatar = ({ name }: { name: string }) => {
  const [isDrop, setIsDrop] = useState(false);
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token') || " ";
  const decoded = jwtDecode<Custom>(token);
  const id = decoded.id || " ";
  localStorage.setItem('authorId',id);



  const toggleDrop = () => {
    setIsDrop(!isDrop);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
 };
 

  const Profile = () => {
    navigate(`/user/${id}`);
  }

  return (
    <div className="relative inline-block">
      {/* Avatar Button */}
      <div
        id="avatar"
        onClick={toggleDrop}
        className="w-10 h-10 relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
      >
        <span className="text-md text-gray-600 dark:text-gray-300">{name[0]}</span>
      </div>

      {/* Dropdown Menu */}
      {isDrop && (
        <div
          id="dropdownAvatar"
          className="absolute right-0 mt-2 w-44 divide-y divide-gray-100 rounded-md shadow  bg-white"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-900 font-semibold">
            <li className="block px-4 py-2 cursor-pointer ">
              <button onClick={Profile} className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                Profile
              </button>
            </li>
            <li className="block px-4 py-2 cursor-pointer">
                <button onClick={logout} className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                </svg>
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};


