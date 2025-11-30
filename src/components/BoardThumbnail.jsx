import React from "react";
import './css/thumbnail.css'

export default function BoardThumbnail({ items }) {
    const images = items.slice(0, 4); // max 4 kép

    return (
        <div className="board-collage">
            {images.map((item, index) => (
                <div key={item.id} className={`cell cell-${index}`}>
                    <img src={item.imageUrl} alt={item.title} draggable={false} />
                    {index === 3 && items.length > 4 && (
                        <div className="more-overlay">+{items.length - 4}</div>
                    )}
                </div>
            ))}
        </div>
    );
}
