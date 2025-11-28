import api from "./axios";

export async function getItems() {
    const res = await api.get("/items");
    return res.data;
}