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
            <li className="block px-4 py-2 cursor-pointer">
              <button onClick={Profile}>Profile</button>
            </li>
            <li className="block px-4 py-2 cursor-pointer">
              <button onClick={logout}>Sign out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};


