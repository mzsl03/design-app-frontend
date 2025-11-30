import api from "./axios";

export async function getUserById(id) {
    const res = await api.get(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return res.data;
}

export async function updateUserApi(id, dto) {
    const res = await api.put(`/users/${id}`, dto, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return res.data;
}
