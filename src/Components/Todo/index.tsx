import { Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { TodoInterface } from "../../lib/types";

interface Props {
  todo: TodoInterface;
}

export default function Todo(props: Props) {
  const [editedBody, setEditedBody] = useState<string>("");
  useEffect(() => {
    props.todo.body && setEditedBody(props.todo.body);
  }, [props.todo.body]);

  return (
    <Grid item xs={12}>
      <>
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
        </Grid>
      </>
    </Grid>
  );
}
