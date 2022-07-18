import { Grid } from "@mui/material";
import { TodoInterface } from "../../lib/types";
import Todo from "../Todo";

interface Props {
  todos: TodoInterface[] | undefined;
  deleteTodo: (id: string, createdAt: string) => void;
  editTodo: (id: string, createdAt: string, editedTodo: string) => void;
  getTodos: () => void;
  completeTodo: (
    id: string,
    createdAt: string,
    body: string,
    done: boolean
  ) => void;
}
export default function TodoList(props: Props) {
  return (
    <>
      <Grid container textAlign={"start"} rowSpacing={"32px"}>
        {props.todos
          ? props.todos.map((todo: TodoInterface) => (
              <>
                <Todo
                  key={`${todo.id}${todo.createdAt}`}
                  todo={todo}
                  deleteTodo={props.deleteTodo}
                  editTodo={props.editTodo}
                  getTodos={props.getTodos}
                  completeTodo={props.completeTodo}
                />
              </>
            ))
          : null}
      </Grid>
    </>
  );
}
