import React from "react";
import "./css/side-bar.css";

const SideBar = () => {
    return (
        <div className="sidebar">
            <ul className="menu">
                <li className="menu-item"><a href={"/"} className="link-to-page"><i className="bi bi-house"></i></a></li>
                <li className="menu-item"><a href={"/boards"} className="link-to-page"><i className="bi bi-clipboard2"></i></a></li>
                <li className="menu-item"><a href={"/create"} className="link-to-page"><i className="bi bi-file-plus"></i></a></li>
                <li className="menu-item"><a href={"/"} className="link-to-page"><i className="bi bi-people"></i></a></li>
            </ul>
        </div>
    );
};
export default SideBar;
