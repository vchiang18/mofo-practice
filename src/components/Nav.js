import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSettingsClick = () => {
    navigate("/customize-values");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-grow">
          <img
            className="h-8 w-auto"
            src="/images/cal-yellow.svg"
            alt="team logo"
          />
        </div>
        {/* <NavLink to="/test" className="text-white p-4">
          Test
        </NavLink> */}
        <div className="space-x-4 ml-auto items-center">
          {location.pathname === "/" && (
            <div className="flex items-center space-x-2">
              <NavLink
                to="/play-list"
                className="text-gray-300 hover:text-white"
              >
                Play List
              </NavLink>
              <span
                onClick={handleSettingsClick}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <Cog6ToothIcon className="w-6 h-6 text-white" />
              </span>
            </div>
          )}
          {location.pathname === "/play-list" && (
            <div className="flex items-center space-x-2">
              <NavLink to="/" className="text-gray-300 hover:text-white">
                Play Entry
              </NavLink>
              <span
                onClick={handleSettingsClick}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <Cog6ToothIcon className="w-6 h-6 text-white" />
              </span>
            </div>
          )}
          {location.pathname === "/customize-values" && (
            <>
              <NavLink to="/" className="text-gray-300 hover:text-white">
                Play Entry
              </NavLink>
              <NavLink
                to="/play-list"
                className="text-gray-300 hover:text-white"
              >
                Play List
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
