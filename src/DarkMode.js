import React from "react";
import "./DarkMode.css";
import { HiMoon } from "react-icons/hi";

const DarkMode = () => {
  const storedTheme = localStorage.getItem("theme");
  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDark();
    } else {
      setLight();
    }
  };

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

  if (defaultDark) {
    setDark();
  }

  return (
    <div className="sidebar-icon">
      <span className="sidebar-tooltip">Theme</span>
      <label className="hide-input" htmlFor="checkbox">
        {<HiMoon size="32" />}
        <input
          type="checkbox"
          id="checkbox"
          onChange={toggleTheme}
          defaultChecked={defaultDark}
        />

        {/* <div className="slider round">
          
        </div> */}
      </label>
    </div>

    // <div className="toggle-theme-wrapper">
    //   <label className="toggle-theme" htmlFor="checkbox">
    //     <input
    //       type="checkbox"
    //       id="checkbox"
    //       onChange={toggleTheme}
    //       defaultChecked={defaultDark}
    //     />
    //     <div className="slider round"></div>
    //   </label>
    // </div>
  );
};

export default DarkMode;
