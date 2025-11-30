import React, { useEffect, useRef, useState } from "react";
import { getBoards, deleteBoard } from "../api/boards";
import Crosshair from "./Crosshair";
import BoardDescriptionPanel from "./BoardDescriptionPanel.jsx";
import BoardThumbnail from "./BoardThumbnail.jsx";

const BoardSlide = () => {
    const [boards, setBoards] = useState([]);
    const [centerBoard, setCenterBoard] = useState(null);
    const [descBoard, setDescBoard] = useState(null);
    const trackRef = useRef(null);

    useEffect(() => {
        getBoards().then(setBoards);
    }, []);

    async function handleDelete(id) {
        await deleteBoard(id);
        setBoards(prev => prev.filter(b => b.id !== id));
        setDescBoard(null);
    }

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const handleMouseDown = (e) => {
            track.dataset.mouseDownAt = e.clientX;
        };

        function updateCenterBoard() {
            const cards = track.getElementsByClassName("board-card");
            let center = null;
            let minDist = Infinity;

            const viewportCenter = window.innerWidth / 2;

            for (const card of cards) {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const dist = Math.abs(centerX - viewportCenter);

                if (dist < minDist) {
                    minDist = dist;
                    center = card;
                }
            }
            setCenterBoard(center);
        }

        const handleMouseUp = () => {
            track.dataset.mouseDownAt = "0";
            track.dataset.prevPercentage = track.dataset.percentage;
            updateCenterBoard();
        };

        const handleMouseMove = (e) => {
            if (track.dataset.mouseDownAt === "0") return;
            const mouseDownAt = parseFloat(track.dataset.mouseDownAt);
            const prevPercentage = parseFloat(track.dataset.prevPercentage);

            const mouseDelta = mouseDownAt - e.clientX;
            const maxDelta = window.innerHeight / 2;

            let percentage = (mouseDelta / maxDelta) * -100;
            let nextPercentage = prevPercentage + percentage;

            nextPercentage = Math.min(nextPercentage, 0);
            nextPercentage = Math.max(nextPercentage, -100);

            track.dataset.percentage = nextPercentage;

            track.animate(
                { transform: `translate(${nextPercentage}%, -50%)` },
                { duration: 1200, fill: "forwards" }
            );
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
        <>
            <div
                ref={trackRef}
                style={styles.container}
                id="board-track"
                data-mouse-down-at="0"
                data-prev-percentage="0"
            >
                {boards.map(board => (
                    <div
                        key={board.id}
                        className="board-card"
                        data-id={board.id}
                        data-name={board.name}
                        data-count={board.items?.length || 0}
                    >
                        <BoardThumbnail items={board.items} />
                        <h3 style={styles.boardTitle}>{board.name}</h3>
                    </div>
                ))}
            </div>

            {centerBoard && (
                <Crosshair
                    image={centerBoard}
                    disabled={descBoard}
                    onWheel={(boardDomEl) =>
                        setDescBoard({
                            id: boardDomEl.dataset.id,
                            name: boardDomEl.dataset.name,
                            count: boardDomEl.dataset.count
                        })
                    }
                />
            )}

            <BoardDescriptionPanel
                board={descBoard}
                onClose={() => setDescBoard(null)}
                onDelete={handleDelete}
            />
        </>
    );
};

const styles = {
    imagesGroup: {
        width: "40vmin",
        height: "56vmin",

    },
    container: {
        display: "flex",
        gap: "4vmin",
        position: "absolute",
        left: "50%",
        top: "50%",
        alignItems: "center",
        transform: "translate(0, -50%)",
        userSelect: "none"
    },
    image: {
        width: "40vmin",
        height: "56vmin",
        objectFit: "cover",
        borderRadius: "10px"
    },
    boardTitle: {
        textAlign: "center",
        color: "white"
    }
};

export default BoardSlide;
