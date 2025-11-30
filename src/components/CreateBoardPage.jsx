import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { createBoardApi, createItemApi, addItemToBoardApi } from "../api/boards";

const styles = {
    container: {
        display: "flex",
        height: "60vh",
        width: "60vw",
        position: "absolute",
        top: "20vh",
        left: "20vw",
        gap: "2rem",
        borderRadius: "0 25px 25px 0",
        backgroundColor: "black",
        paddingLeft: "2rem",
        overflow: "hidden",
    },

    formContainer: {
        display: "flex",
        flexDirection: "column",
        width: "40%",
        padding: "2rem 0",
        zIndex: 20,
        overflowX: "hidden",
    },

    heading: {
        color: "white",
        marginBottom: "1rem",
        fontSize: "2.5rem",
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
    },

    input: {
        backgroundColor: "#0c0c0c",
        border: "none",
        borderRadius: "0.5rem",
        color: "white",
        padding: "0.8rem 1rem",
        fontSize: "1rem",
        width: "100%",
    },

    button: {
        padding: "0.8rem 1.5rem",
        backgroundColor: "#303030",
        color: "#fff",
        border: "none",
        borderRadius: "0.5rem",
        cursor: "pointer",
        fontSize: "1.1rem",
        fontWeight: "600",
        width: "100%",
    },

    addItemBtn: {
        backgroundColor: "#202020",
        width: "100%",
        marginTop: "0.5rem",
    },

    itemBox: {
        width: "100%",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "0.5rem",
    },

    image: {
        flexGrow: 2,
        objectFit: "cover",
    }
};

const CreateBoardPage = () => {

    const navigate = useNavigate();

    const [boardName, setBoardName] = useState("");
    const [items, setItems] = useState([
        { title: "", description: "", imageUrl: "", tags: "" }
    ]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const addItemField = () => {
        setItems([...items, { title: "", description: "", imageUrl: "", tags: "" }]);
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const board = await createBoardApi(boardName);


            for (const it of items) {
                const savedItem = await createItemApi(it);
                await addItemToBoardApi(board.id, savedItem.id);
            }

            navigate("/boards");
        } catch (err) {
            console.error("BOARD CREATE ERROR:", err);
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h1 style={styles.heading}>Create Board</h1>

                <form onSubmit={handleSubmit} style={styles.form}>

                    <input
                        type="text"
                        placeholder="Board name"
                        value={boardName}
                        onChange={(e) => setBoardName(e.target.value)}
                        style={styles.input}
                    />

                    {items.map((it, i) => (
                        <div key={i} style={styles.itemBox}>
                            <input
                                type="text"
                                placeholder="Item title"
                                value={it.title}
                                onChange={(e) => handleItemChange(i, "title", e.target.value)}
                                style={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={it.description}
                                onChange={(e) => handleItemChange(i, "description", e.target.value)}
                                style={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={it.imageUrl}
                                onChange={(e) => handleItemChange(i, "imageUrl", e.target.value)}
                                style={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Tags (comma separated)"
                                value={it.tags}
                                onChange={(e) => handleItemChange(i, "tags", e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    ))}

                    <button type="button" onClick={addItemField} style={{ ...styles.button, ...styles.addItemBtn }}>
                        + Add Item
                    </button>

                    <button type="submit" style={styles.button}>
                        Save Board
                    </button>
                </form>
            </div>

            <img style={styles.image} src="/login-reg.jpg" alt="side" />
        </div>
    );
};

export default CreateBoardPage;