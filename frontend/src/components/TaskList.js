import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import "./TaskApp.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  // Set task for editing
  const handleEdit = (task) => {
    setEditTask(task);  // Set the task to be edited
    setTitle(task.title);  // Set the title in the form
    setDescription(task.description);  // Set the description in the form
  };

  // Update task
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Send PUT request to update the task
    await axios.put(`http://localhost:5000/api/tasks/${editTask._id}`, {
      title,
      description,
    });

    // Reset editing state and refetch tasks
    setEditTask(null);
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>Task Tracker</h1>
      <TaskForm fetchTasks={fetchTasks} />

      {editTask && (
        <div>
          <h2>Edit Task</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Update Task</button>
          </form>
        </div>
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
            </div>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
            <button onClick={() => handleEdit(task)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
