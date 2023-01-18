import '../src/components/styles/master.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import App from './App';
import React from 'react';
import reportWebVitals from './reportWebVitals';
import theme from './Theme';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
