import React, {useEffect, useState} from "react";
import { updateItem } from "../api/items";
import './css/overlay.css'

export default function DescriptionPanel({ image, onClose, disabled, onDelete }) {
    const [classes, setClasses] = React.useState(`description-panel fade-in`);

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingTags, setIsEditingTags] = useState(false);

    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");

    useEffect(() => {
        if (!image) return;
        setClasses("description-panel fade-in");
    }, [image]);

    useEffect(() => {
        if (!image || disabled) return;

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

    useEffect(() => {
        if (!image) return;

        setTitle(image.alt);
        setTags(image.dataset.tags);
    }, [image]);

    if (!image) return null;

    async function saveChanges(field, value) {
        const id = image.dataset.id;

        try {
            await updateItem(id, { [field]: value });

            if (field === "title") image.dataset.title = value;
            if (field === "tags") image.dataset.tags = value;

        } catch (err) {
            console.error("ITEM UPDATE ERROR:", err);
        }
    }

    return (
        <div className={classes} >
            {isEditingTitle ? (
                <input
                    autoFocus
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onBlur={() => { setIsEditingTitle(false); saveChanges("title", title); }}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            setIsEditingTitle(false);
                            saveChanges("title", title);
                        }
                    }}
                    className="editable-input"
                />
            ) : (
                <h2
                    className="title-card editable"
                    onClick={() => setIsEditingTitle(true)}
                >
                    {title}
                </h2>
            )}
            <img src={image.src} alt={image.dataset.title} className="description-image" />
            <p className="description">User: {image.dataset.username}</p>

            {isEditingTags ? (
                <input
                    autoFocus
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                    onBlur={() => { setIsEditingTags(false); saveChanges("tags", tags); }}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            setIsEditingTags(false);
                            saveChanges("tags", tags);
                        }
                    }}
                    className="editable-input"
                />
            ) : (
                <p
                    className="description editable"
                    onClick={() => setIsEditingTags(true)}
                >
                    Tags: {tags}
                </p>
            )}

            <button className="delete-btn" onClick={() => onDelete(image.dataset.id)}>
                Delete
            </button>
        </div>
    );
}