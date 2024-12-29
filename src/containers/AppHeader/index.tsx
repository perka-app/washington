import React from "react";
import { Button } from "src/components/ui/button";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "state/user/user.selector";
import { clearUser } from "state/user/user.slice";

export default function AppHeader() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearUser());
  };

  return (
    <div className="AppHeader center-vertical">
      <h1 className="text-left">PERKA</h1>

      {user ? (
        <div className="ml-auto">
          <h1>{user.name}</h1>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      ) : null}
    </div>
  );
}
