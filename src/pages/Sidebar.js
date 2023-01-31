import React from "react";
import { Link } from "react-router-dom";

import "../Styles/App.css";
import "../Styles/Sidebar.css";

import { MdOutlineSort } from "react-icons/md";
import { FaHome, FaMapMarkedAlt, FaBrain } from "react-icons/fa";
import { SiGraphql } from "react-icons/si";
import DarkMode from "../DarkMode";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <SideBarIcon icon={<FaHome size="32" />} link="/Home" text="Home" />
      {/* <SideBarIcon
        icon={<FaMapMarkedAlt size="28" />}
        link="/Pathing2"
        text="Graph"
      /> */}
      <SideBarIcon
        icon={<MdOutlineSort size="32" />}
        link="/Sort"
        text="Sort"
      />

      {/* <SideBarIcon
        icon={<SiGraphql size="20" />}
        link="/GraphQL"
        text="GraphQL"
      /> */}
      <SideBarIcon icon={<FaBrain size="20" />} link="/SelfDriving" text="AI" />
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
