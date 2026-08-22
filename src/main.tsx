import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './fonts.css';
import './styles.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('RouteBudget root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
