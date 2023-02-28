import { Grid } from "@mui/material";
import { TodoInterface } from "../../lib/types";
import Todo from "../Todo";

interface Props {
  todos: TodoInterface[] | undefined;
}
export default function TodoList(props: Props) {
  return (
    <>
      <Grid container textAlign={"start"} rowSpacing={"32px"}>
        {props.todos
          ? props.todos.map((todo: TodoInterface, i) => (
              <>
                <Todo key={i} todo={todo} />
              </>
            ))
          : null}
      </Grid>
    </>
  );
}
