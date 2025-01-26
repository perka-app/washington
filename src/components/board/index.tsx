import React, { ReactNode } from 'react'

import './styles.css'

type BoardProps = {
  children: ReactNode
  className?: string
}

export const Board: React.FC<BoardProps> = ({ children }) => {
  return <div className="InternalStyles">{children}</div>
}
