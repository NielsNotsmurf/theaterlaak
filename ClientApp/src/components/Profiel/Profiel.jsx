import { Route, Routes } from 'react-router-dom';
import ProfielOverzicht from './Componenten/ProfielOverzicht';
import ReserveringenOverzicht from './Componenten/Scenes/ReserveringenOverzicht';

export default function Profiel() {
    
    return (
        <Routes>
            <Route path='/' element={<ProfielOverzicht />}/>
            <Route path='/reserveringen' element={<ReserveringenOverzicht />} />
        </Routes>
    );
}