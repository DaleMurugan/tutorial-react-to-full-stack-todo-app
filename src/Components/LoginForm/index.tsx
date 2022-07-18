import { Button, Grid, TextField, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useGlobalUserContext } from "../../context";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useGlobalUserContext();

  const handleSubmit = async () => {
    try {
      const user = await Auth.signIn(email, password);
      if (
        user.challengeName &&
        user.challengeName === "NEW_PASSWORD_REQUIRED"
      ) {
        await Auth.completeNewPassword(user, password);
        await Auth.signIn(email, password);
      }
      setUser(user);
    } catch (error) {
      error && toast.error("username and password invalid");
    }
  };
  return (
    <>
      <Toaster />
      <Grid
        container
        sx={{
          marginRight: "40px",
          marginLeft: "40px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
        spacing={3}
      >
        <Grid item xs={12} textAlign="center">
          <Typography variant="h2">Login</Typography>
        </Grid>
        <Grid item xs={12} textAlign={"center"}>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={"Email"}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item xs={12} textAlign={"center"}>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            type="password"
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item xs={12} textAlign={"center"} sx={{ paddingBottom: "16px" }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
