import React from 'react';
import ReactDOM from 'react-dom/client';
import { App }  from 'components/App';

import "../node_modules/normalize.css/normalize.css";
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
