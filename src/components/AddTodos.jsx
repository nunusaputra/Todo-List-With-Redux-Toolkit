import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewTodo } from "../redux/Actions/TodosActions";
import { toast } from "react-toastify";
import { HashLoader, PacmanLoader } from "react-spinners";

const AddTodos = () => {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.todo);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    isDone: false,
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      isDone: e.target.value === "true" ? true : false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      title: input.title,
      isDone: input.isDone,
    };

    dispatch(addNewTodo(newTodo));
    toast.success("Success Add New Todo");
    navigate("/");
  };
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-dark rounded shadow-lg text-white p-5">
        {isLoading ? (
          <PacmanLoader
            color="#36d7b7"
            size={30}
            cssOverride={override}
            className="container-style"
          />
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-center mb-2">Add New Todo</h2>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                New Todo
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Input Todo"
                value={input.title}
                onChange={handleInput}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="isDone" className="form-label">
                Status
              </label>
              <select
                name="isDone"
                id="isDone"
                className="form-select"
                value={input.isDone}
                onChange={handleSelect}
              >
                <option value="true">Selesai</option>
                <option value="false">Belum Selesai</option>
              </select>
            </div>
            <button className="btn btn-success w-100">
              {isLoading ? (
                <HashLoader color="#fff" size={10} />
              ) : (
                <span>Submit</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddTodos;
