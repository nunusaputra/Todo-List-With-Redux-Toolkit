import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, getDataTodos } from "../redux/Actions/TodosActions";
import { PacmanLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const TodosList = () => {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.todo);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    dispatch(getDataTodos());
  }, []);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    setShow(false);
    toast.success("Success Delete Todo");
  };

  return (
    <div className="container">
      {isLoading ? (
        <div className="container-style">
          <PacmanLoader color="#36d7b7" size={30} cssOverride={override} />
        </div>
      ) : (
        <>
          <h1 className="text-center mt-4 mb-4">Todo List With Redux</h1>
          <Link to="/add-todo" className="btn btn-primary mt-3 mb-3">
            Create Todo
          </Link>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.isDone ? "✅" : "❌"}</td>
                  <td>
                    <Link to={`/edit/${item.id}`}>
                      <FaEdit color="black" />
                    </Link>
                    <RiDeleteBack2Fill
                      className="ms-3"
                      onClick={handleShow}
                      cursor={"pointer"}
                    />

                    <Modal show={show} onHide={handleClose} centered>
                      <Modal.Header closeButton>Delete Todos</Modal.Header>
                      <Modal.Body>
                        <p>Are you sure you want to delete this todos?</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default TodosList;
