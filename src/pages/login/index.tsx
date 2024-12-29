import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "state/user/user.slice";

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
      <h1>Login Page</h1>
      <button onClick={login} className="bg-white text-black p-2">
        Login
      </button>
    </div>
  );
}
