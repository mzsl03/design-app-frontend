import React, {useEffect, useRef, useState} from "react";
import {deleteItem, getItems} from "../api/items";
import Crosshair from "./Crosshair.jsx";
import DescriptionPanel from "./DescriptionPanel.jsx";


const ItemSlide = () => {

    const [items, setItems] = useState([]);
    const [centerImage, setCenterImage] = useState(null);
    const [descImage, setDescImage] = useState(null);
    const trackRef = useRef(null);

    useEffect(() => {
        getItems().then(setItems);
    }, []);

    async function handleDelete(id) {
        await deleteItem(id);

        setItems(prev => prev.filter(item => item.id !== id));

        setDescImage(null);
    }

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const handleMouseDown = (e) => {
            track.dataset.mouseDownAt = e.clientX;
        };

        function updateCenterImage() {
            const images = track.getElementsByClassName("image");
            let centerImage = null;
            let minDistance = Infinity;

            const viewportCenter = window.innerWidth / 2;

            for (const img of images) {
                const rect = img.getBoundingClientRect();
                const imgCenter = rect.left + rect.width / 2;

                const distance = Math.abs(imgCenter - viewportCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    centerImage = img;
                }
            }

            setCenterImage(centerImage);
        }

        const handleMouseUp = () => {
            track.dataset.mouseDownAt = "0";
            track.dataset.prevPercentage = track.dataset.percentage;
            updateCenterImage()
        };

        const handleMouseMove = (e) => {
            if (track.dataset.mouseDownAt === "0") return;

            const mouseDownAt = parseFloat(track.dataset.mouseDownAt);
            const prevPercentage = parseFloat(track.dataset.prevPercentage);

            if (isNaN(mouseDownAt) || isNaN(prevPercentage) || mouseDownAt === 0) return;

            const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
            const maxDelta = window.innerHeight / 2;

            let percentage = (mouseDelta / maxDelta) * -100,
                nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

            nextPercentage = Math.min(nextPercentage, 0);
            nextPercentage = Math.max(nextPercentage, -100);

            track.dataset.percentage = nextPercentage;

            track.animate(
                {transform: `translate(${nextPercentage}%, -50%)`},
                {duration: 1200, fill: "forwards"}
            );
            for (const image of track.getElementsByClassName("image")) {
                image.animate(
                    {objectPosition: `${nextPercentage + 100}% center`},
                    {duration: 1200, fill: "forwards"}
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
        <>
        <div ref={trackRef}
             style={{
                 ...styles.container,
                 WebkitUserSelect: "none",
                 msUserSelect: "none",
                 userSelect: "none",
             }} id="image-track" data-mouse-down-at="0" data-prev-percentage="0" >
            {items.map(item => (
                    <img
                        key={item.id}
                        data-id={item.id}
                        data-username={item.user?.username || ""}
                        data-tags={item.tags}
                        className={"image"}
                        src={item.imageUrl}
                        alt={item.title}
                        style={styles.image}
                        draggable={false}/>
            ))}
        </div>
            {centerImage && (
                <Crosshair
                    image={centerImage}
                    disabled={descImage}
                    onWheel={(img) => setDescImage({
                        src: img.src,
                        alt: img.alt,
                        dataset: img.dataset
                    })}
                />
            )}
            <DescriptionPanel
                image={descImage}
                disabled={!descImage}
                onClose={ () => setDescImage(null)}
                onDelete={handleDelete} />
        </>
    );
};

const styles = {
    container: {
        display: "flex",
        gap: "4vmin",
        position: "absolute",
        left: "50%",
        top: "50%",
        alignItems: "center",
        transform: "translate(0, -50%)"
    },

    image: {
        width: "40vmin",
        height: "56vmin",
        objectFit: "cover",
        objectPosition: "100% center",

    },
};



export default ItemSlide;
