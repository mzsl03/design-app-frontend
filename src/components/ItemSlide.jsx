import React, { useEffect, useState } from "react";
import { getItems } from "../api/items";

const ItemSlide = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems().then(res => setItems(res.data));
    }, []);

    return (
        <div style={styles.container}>
            {items.map(item => (
                <div key={item.id} style={styles.wrapper}>
                    <div style={styles.card}>
                        <img src={item.imageUrl} alt={item.title} style={styles.image} />

                        <div style={styles.overlay} className="overlay-content">
                            <h2 style={styles.title}>{item.title}</h2>
                            <p style={styles.desc}>{item.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        padding: "40px 20px",
        maxWidth: "450px",
        margin: "0 auto",
        alignItems: "center",
    },

    wrapper: {
        position: "relative",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "3/4",
    },

    card: {
        position: "relative",
        width: "100%",
        height: "auto",
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
        display: "block",
        transition: "transform 0.5s ease",
    },

    overlay: {
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        opacity: 0,
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        textAlign: "center",
        transition: "opacity 0.4s ease",
        overflowX: "hidden",
    },

    title: {
        fontSize: "28px",
        marginBottom: "10px",
        textAlign: "center",
    },

    desc: {
        fontSize: "16px",
        maxWidth: "70%",
        textAlign: "center",
    },
};


const styleTag = document.createElement("style");
styleTag.innerHTML = `
    .overlay-content:hover {
        opacity: 1 !important;
    }
    .overlay-content:hover + img,
    .overlay-content:hover img {
        transform: scale(1.05);
    }
    
    div:hover > img {
        transform: scale(1.05);
    }
    div:hover > .overlay-content {
        opacity: 1;
    }
`;
document.head.appendChild(styleTag);

export default ItemSlide;
