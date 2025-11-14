import React, { useEffect, useState } from "react";
import { getBoards } from "../api/boards";

const BoardSlide = () => {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        getBoards().then(res => setBoards(res.data));
    }, []);

    if (!boards.length) return <p>Loading boards...</p>;

    return (
        <div style={styles.page}>
            {boards.map(board => (
                <div key={board.id} style={styles.boardBlock}>
                    <h1 style={styles.header}>{board.name}</h1>

                    <div style={styles.container}>
                        {board.items.map(item => (
                            <div key={item.id} style={styles.wrapper}>
                                <div style={styles.card}>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        style={styles.image}
                                    />

                                    <div style={styles.overlay} className="overlay-content">
                                        <h2 style={styles.title}>{item.title}</h2>
                                        <p style={styles.desc}>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const styles = {
    page: {
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "60px",
    },

    boardBlock: {
        textAlign: "center",
    },

    header: {
        fontSize: "32px",
        marginBottom: "20px",
        color: "white",
    },

    container: {
        display: "flex",
        flexDirection: "column",
        gap: "40px",
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
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
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
    },

    title: {
        fontSize: "28px",
        marginBottom: "10px",
    },

    desc: {
        fontSize: "16px",
        maxWidth: "70%",
    },
};

const styleTag = document.createElement("style");
styleTag.innerHTML = `
    div:hover > img {
        transform: scale(1.05);
    }
    div:hover > .overlay-content {
        opacity: 1;
    }
`;
document.head.appendChild(styleTag);

export default BoardSlide;