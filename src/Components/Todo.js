import React, { useState, useEffect } from "react";
import "./Todo.css";

function Todo() {

  // Load todos from local storage on initial render
  const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];

  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState("");

  // Save todos to local storage whenever the state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() !== "") {
      const newTodo = {
        text: input,
        completed: false,
        timestamp: Date.now(),
      };
      alert("Task added successfully");

      setTodos([newTodo, ...todos]);
      setInput("");
    }
  };

  const markAsComplete = (timestamp) => {
    const updatedTodos = todos.map((todo) =>
      todo.timestamp === timestamp
        ? { ...todo, completed: !todo.completed }
        : todo
    );
    alert("Congratulation: You have Completed the Task");
    setTodos(updatedTodos);
  };

  const resetTodos = () => {
    setTodos([]);
    setInput("");
    alert("Reset Done Successfully");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO APP</h1>
        <div>
          <input
            type="text"
            placeholder="Add a new TODO"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
          />
          <button onClick={addTodo}>Add</button>
          <div className="reset-button"> 
          Reset
          <i className="fa-solid fa-rotate fa-shake" 
          style={{color: "red"}} 
          onClick={resetTodos}>
          </i>
          </div>
        </div>
        <div className="todo-list">
          <h3>Active Task</h3><hr/>
          {todos
            .filter((todo) => !todo.completed)
            .map((todo) => (
              <div
                key={todo.timestamp}
                className={`todo ${todo.completed ? "completed" : ""}`}
                onClick={() => markAsComplete(todo.timestamp)}
              >
                {todo.text}
              </div>
            ))}
          <h3>Completed Task</h3><hr/>
          {todos
            .filter((todo) => todo.completed)
            .map((todo) => (
              <div
                key={todo.timestamp}
                className={`todo completed`}
                onClick={() => markAsComplete(todo.timestamp)}
              >
                {todo.text}
              </div>
            ))}
        </div>
      </header>
    </div>
  );
}

export default Todo;
