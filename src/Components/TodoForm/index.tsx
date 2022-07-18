import { Button, Grid, TextField, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useGlobalUserContext } from "../../context";
import TodoList from "../TodoList";
import toast, { Toaster } from "react-hot-toast";
import { TodoInterface } from "../../lib/types";
import { TODOS_API, TODO_API } from "../../constants/constants";

export default function FeedbackForm() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoInterface[] | undefined>([]);
  const { user, setUser } = useGlobalUserContext();
  const [token, setToken] = useState<string | undefined>("");

  useEffect(() => {
    if (user?.signInUserSession) {
      setToken(user.signInUserSession.idToken.jwtToken);
      getTodos();
    }
  }, [user, token]);

  const errorMessage = () => {
    toast.error("Something went wrong, please try again later");
  };

  const deleteMessage = () => {
    toast.error("Todo Deleted");
  };
  const successMessage = (successMessage: string) => {
    toast.success(successMessage);
  };

  const getTodos = () => {
    token &&
      fetch(TODOS_API, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => setTodos(data.Items))
        .catch((err) => err && errorMessage());
  };

  const saveTodo = () => {
    token &&
      fetch(TODO_API, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: todo,
          done: false,
        }),
      })
        .then((res) => res.json())
        .then((message) => {
          message === "Todo created" && successMessage(message);
          getTodos();
        })
        .catch((err) => err && errorMessage());
  };

  const deleteTodo = (id: string, createdAt: string) => {
    token &&
      fetch(TODO_API, {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          createdAt: createdAt,
        }),
      })
        .then((res) => res.json())
        .then((message) => {
          message === "Deleted" ? deleteMessage() : errorMessage();
          getTodos();
        })
        .catch((err) => err && errorMessage());
  };

  const editTodo = (id: string, createdAt: string, editedTodo: string) => {
    token &&
      fetch(TODO_API, {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          createdAt: createdAt,
          body: editedTodo,
        }),
      })
        .then((res) => res.json())
        .then((message) => {
          message === "Changed Todo" ? successMessage(message) : errorMessage();
          getTodos();
        })
        .catch((err) => err && errorMessage());
  };

  const completeTodo = (
    id: string,
    createdAt: string,
    body: string,
    done: boolean
  ) => {
    token &&
      fetch(TODO_API, {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          createdAt: createdAt,
          body: body,
          done: done,
        }),
      })
        .then((res) => res.json())
        .then((message) => {
          message = !"Changed Todo" ? errorMessage() : null;
          getTodos();
        })
        .catch((err) => err && errorMessage());
  };

  const submit = () => {
    saveTodo();
    setTodo("");
  };

  async function signOut() {
    try {
      await Auth.signOut();
      setUser(null);
      window.localStorage.setItem("auth", "false");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Toaster />
      <>
        <Button onClick={signOut} color={"error"}>
          Sign Out
        </Button>
        <Grid
          container
          sx={{
            marginRight: "25px",
            marginLeft: "25px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          spacing={3}
        >
          <Grid item xs={12} textAlign={"center"}>
            <Typography variant="h2">Today I need to:</Typography>
          </Grid>

          <Grid item xs={12} textAlign={"center"}>
            <TextField
              variant="outlined"
              label={"To do"}
              sx={{ width: "100%" }}
              value={todo}
              onChange={(event) => {
                setTodo(event?.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} textAlign={"center"} padding={"20px"}>
            <Button
              variant="contained"
              onClick={submit}
              sx={{
                borderRadius: "8px",
                background: "#0277bd",
              }}
            >
              Add Todo
            </Button>
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <TodoList
              todos={todos}
              getTodos={getTodos}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              completeTodo={completeTodo}
            />
          </Grid>
        </Grid>
      </>
    </>
  );
}
