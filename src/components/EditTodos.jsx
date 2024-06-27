import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editTodo, getDataTodos } from "../redux/Actions/TodosActions";
import { toast } from "react-toastify";

const EditTodos = () => {
  const { id } = useParams();
  const discpatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, data, error } = useSelector((state) => state.todo);
  const existTodo = data.find((todo) => todo.id == id);
  const { title, isDone } = existTodo;
  const [input, setInput] = useState({
    title: title,
    status: isDone,
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    setInput((preInput) => ({
      ...preInput,
      status: e.target.value === "true" ? true : false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateTodo = {
      id,
      title: input.title,
      isDone: input.status,
    };

    discpatch(editTodo(updateTodo));
    toast.success("Success Edit Todo");
    navigate("/");
  };


  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-dark rounded shadow-lg text-white p-5">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-2">Edit Todo</h2>
          <div className="mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="title"
              name="title"
              id="title"
              className="form-control"
              value={input.title}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              id="status"
              value={input.status}
              onChange={handleSelect}
              className="form-select"
            >
              <option value="true">Selesai</option>
              <option value="false">Belum Selesai</option>
            </select>
          </div>
          <button className="btn btn-success w-100">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditTodos;
