import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import ItemSlide from "./components/ItemSlide.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Crosshair from "./components/Crosshair.jsx";

function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    const navigate = (to) => {
        if (window.location.pathname !== to) {
            window.history.pushState({}, "", to);
            setCurrentPath(to);
        }
    };

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopState);

        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener('popstate', handlePopState);
            document.body.style.overflow = "auto";
        };
    }, []);

    const token = localStorage.getItem("token");

    const unprotectedPaths = ["/login", "/register"];

    if (!token && !unprotectedPaths.includes(currentPath)) {
        window.location.href = "/login";
        return null;
    }

    let Component;

    switch (currentPath) {
        case "/home":
            Component = [<ItemSlide />, <Crosshair />];
            break;
        case "/login":
            Component = <Login navigate={navigate} />;
            break;
        case "/register":
            Component = <Register navigate={navigate} />;
            break;
        default:
            Component = <h1>404 Not Found</h1>;
    }

    return (
        <div style={{display: "flex"}}>
            {Component}
        </div>
    );
}
export default App;