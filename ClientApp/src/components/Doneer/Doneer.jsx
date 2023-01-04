import { Route, Routes } from 'react-router-dom';
import DoneerOverzicht from './Componenten/DoneerOverzicht';

export default function Doneer() {
    return (    
        <Routes>
            <Route path='/' element={<DoneerOverzicht />} />
        </Routes>
    );
}