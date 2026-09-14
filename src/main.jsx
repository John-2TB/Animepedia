import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './pages/App.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimePage from './pages/AnimePage.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/anime/:id' element={<AnimePage />} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    </StrictMode>
);
