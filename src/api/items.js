import axios from "axios";



export const getItems = () =>
    axios.get("http://localhost:8080/api/items");

export const createItem = (item) =>
    axios.post("http://localhost:8080/api/items", item);

export const addItemToBoard = (boardId, itemId) =>
    axios.post(`http://localhost:8080/api/boards/${boardId}/addItem/${itemId}`);