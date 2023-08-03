import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Chakra UI Provider */}
    <ChakraProvider toastOptions={{ defaultOptions: { position: "top-right" } }}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
