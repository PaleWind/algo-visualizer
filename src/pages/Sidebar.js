import React from "react";
import { Link } from "react-router-dom";

import "../App.css";

import { MdOutlineSort } from "react-icons/md";
import { FaHome, FaMapMarkedAlt, FaPoo } from "react-icons/fa";
import DarkMode from "../DarkMode";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <SideBarIcon icon={<FaHome size="32" />} link="/Home" text="Home" />
      <SideBarIcon
        icon={<FaMapMarkedAlt size="28" />}
        link="/Pathing"
        text="Graph"
      />
      <SideBarIcon
        icon={<MdOutlineSort size="32" />}
        link="/Sort"
        text="Sort"
      />

      <SideBarIcon icon={<FaPoo size="20" />} />
      <DarkMode />
    </div>
  );
};

const SideBarIcon = ({ icon, link, text = "text" }) => {
  return (
    <Link to={link} className="sidebar-icon">
      {icon}
      <span className="sidebar-tooltip">{text}</span>
    </Link>
  );
};

export default Sidebar;
