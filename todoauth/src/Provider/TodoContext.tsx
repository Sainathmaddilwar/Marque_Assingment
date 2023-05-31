import * as React from "react";
import data from "../data/data.json";
export const TodoContext = React.createContext<TodoContextType | null>(null);
export type TodoContextType = {
  token: string;
  username: string;
  password: string;
  login: (uname: string, pass: string) => string;
  logout: () => void;
};
const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [todos, setTodos] = React.useState<string>("sai");
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [token, setToken] = React.useState<string>("");
  const login = (uname: string, pass: string) => {
    // console.log(data);
    const user = data.find((user: { username: string; password: string }) => {
      return user.username === uname && user.password === pass;
    });
    try {
      if (user) {
        let currentDate: any = new Date();
        let currTime =
          currentDate.getHours() +
          ":" +
          currentDate.getMinutes() +
          ":" +
          currentDate.getSeconds();
        setUsername(user.username);
        setPassword(user.password);
        setToken(currTime);
        return currTime;
      }
    } catch (e: any) {
      return e;
    }

    return "";
  };
  const logout = () => {
    setUsername("");
    setPassword("");
    setToken("");
  };

  return (
    <TodoContext.Provider value={{ token, username, password, login, logout }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
