import React, { useContext } from "react";
import { TodoContext, TodoContextType } from "../../Provider/TodoContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { login } = useContext(TodoContext) as TodoContextType;

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const token = login(username, password);

    if (token) {
      //navigate dashboard route
      console.log("dashboard");
      navigate("/dashboard");
    } else {
      alert("username or password is wrong");
    }
  };
  return (
    <div className={styles.form}>
      <h1>LogIn</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label>Username </label>
          <input
            type="text"
            name="uname"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input
            type="password"
            name="pass"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={styles.button_container}>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
