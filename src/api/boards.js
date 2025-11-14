import axios from "axios";

export const getBoards = () => {
    return axios.get("http://localhost:8080/api/boards");
};
export const createBoard = (board) => {
    return axios.post("http://localhost:8080/api/boards", board)
};
