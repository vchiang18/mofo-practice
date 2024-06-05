import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Nav = () => {
  //   const [isOpen, setIsOpen] = useState(false);

  //   const toggleMenu = () => {
  //     setIsOpen(!isOpen);
  //   };
  const [isPlayEntry, setIsPlayEntry] = useState(true);
  const navigate = useNavigate();

  const togglePage = () => {
    setIsPlayEntry(!isPlayEntry);
  };

  const handlePlayEntryClick = () => {
    togglePage();
    navigate("/");
  };

  const handlePlayListClick = () => {
    togglePage();
    navigate("/play-list");
  };

  const handleSettingsClick = () => {
    navigate("/customize-values");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <img
            className="h-8 w-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/0/03/Cal_logo.png"
            alt="team logo"
          />
        </div>

        <div className="hidden md:flex space-x-4">
          {isPlayEntry ? (
            <NavLink
              to="/play-list"
              className="text-gray-300 hover:text-white"
              onClick={handlePlayEntryClick}
            >
              Play List
            </NavLink>
          ) : (
            <NavLink
              to="/"
              className="text-gray-300 hover:text-white"
              onClick={handlePlayListClick}
            >
              Play Entry
            </NavLink>
          )}

          {/* <NavLink to="/" className="text-gray-300 hover:text-white">
            Play Entry
          </NavLink>
          <NavLink to="/play-list" className="text-gray-300 hover:text-white">
            Play List
          </NavLink> */}

          <button
            // onClick={toggleMenu}
            onClick={handleSettingsClick}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {/* {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )} */}
            <Bars3Icon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
