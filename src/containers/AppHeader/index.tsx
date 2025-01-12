import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppDispatch } from "state/store";

import { clearUser } from "state/user/user.slice";
import { userSelector } from "state/user/user.selector";
import "./styles.css";

export default function AppHeader() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(clearUser());
  };

  return (
    <div className="AppHeader">
        
      <Typography variant="h4" className="AppHeader-Logo">
        PERKA
      </Typography>

      {user ? (
        <div className="AppHeader-UserControls">
          <Typography variant="h6">{user.name}</Typography>
          
          <Button
            variant="outlined"
            onClick={logout}
            startIcon={<LogoutIcon />}
            className="AppHeader-LogoutButton"
          >
            Logout
          </Button>
        </div>
      ) : null}
    </div>
  );
}
