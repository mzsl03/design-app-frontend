import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./components/Login.jsx";
import CreateBoardPage from "./components/CreateBoardPage.jsx";
import Crosshair from "./components/Crosshair.jsx";
import BoardSlide from "./components/BoardSlide.jsx";
import ItemSlide from "./components/ItemSlide.jsx";
import Register from "./components/Register.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const unprotected = ["/", "/register"];

        if (!token && !unprotected.includes(location.pathname)) {
            navigate("/", { replace: true });
        }
    }, [token, location.pathname, navigate]);

    return (
        <div style={{ display: "flex" }}>
            {token && <NavBar></NavBar>}
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />


                {token && (
                    <>
                        <Route path="/home" element={<><ItemSlide /><Crosshair /></>} />
                        <Route path="/board" element={<><BoardSlide /><Crosshair /></>} />
                        <Route path="/board/create" element={<CreateBoardPage />} />
                    </>
                )}


                {!token && (
                    <Route path="*" element={<Login />} />
                )}


                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </div>
    );
}
export default App;