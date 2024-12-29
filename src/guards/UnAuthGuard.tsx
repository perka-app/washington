import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { isAuthorizedSelector } from "state/user/user.selector";

export const UnAuthGuard = ({ comp }: { comp: ReactNode }) => {
  const navigate = useNavigate();
  const authorized = useSelector(isAuthorizedSelector);

  const checkForAuthorization = (): void => {
    if (authorized) {
      navigate(`/`);
    }
  };

  useEffect(() => {
    checkForAuthorization();
  }, [comp, authorized]);

  return authorized ? (
    <React.Fragment></React.Fragment>
  ) : (
    <React.Fragment>{comp}</React.Fragment>
  );
};
