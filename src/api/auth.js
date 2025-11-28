import api from "./axios";

export async function login(username, password) {
    const res = await api.post("/auth/login", {
        username: username,
        password: password
    });
    localStorage.setItem("token", res.data.token);
    api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    return res.data;
}

export async function register(username, email, password) {
    const res = await api.post("/auth/register", {
        username: username,
        email: email,
        password: password
    });
    localStorage.setItem("token", res.data.token);
    api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    return res.data;
}