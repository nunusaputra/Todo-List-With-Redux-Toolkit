import React from "react";
import { Route, Routes } from "react-router-dom";
import TodosList from "../components/TodosList";
import NotFound from "../components/404";
import EditTodos from "../components/EditTodos";
import AddTodos from "../components/AddTodos";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TodosList />} />
        <Route path="/add-todo" element={<AddTodos />} />
        <Route path="/edit/:id" element={<EditTodos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Routers;
