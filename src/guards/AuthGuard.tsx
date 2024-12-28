import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthGuard = ({ comp }: { comp: ReactNode }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const checkToken = () => {
    if (!user) {
      navigate(`/login`);
    }
  };

  useEffect(() => {
    checkToken();
  }, [comp, user]);

  return !user ? (
    <React.Fragment></React.Fragment>
  ) : (
    <React.Fragment>{comp}</React.Fragment>
  );
};
