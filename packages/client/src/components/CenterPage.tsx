import React from 'react'
import { Pane, PaneProps } from 'evergreen-ui'

interface CenterProps extends PaneProps {
  children: React.ReactNode
}

const Center: React.FC<CenterProps> = ({ children, ...rest }) => {
  return (
    <Pane
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      {...rest}
    >
      {children}
    </Pane>
  )
}

export default Center
