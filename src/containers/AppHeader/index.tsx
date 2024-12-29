import React from "react";
import { Button } from "src/components/ui/button";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "state/user/user.selector";
import { clearUser } from "state/user/user.slice";
import { LogOut } from "lucide-react";

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
        <div className="ml-auto flex items-center">
          <h1>{user.name}</h1>
          <Button variant="outline" onClick={logout} className=" ml-10">
            Logout
            <LogOut />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
