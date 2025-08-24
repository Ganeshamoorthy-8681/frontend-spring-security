
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter} from 'react-router';
import './index.css';
// import AppRoutes from './router/AppRoutes';
// import App from './App';
// import { appRoutes } from './router/app-routes';
// import App from './App';
import AppRoutes from './router/AppRoutes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
);
