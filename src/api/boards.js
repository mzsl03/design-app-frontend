import api from "./axios";

export async function getBoards() {
    const res = await api.get("/boards");
    return res.data;
}
