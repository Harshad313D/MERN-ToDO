import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";

import {
  BsCircleFill,
  BsFillTrashFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";

const Home = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.error(err));
  });

  const handleEdit = (id) => {
    axios
      .put("http://localhost:3001/update/" + id)
      .then((result) => {
        // location.reload();
        console.log("task completed", result);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .put("http://localhost:3001/delete/" + id)
      //   .then((result) => console.log("task completed !", result))
      .then((result) => {
        // location.reload();
        console.log("task deleted", result);
      })
      .catch((err) => console.error(err));
    alert("Task deleted successfully");
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center text-3xl font-bold p-4 mt-4 ">ToDo list</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Record found !</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div
            key={todo._id}
            className={` rounded-md w-1/2 flex justify-between p-3 mt-3  ${
              todo.completed ? "bg-green-100" : "bg-blue-100"
            }`}
          >
            <div
              className="flex justify-start gap-10"
              onClick={() => handleEdit(todo._id)}
            >
              {todo.completed ? (
                <BsFillCheckCircleFill className="text-green-600 text-2xl cursor-pointer border-2 rounded-full border-gray-500  " />
              ) : (
                <BsCircleFill className="text-white text-2xl cursor-pointer border-2 rounded-full border-gray-500  " />
              )}

              <div className="flex flex-col">
                <p className={todo.completed ? "line-through" : ""}>
                  {todo.task}
                </p>
                {/* <p className="text-gray-500">{todo.createdAt}</p> */}
              </div>
            </div>

            <div className=" flex justify-end">
              <BsFillTrashFill
                className="text-red-600 cursor-pointer text-2xl"
                onClick={() => handleDelete(todo._id)}
              />
              {/* <BsPencil className="text-blue-600 cursor-pointer text-2xl" /> */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
