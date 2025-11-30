import React, { useEffect, useState } from "react";
import "./css/overlay.css";

export default function BoardDescriptionPanel({ board, onClose, onDelete }) {
    const [classes, setClasses] = useState("description-panel fade-in");

    useEffect(() => {
        if (!board) return;
        setClasses("description-panel fade-in");
    }, [board]);

    // Scroll ↑ → panel bezárása
    useEffect(() => {
        if (!board) return;

        const handleWheel = async (e) => {
            if (e.deltaY < 0) {
                setClasses("description-panel fade-out");
                await new Promise((res) => setTimeout(res, 1000));
                onClose();
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });

        return () => window.removeEventListener("wheel", handleWheel);
    }, [board, onClose]);

    if (!board) return null;

    return (
        <div className={classes}>
            <h2 className="title-card">{board.name}</h2>

            <p className="description">
                Items count: {board.count}
            </p>

            <button
                className="delete-btn"
                onClick={() => onDelete(board.id)}
            >
                Delete board
            </button>
        </div>
    );
}
