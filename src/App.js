import "./App.css";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { db } from "./firebase_config";
//import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import TodoListItem from "./Todo";

function App() {
  const [todos, setTodos] = useState([]); //Save list of todos
  //hook
  const [todoInput, setTodoInput] = useState(""); //hook that saves single todo

  function addTodo(e) {
    e.preventDefault(); //preventira ponovno loadiranje klikom na submit botun ili enter

    db.collection("todos").add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });

    setTodoInput("");
  }

  useEffect(() => {
    getTodos();
  }, []); //blank to run only on first launch

  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
  }

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Todo App © by Lucija Mikulic</h1>
        <form>
          <TextField
            id="outlined-basic"
            label="Unesi Todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            style={{ maxWidth: "500px", width: "90vw" }}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={addTodo}
            style={{ display: "none" }} //sakrije botun
          >
            Contained
          </Button>
        </form>

        {todos.map((todo) => (
          <TodoListItem
            todo={todo.todo}
            inprogress={todo.inprogress}
            id={todo.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
