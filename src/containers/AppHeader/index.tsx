import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { clearUser } from "state/user/user.slice";
import { userSelector } from "state/user/user.selector";
import "./styles.css";

export default function AppHeader() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearUser());
  };

  return (
    <div className="app-header">
      <Typography variant="h4" className="text-left">
        PERKA
      </Typography>

      {user ? (
        <div className="user-controls">
          <Typography variant="h6">{user.name}</Typography>
          <Button
            variant="outlined"
            onClick={logout}
            startIcon={<LogoutIcon />}
            className="logout-button"
          >
            Logout
          </Button>
        </div>
      ) : null}
    </div>
  );
}
