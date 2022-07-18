import { Grid, Typography, TextField, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import toast from "react-hot-toast";
import { TodoInterface } from "../../lib/types";

interface Props {
  todo: TodoInterface;
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

export default function Todo(props: Props) {
  const [edit, setEdit] = useState(false);
  const [editedBody, setEditedBody] = useState<string>("");
  useEffect(() => {
    props.todo.body && setEditedBody(props.todo.body);
  }, [props.todo.body]);

  return (
    <Grid item xs={12}>
      {!edit ? (
        <Grid
          container
          rowSpacing={"10px"}
          columnSpacing={"24px"}
          sx={{
            backgroundColor: "#38393A",
            borderRadius: "12px",
            padding: "0px 4px 12px 4px",
          }}
        >
          <Grid item xs={6} md={8}>
            <Typography
              variant="h4"
              sx={{ textDecoration: props.todo.done ? "line-through" : null }}
            >
              {props.todo.body}
            </Typography>
          </Grid>

          <Grid item xs={2} md={1} textAlign={"end"}>
            <IconButton
              onClick={() => {
                props.todo.id &&
                  props.todo.createdAt &&
                  props.deleteTodo(props.todo.id, props.todo.createdAt);
              }}
            >
              <DeleteForeverOutlinedIcon
                color={"error"}
                sx={{
                  marginTop: "-6px",
                }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={2} md={1} textAlign={"end"}>
            <IconButton
              onClick={() => {
                setEdit(true);
              }}
            >
              <EditIcon
                sx={{
                  marginTop: "-6px",
                }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={2} md={1} textAlign={"end"}>
            <IconButton
              onClick={() => {
                if (
                  props.todo.done &&
                  props.todo.id &&
                  props.todo.createdAt &&
                  props.todo.body
                ) {
                  props.completeTodo(
                    props.todo.id,
                    props.todo.createdAt,
                    props.todo.body,
                    false
                  );
                } else if (
                  props.todo.id &&
                  props.todo.createdAt &&
                  props.todo.body
                ) {
                  props.completeTodo(
                    props.todo.id,
                    props.todo.createdAt,
                    props.todo.body,
                    true
                  );
                  toast.success("Nice Work!");
                }
              }}
            >
              {!props.todo.done ? (
                <CheckCircleOutlineOutlinedIcon
                  sx={{
                    margin: "-6px",
                    color: "#0277bd",
                    fontSize: "28px",
                  }}
                />
              ) : (
                <CheckCircleIcon
                  sx={{
                    marginTop: "-6px",
                    color: "#0277bd",
                    fontSize: "28px",
                  }}
                />
              )}
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid container rowSpacing={"16px"} columnSpacing={"16px"}>
            <Grid item xs={9}>
              <TextField
                value={editedBody}
                onChange={(e) => {
                  setEditedBody(e.target.value);
                }}
                sx={{ width: "70%" }}
              />
            </Grid>

            <Grid item xs={1}>
              <IconButton
                onClick={() => {
                  setEdit(false);
                }}
              >
                <CloseIcon color={"error"} />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={() => {
                  props.todo.id &&
                    props.todo.createdAt &&
                    props.editTodo(
                      props.todo.id,
                      props.todo.createdAt,
                      editedBody
                    );
                  props.todo.body && setEditedBody(props.todo.body);
                  setEdit(false);
                }}
              >
                <CheckCircleIcon color={"success"} />
              </IconButton>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
