import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://66739d896ca902ae11b4c279.mockapi.io/todo/todos";

export const getDataTodos = createAsyncThunk(
    "todos/getDataTodos",
    async () => {
        const response = await axios(url)
        return response.data
    }
)

export const addNewTodo = createAsyncThunk(
    "todos/addNewTodo",
    async (newTodo) => {
        const response = await axios.post(url, newTodo)
        return response.data
    }
)

export const editTodo = createAsyncThunk(
    "todos/editTodo",
    async (updateTodo) => {
        const response = await axios.put(`${url}/${updateTodo.id}`, updateTodo)
        return response.data
    }
)

export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id) => {
        const response = await axios.delete(`${url}/${id}`)
        return response.data
    }
)
