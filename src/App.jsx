import React, {useEffect} from "react";
import SideBar from "./components/SideBar";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import ItemSlide from "./components/ItemSlide.jsx";
import BoardSlide from "./components/BoardSlide.jsx";
import CreateItem from "./components/CreateItem.jsx";

function App() {

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    let Component;

    switch (window.location.pathname) {
        case "/":
            Component = <ItemSlide />;
            break;

        case "/boards":
            Component = <BoardSlide />;
            break;

        case "/create":
            Component = <CreateItem />;
            break;

        default:
            Component = <h1>404 Not Found</h1>;

    }


    return (
        <div style={{display: "flex"}}>
            <SideBar/>

            <div style={{marginLeft: "80px", width: "100%"}}>
                {Component}
            </div>

        </div>
    );
}

export default App;
