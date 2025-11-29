import React, {useEffect} from "react";
import './css/overlay.css'

export default function DescriptionPanel({ image, onClose, disabled }) {
    const [classes, setClasses] = React.useState(`description-panel fade-in`);

    useEffect(() => {
        if (!image) return;
        setClasses("description-panel fade-in");  // reset animation
    }, [image]);

    useEffect(() => {
        if (!image) return;
        if (disabled) return;

        const handleWheel = async (e) => {
            if (e.deltaY < 0) {
                setClasses(`description-panel fade-out`)
                await new Promise(res => setTimeout(res, 1001));
                onClose();
            }
        };
        window.addEventListener("wheel", handleWheel, { passive: true });
        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [image, onClose, disabled]);

    if (!image) return null;

    return (
        <div className={classes} >
            <h2 className="title-card">{image.alt}</h2>
            <img src={image.src} alt={image.alt} className="description-image" />
            <p className="description">User: {image.dataset.username}</p>
            <p className="description">Tags: {image.dataset.tags}</p>
        </div>
    );
}