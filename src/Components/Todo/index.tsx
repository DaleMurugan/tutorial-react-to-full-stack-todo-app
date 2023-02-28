import { Grid, TextField } from "@mui/material";
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
      (
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
        </Grid>
      </>
    </Grid>
  );
}
