import { Route, Routes } from 'react-router-dom';
import BeheerOverzicht from './Componenten/BeheerOverzicht';
import BeheerShows from './Componenten/BeheerShows';
import PrintbareKaartjesHoudersOverzicht from './Componenten/PrintbareKaartjesHoudersOverzicht';
import ShowToevoegen from './Componenten/ShowToevoegen';

export default function Beheer() {
    return (
        <Routes>
            <Route path='/' element={<BeheerOverzicht />} />
            <Route path='/show-toevoegen' element={<ShowToevoegen />} />
            <Route path='/shows' element={<BeheerShows/>} />
            <Route path='/shows/:showId' element={<PrintbareKaartjesHoudersOverzicht />} />
        </Routes>
    )
}