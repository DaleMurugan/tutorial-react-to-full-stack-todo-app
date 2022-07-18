import { Grid } from "@mui/material";

import LoginForm from "../../Components/LoginForm";

export default function Login() {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "#4A4C4D",
        height: "100vh",
      }}
    >
      <Grid container sx={{ marginTop: "120px" }} justifyContent={"center"}>
        <Grid item xs={12} md={6}>
          <Grid
            container
            boxShadow={20}
            spacing={"20px"}
            sx={{ background: "#252627", borderRadius: "16px" }}
          >
            <LoginForm />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
