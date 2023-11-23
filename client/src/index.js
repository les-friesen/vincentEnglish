import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { ReloadProvider } from './components/ReloadContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReloadProvider>
      <App />
    </ReloadProvider>
  </React.StrictMode>
);


