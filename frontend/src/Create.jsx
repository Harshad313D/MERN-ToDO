import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  const [task, setTask] = useState();

  const handleAdd = () => {
    axios
      .post("http://localhost:3001/add", { task: task })
      .then((result) => {
        console.log("task added", result);
        location.reload();
      })

      .catch((err) => console.error(err));
    // alert("Task deleted successfully");
  };

  return (
    <div className="text-center mt-4">
      <input
        type="text"
        name="task"
        className="border-2 p-2 border-indigo-500 rounded-md m-2 "
        placeholder="Enter a task "
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        type="button"
        className="rounded-lg p-2 text-white font-medium bg-indigo-500 hover:bg-indigo-700 "
        onClick={handleAdd}
      >
        ADD
      </button>
    </div>
  );
};

export default Create;
