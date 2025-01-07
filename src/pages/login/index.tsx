import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "state/store";
import BaseContainer from "components/perka/Board";
import { TextField, Button } from "@mui/material";
import "./styles.css";
import { loginUser } from "state/user/user.thunks";
import { loginProcessSelector } from "state/user/user.selector";

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
    <div className="Container">
      <BaseContainer>
        <h1>Login Page</h1>
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
          style={{ marginTop: "16px" }}
          disabled={loginLoader}
        >
          Login
        </Button>
      </BaseContainer>
    </div>
  );
}
