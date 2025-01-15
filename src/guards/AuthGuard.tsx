import React, { ReactNode, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { isAuthorizedSelector } from 'state/user/user.selector'

export const AuthGuard = ({ comp }: { comp: ReactNode }) => {
  const navigate = useNavigate()
  const authorized = useSelector(isAuthorizedSelector)

  const checkForAuthorization = useCallback(() => {
    if (!authorized) {
      navigate(`/login`)
    }
  }, [authorized, navigate])

  useEffect(() => {
    checkForAuthorization()
  }, [comp, authorized, checkForAuthorization])

  return !authorized ? (
    <React.Fragment></React.Fragment>
  ) : (
    <React.Fragment>{comp}</React.Fragment>
  )
}
