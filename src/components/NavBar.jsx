import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../api/auth.js";

const styles = {
    nav: {
        height: "10vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 20
    },
    links: {
        display: "flex",
        gap: "2rem",
        alignItems: "center",
    },
    link: {
        color: "white",
        fontSize: "1.1rem",
        textDecoration: "none",
        paddingBottom: "3px",
        transition: "0.2s",
    },
    spacer: {
        flexGrow: 1,
    },
    logout: {
        color: "#aaa",
        cursor: "pointer",
        fontSize: "1rem",
        transition: "0.2s",
    },
    logoutHover: {
        color: "white",
    }
};

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [hoverLogout, setHoverLogout] = React.useState(false);

    const handleLogout = () => {
        logout()
        navigate("/");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div style={styles.nav}>
            <div style={styles.links}>
                <Link
                    to="/home"
                    style={{
                        ...styles.link,

                    }}
                >
                    Home
                </Link>

                <Link
                    to="/board"
                    style={{
                        ...styles.link,

                    }}
                >
                    Boards
                </Link>

                <Link
                    to="/board/create"
                    style={{
                        ...styles.link,

                    }}
                >
                    Create Board
                </Link>
                
            </div>

            <div style={styles.spacer} />

            <span
                style={{
                    ...styles.logout,
                    ...(hoverLogout ? styles.logoutHover : {})
                }}
                onMouseEnter={() => setHoverLogout(true)}
                onMouseLeave={() => setHoverLogout(false)}
                onClick={handleLogout}
            >
                Logout
            </span>
        </div>
    );
};

export default Navbar;
