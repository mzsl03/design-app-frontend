import React, { useEffect, useState } from "react";
import { getBoards, createBoard } from "../api/boards";
import { createItem, addItemToBoard } from "../api/items";
import "./css/create-element.css";

const CreateItem = () => {
    const [boards, setBoards] = useState([]);
    const [showBoardModal, setShowBoardModal] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [tags, setTags] = useState("");
    const [boardId, setBoardId] = useState("");

    const [newBoardName, setNewBoardName] = useState("");

    useEffect(() => {
        getBoards().then(res => setBoards(res.data));
    }, []);

    const handleCreateBoard = async () => {
        if (!newBoardName) return;

        const res = await createBoard({ name: newBoardName });
        setBoards(prev => [...prev, res.data]);
        setBoardId(res.data.id);

        setShowBoardModal(false);
        setNewBoardName("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const itemRes = await createItem({
            title,
            description,
            imageUrl,
            tags
        });

        if (boardId) {
            await addItemToBoard(boardId, itemRes.data.id);
        }

        alert("Item successfully created!");
        setTitle("");
        setDescription("");
        setImageUrl("");
        setTags("");
    };

    return (
        <div className="create-item-container">
            <h1>Create New Item</h1>

            <form className="item-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                />

                <div className="board-select">
                    <label>Select Board</label>
                    <select
                        value={boardId}
                        onChange={e => setBoardId(e.target.value)}
                    >
                        <option value="">No board</option>
                        {boards.map(b => (
                            <option key={b.id} value={b.id}>
                                {b.name}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        className="new-board-btn"
                        onClick={() => setShowBoardModal(true)}
                    >
                        + New Board
                    </button>
                </div>

                <button type="submit" className="submit-btn">
                    Create Item
                </button>
            </form>

            {showBoardModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Create New Board</h2>

                        <input
                            type="text"
                            placeholder="Board name"
                            value={newBoardName}
                            onChange={e => setNewBoardName(e.target.value)}
                        />

                        <div className="modal-actions">
                            <button onClick={handleCreateBoard}>Save</button>
                            <button className="cancel" onClick={() => setShowBoardModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateItem;
