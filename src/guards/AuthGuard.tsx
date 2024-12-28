import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AuthGuard = ({ comp }: { comp: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(true);

  const checkForUser = () => {
    if (!user) {
      navigate(`/login`);
    }
  };

  useEffect(() => {
    checkForUser();
  }, [comp, user]);

  return !user ? (
    <React.Fragment></React.Fragment>
  ) : (
    <React.Fragment>{comp}</React.Fragment>
  );
};
