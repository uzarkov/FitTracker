import React from 'react';
import { AuthProvider } from './src/contexts/auth-context/authContext';
import { SignInView } from './src/views/SignInView';

export default App = () => {
  return (
    <AuthProvider>
      <SignInView />
    </AuthProvider>
  );
}


