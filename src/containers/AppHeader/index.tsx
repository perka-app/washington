import React from 'react';
import { cn } from '@bem-react/classname'
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { userSelector } from "state/user/user.selector";
import { AppDispatch } from "state/store";
import { clearUser } from "state/user/user.slice";

import "./styles.css";

export default function AppHeader() {
  const bem = cn('AppHeader');
  const user = useSelector(userSelector);
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(clearUser());
  };

  return (
    <div className={bem()}>
      <Typography variant="h4" className={bem('Logo')}>
        PERKA
      </Typography>

      {user ? (
        <div className={bem('UserControls')}>
          <Typography variant="h6">{user.name}</Typography>
          
          <Button
            variant="outlined"
            onClick={logout}
            startIcon={<LogoutIcon />}
            className={bem('LogoutButton')}
          >
            Logout
          </Button>
        </div>
      ) : null}
    </div>
  );
}
