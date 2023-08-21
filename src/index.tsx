import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import 'services/translation';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

reportWebVitals();
