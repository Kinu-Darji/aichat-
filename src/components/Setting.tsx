import React, { useContext, useEffect } from "react";
import "../style/Setting.css";
import { useTranslation } from "react-i18next";
import "../Translate/i18";
import i18n from "../Translate/i18";
import { chatContext } from "../context/Context";

const Setting: React.FC = () => {
  const { t } = useTranslation();
  const chatCtx = useContext(chatContext);

  // Ensure useEffect runs before any conditional returns
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Check if chat context is available
  if (!chatCtx) {
    return <div>Error: Chat context is not available.</div>;
  }

  const { menu, setMenu, handleMenu } = chatCtx;

  // Function to apply and save the theme
  const handleThemes = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div className="overallsetting">
      {!menu ? (
        <div className="menucontainer">
          <ul className="menucolumn">
            <li className="menuitem" onClick={() => handleMenu("Themes")}>
              {t("themes")}
            </li>
            <li className="menuitem" onClick={() => handleMenu("Languages")}>
              {t("languages")}
            </li>
          </ul>
        </div>
      ) : menu === "Themes" ? (
        <div className="menucontainer">
          <ul className="menucolumn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="backicon"
              onClick={() => setMenu(null)}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                clipRule="evenodd"
              />
            </svg>
            <li className="menuitem" onClick={() => handleThemes("dark")}>
              Dark
            </li>
            <li className="menuitem" onClick={() => handleThemes("light")}>
              Light
            </li>
          </ul>
        </div>
      ) : (
        <div className="menucontainer">
          <ul className="menucolumn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="backicon"
              onClick={() => setMenu(null)}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                clipRule="evenodd"
              />
            </svg>
            <li className="menuitem" onClick={() => i18n.changeLanguage("en")}>
              {t("english")}
            </li>
            <li className="menuitem" onClick={() => i18n.changeLanguage("hi")}>
              {t("hindi")}
            </li>
            <li className="menuitem" onClick={() => i18n.changeLanguage("gj")}>
              {t("gujarati")}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Setting;
