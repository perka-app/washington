import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "state/store";
import BaseContainer from "components/perka/Board";
import { TextField, Button, Typography } from "@mui/material";
import { loginUser } from "state/user/user.thunks";
import { loginProcessSelector } from "state/user/user.selector";

import "./styles.scss";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const loginLoader = useSelector(loginProcessSelector);

  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loginHandler = () => {
    const credentials = {
      login,
      password,
    };

    dispatch(loginUser(credentials));
  };

  return (
    <div className="Login">
      <BaseContainer>
        <Typography variant="h6" className="Login-Logo">
          Join our family and stay connected!
        </Typography>

        <TextField
          id="login"
          label="Login"
          variant="outlined"
          fullWidth
          margin="normal"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          onClick={loginHandler}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
          disabled={loginLoader}
        >
          Login
        </Button>
      </BaseContainer>
    </div>
  );
}
