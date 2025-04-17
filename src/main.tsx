import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Make sure the root element exists
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find root element");

// Create and render the app
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
