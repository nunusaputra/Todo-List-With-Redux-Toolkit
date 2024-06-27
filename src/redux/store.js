import { configureStore } from "@reduxjs/toolkit";
import TodosSlices from "./Slices/TodosSlices";

const store = configureStore({
    reducer: {
        todo: TodosSlices
    }
})

export default store