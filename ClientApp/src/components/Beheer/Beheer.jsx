import { Route, Routes } from 'react-router-dom';
import BeheerOverzicht from './Componenten/BeheerOverzicht';
import BeheerShows from './Componenten/BeheerShows';
import PrintbareKaartjesHoudersOverzicht from './Componenten/PrintbareKaartjesHoudersOverzicht';

export default function Beheer() {
    return (
        <Routes>
            <Route path='/' element={<BeheerOverzicht />} />

            <Route path='/shows' element={<BeheerShows/>} />
            <Route path='/shows/:showId' element={<PrintbareKaartjesHoudersOverzicht />} />
        </Routes>
    )
}