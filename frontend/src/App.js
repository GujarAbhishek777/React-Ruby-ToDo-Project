import './App.css';
import React, { useState } from "react";
import axios from 'axios'

// const API_URL = process.env.REACT_APP_API_URL;

function App() {
    
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput(""); // Clear the input field
    }
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const saveTasks = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/save_tasks`,
        { tasks },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        alert("Tasks saved successfully!");
      } else {
        alert("Failed to save tasks. Please try again.");
      }
    } catch (error) {
      console.error("Error saving tasks:", error);
      alert("An error occurred while saving tasks.");
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a task..."
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{ textDecoration: task.completed ? "line-through" : "" }}
          >
            {task.text}
            <button onClick={() => toggleComplete(index)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <button className="save-button" onClick={saveTasks}>
        Save To-Do List
      </button>
    </div>
  );

}

export default App;
