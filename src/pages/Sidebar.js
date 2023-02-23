import React from "react";
import { Link } from "react-router-dom";

import "../Styles/App.css";
import "../Styles/Sidebar.css";

import { MdOutlineSort } from "react-icons/md";
import { FaHome, FaMapMarkedAlt, FaBrain, FaStoreAlt } from "react-icons/fa";
// import { SiGraphql } from "react-icons/si";
import DarkMode from "../DarkMode";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <SideBarIcon icon={<FaHome size="32" />} link="/Home" text="Home" />
      <SideBarIcon
        icon={<FaMapMarkedAlt size="28" />}
        link="/Pathing2"
        text="Graph"
      />
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
      <SideBarLink
        icon={<FaStoreAlt size="20" />}
        link="https://shadow-work-lighting.com/"
        text="Shop"
      />

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

const SideBarLink = ({ icon, link, text = "text" }) => {
  return (
    <a href={link} className="sidebar-icon">
      {icon}
      <span className="sidebar-tooltip">{text}</span>
    </a>
  );
};

export default Sidebar;
