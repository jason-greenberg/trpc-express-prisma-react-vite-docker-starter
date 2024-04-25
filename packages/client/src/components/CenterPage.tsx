import React from 'react';
import { Pane } from 'evergreen-ui';

interface CenterProps {
  children: React.ReactNode;
}

const Center: React.FC<CenterProps> = ({ children }) => {
  return (
    <Pane
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {children}
    </Pane>
  );
};

export default Center;
