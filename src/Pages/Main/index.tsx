import { Grid } from "@mui/material";

import TodoForm from "../../Components/TodoForm";

export default function Main() {
  return (
    <Grid container sx={{ backgroundColor: "#4A4C4D", height: "100vh" }}>
      <Grid container sx={{ marginTop: "120px" }} justifyContent={"center"}>
        <Grid item xs={12} md={6}>
          <Grid
            container
            boxShadow={20}
            spacing={"20px"}
            sx={{ background: "#252627", borderRadius: "16px" }}
          >
            <TodoForm />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
