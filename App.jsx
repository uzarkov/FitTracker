import React from 'react';
import { AuthProvider } from './src/contexts/auth-context/authContext';
import { ApplicationRouter } from './src/router/ApplicationRouter';

export default App = () => {
  return (
    <AuthProvider>
      <ApplicationRouter />
    </AuthProvider>
  );
}


