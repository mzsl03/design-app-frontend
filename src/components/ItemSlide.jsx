import React, {useEffect, useRef, useState} from "react";
import { getItems } from "../api/items";

const ItemSlide = () => {
    const [items, setItems] = useState([]);

    const trackRef = useRef(null);

    useEffect(() => {
        getItems().then(res => setItems(res.data));
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const handleMouseDown = (e) => {
            track.dataset.mouseDownAt = e.clientY;
        };

        const handleMouseUp = () => {
            track.dataset.mouseDownAt = "0";
            track.dataset.prevPercentage = track.dataset.percentage;
        };

        const handleMouseMove = (e) => {
            if (track.dataset.mouseDownAt === "0") return;

            const numberOfItems = track.getElementsByClassName("item").length;

            const step = -80;

            const mouseDelta = e.clientY - parseFloat(track.dataset.mouseDownAt);
            const maxDelta = window.innerHeight / 2;

            const percentage = (mouseDelta / maxDelta) * 100,
                nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

            const minClamp = -(numberOfItems - 1) * step;

            const clamped = Math.max(Math.min(nextPercentage, 0), minClamp);

            track.dataset.percentage = clamped;

            track.animate(
                { transform: `translate(0, ${clamped}%)` },
                { duration: 1200, fill: "forwards" }
            );
            for (const image of track.getElementsByClassName("image")) {
                image.animate(
                    { objectPosition: `0 ${-clamped}%` },
                    { duration: 1200, fill: "forwards" }
                );
            }

        };

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div ref={trackRef}
            style={{
            ...styles.container,
            WebkitUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
        }} id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
            {items.map(item => (
                <div key={item.id} style={styles.wrapper}>
                    <div style={styles.card}>
                        <img className={"image"} src={item.imageUrl} alt={item.title} style={styles.image} draggable={false} />

                        <div style={{
                            ...styles.overlay,
                            WebkitUserSelect: "none",
                            msUserSelect: "none",
                            userSelect: "none",
                        }} className="overlay-content">
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
        gap: "4vmin",
        padding: "40px 20px",
        maxWidth: "50vh",
        margin: "0 auto",
        alignItems: "center",
        transform: "translate(0, 0)"
    },

    wrapper: {
        position: "relative",
        borderRadius: "5px",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "3/4",
        maxWidth: "50vh",
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
        objectFit: "cover",
        objectPosition: "center 0",
        display: "block",
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
        pointerEvents: "none"
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
    div:hover > .overlay-content {
        opacity: 1;
    }
    div:hover > img {
    transform: none !important;
}
`;
document.head.appendChild(styleTag);

export default ItemSlide;
