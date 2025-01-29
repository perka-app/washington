import React, { ReactNode, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { isAuthorizedSelector } from 'state/user/user.selectors'

export const UnAuthGuard = ({ comp }: { comp: ReactNode }) => {
  const navigate = useNavigate()
  const authorized = useSelector(isAuthorizedSelector)
  const checkForAuthorization = useCallback((): void => {
    if (authorized) {
      navigate(`/`)
    }
  }, [authorized, navigate])

  useEffect(() => {
    checkForAuthorization()
  }, [comp, authorized, checkForAuthorization])

  return authorized ? (
    <React.Fragment></React.Fragment>
  ) : (
    <React.Fragment>{comp}</React.Fragment>
  )
}
