import * as React from 'react'

export function Width({ children, width }: { children?: React.ReactNode; width?: number | string }) {
  return (
    <div style={{ maxWidth: width ? `${width}%` : undefined }}>
      {children}
    </div>
  )
}
