import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import { TodoContext, TodoContextType } from "../../Provider/TodoContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { username, logout } = useContext(TodoContext) as TodoContextType;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      return;
    }

    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const newTodoItem: Todo = {
      id: newId,
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <div className={styles.logout}>
        {" "}
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className={styles.todo}>
        <h1>Welcome {username}</h1>
        <h2>Todos</h2>
        <div className={styles.todo_input}>
          <input type="text" value={newTodo} onChange={handleInputChange} />
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
