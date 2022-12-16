import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestElement from './Modules/Main/TestElement';

const Main = React.lazy(() => import(/* webpackChunkName: 'main-component' */ './Modules/Main/Main'));

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} >
                    <Route path='/' element={<TestElement />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
