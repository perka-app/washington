import BaseContainer from "components/perka/BaseContainer";
import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "state/user/user.slice";
import { Label } from "@radix-ui/react-label";
import { Input } from "components/ui/input";
import "./styles.css";
import { Button } from "src/components/ui/button";

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
    <div>
      <BaseContainer className="Container">
        <h1>Login Page</h1>
        <Label htmlFor="login">Accept terms and conditions</Label>
        <Input id="login" placeholder="your_login" />

        <Label htmlFor="password">Accept terms and conditions</Label>
        <Input id="password" type="password" placeholder="password" />
        <Button onClick={login}>Login</Button>
      </BaseContainer>
    </div>
  );
}
