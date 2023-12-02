// // main.js or index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { createRoot } from 'react-dom/client';
// import { initializeIcons } from '@fluentui/font-icons-mdl2';

// initializeIcons();

// // Replace ReactDOM.render with createRoot
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

///////////2nd///////////////////

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initializeIcons } from '@fluentui/font-icons-mdl2';


// Initialize Fluent UI icons
initializeIcons();


// Use createRoot instead of ReactDOM.createRoot
const root = createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
