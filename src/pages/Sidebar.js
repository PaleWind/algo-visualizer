import React from "react";
import { Link } from "react-router-dom";

import "../App.css";

import { BsPlus } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";
import DarkMode from "../DarkMode";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <SideBarIcon icon={<FaFire size="28" />} link="/" />
      <SideBarIcon icon={<BsPlus size="32" />} link="/Sort" />
      <SideBarIcon icon={<FaPoo size="20" />} link="/Visualizer2" />
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
