import React from 'react'

type DebugInfoProps = {
  info: string | number
}

export const DebugInfo: React.FC<DebugInfoProps> = ({ info }) => {
  return (
    <div style={{ position: 'fixed', bottom: '10px', left: '40px' }}>
      <p style={{ fontSize: 'small' }}>Debug info: {info}</p>
    </div>
  )
}
