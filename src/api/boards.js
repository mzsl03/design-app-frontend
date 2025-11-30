import api from "./axios";

export async function getBoards() {
    const res = await api.get("/boards");
    return res.data;
}

export async function deleteBoard(id) {
    await api.delete(`/boards/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export async function createBoardApi(name) {
    const res = await api.post("/boards", { name });
    return res.data;
}

export async function createItemApi(item) {
    const res = await api.post("/items", item);
    return res.data;
}

export async function addItemToBoardApi(boardId, itemId) {
    const res = await api.post(`/boards/${boardId}/addItem/${itemId}`);
    return res.data;
}