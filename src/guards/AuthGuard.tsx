import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { isAuthorizedSelector } from "state/user/user.selector";

export const AuthGuard = ({ comp }: { comp: ReactNode }) => {
  const navigate = useNavigate();
  const authorized = useSelector(isAuthorizedSelector);

  const checkForAuthorization = () => {
    if (!authorized) {
      navigate(`/login`);
    }
  };

  useEffect(() => {
    checkForAuthorization();
  }, [comp, authorized]);

  return !authorized ? (
    <React.Fragment></React.Fragment>
  ) : (
    <React.Fragment>{comp}</React.Fragment>
  );
};
