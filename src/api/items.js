import api from "./axios";

export async function getItems() {
    const res = await api.get("/items");
    return res.data;
}

export async function deleteItem(id) {
    await api.delete(`/items/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}