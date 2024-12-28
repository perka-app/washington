import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const UnAuthGuard = ({ comp }: { comp: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const checkForUser = (): void => {
    if (user) {
      navigate(`/customer-page`);
    }
  };

  useEffect(() => {
    checkForUser();
  }, [comp, user]);

  return user ? (
    <React.Fragment></React.Fragment>
  ) : (
    <React.Fragment>{comp}</React.Fragment>
  );
};
