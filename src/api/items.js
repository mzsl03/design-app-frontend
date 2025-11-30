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

export async function updateItem(id, dto) {
    const res = await api.put(`/items/${id}`, dto,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return res.data;
}