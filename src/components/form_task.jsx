import { useState, useEffect } from "react";

import axios from "axios";
import "../styles/form.css"

function FormTask({ selectedTask }) {

  const today = new Date().toISOString().split("T")[0];
  const [role, setRole] = useState("create");
  const [task, setTask] = useState({
    id: Date.now(),
    title: "",
    discription: "",
    date: today,          // auto-created (not input)
    finished: false,
    difficulty: "",
  });


  // selectedTask is a state comes from parent to help me update an task
  useEffect(() => {
    if (selectedTask) {
      setTask({
        ...task, title: selectedTask.title,
        discription: selectedTask.discription,
        difficulty: selectedTask.difficulty
      });
      setRole("update")
    }
  }, [selectedTask]);

  function validation() {
    if (task.title == "" || task.discription == "" || task.difficulty == "" || task.difficulty == "SD") {
      alert("data not valid");
      return false
    }
    else {
      return true
    }
  }

  function POSTData(e) {
    e.preventDefault();
    if (validation()) {
      axios.post("http://127.0.0.1:5000/tasks", task).then(
        (res) => res.data
      )

    }
  }

  function PUTData(e) {
    e.preventDefault();
    if (validation()) {
      axios.put(`http://127.0.0.1:5000/tasks/${selectedTask.id}`, { ...task, id: selectedTask.id, finished: selectedTask.finished })
      setRole("create")
      setTask({ ...task, title: "", discription: "", difficulty: "" })
    }
  }

  // generic onChange handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  // clear the form :
  function clearAll() {
     setTask({ ...task, title: "", discription: "", difficulty: "" })
  }
  return (
    <form className="form-task">
      {/* Title */}
      <input
        className="input"
        id="title"
        type="text"
        name="title"
        placeholder="Task title"
        value={task.title}
        onChange={handleChange}
      />

      {/* Description */}
      <textarea
        className="input"
        id="discription"
        name="discription"
        placeholder="Task description"
        value={task.discription}
        onChange={handleChange}
      />

      {/* Difficulty */}
      <select
        className="input"
        id="difficulty"
        name="difficulty"
        value={task.difficulty}
        onChange={handleChange}
      >
        <option value="SD">select difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <div className="buttons">
        <input type="submit" onClick={role == "create" ? POSTData : PUTData} className="btn bg-primary col-6" value={role} />
        <input type="button" value="clear all" className="btn bg-warning col-6" onClick={clearAll}/>
      </div>
    </form>
  );
}

export default FormTask;
