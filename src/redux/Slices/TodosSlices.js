import { createSlice } from "@reduxjs/toolkit";
import {
  addNewTodo,
  deleteTodo,
  editTodo,
  getDataTodos,
} from "../Actions/TodosActions";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Get TODO

    builder.addCase(getDataTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDataTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getDataTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Add TODO
    builder.addCase(addNewTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addNewTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addNewTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Edit TODO
    builder.addCase(editTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      const { id, title, isDone } = action.payload;
      const todo = state.data.filter((item) => item.id === id);
      if (todo) {
        (todo.title = title), (todo.isDone = isDone);
      }
    });
    builder.addCase(editTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Delete TODO
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      const { id } = action.payload;
      const user = state.data.filter((user) => user.id !== id);
      state.data = user;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default todosSlice.reducer;
