import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TodoList from "../TodoList";
import toast, { Toaster } from "react-hot-toast";
import { TodoInterface } from "../../lib/types";
import { TODOS_API, TODO_API } from "../../constants/constants";

export default function TodoForm() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoInterface[] | undefined>([]);

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errorMessage = () => {
    toast.error("Something went wrong, please try again later");
  };

  const getTodos = () => {
    fetch(TODOS_API, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => err && errorMessage());
  };

  const createTodo = () => {
    fetch(TODO_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: todo,
        date: new Date(),
      }),
    })
      .then((res) => {
        res.json();
        toast.success("Todo Created");
      })
      .catch((err) => err && errorMessage());
  };

  const submit = () => {
    createTodo();
    setTodo("");
  };

  return (
    <>
      <Toaster />
      <>
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
            <TodoList todos={todos} />
          </Grid>
        </Grid>
      </>
    </>
  );
}
