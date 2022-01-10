import React from 'react';
import { AuthProvider } from './src/contexts/auth-context/authContext';
import { ApplicationRouter } from './src/router/ApplicationRouter';
import Toast from 'react-native-toast-message';
import { toastsConfig } from './src/utils/toasts';

export default App = () => {
  return (
    <AuthProvider>
      <ApplicationRouter />
      <Toast config={toastsConfig} />
    </AuthProvider>
  );
}


