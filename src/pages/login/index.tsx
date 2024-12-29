import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "state/user/user.slice";
import BaseContainer from "components/perka/Board";
import { TextField, Button } from "@mui/material";
import "./styles.css";

export default function LoginPage() {
  const dispatch = useDispatch();

  const login = () => {
    dispatch(
      setUser({
        name: "Test Organisation",
      })
    );
  };

  return (
    <div className="Container">
      <BaseContainer>
        <h1>Login Page</h1>
        <TextField
          id="login"
          label="Login"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button
          onClick={login}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Login
        </Button>
      </BaseContainer>
    </div>
  );
}
