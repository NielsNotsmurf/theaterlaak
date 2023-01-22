import { Route, Routes } from 'react-router-dom';
import BeheerOverzicht from './Componenten/BeheerOverzicht';
import BeheerShows from './Componenten/BeheerShows';
import BetrokkeneToevoegen from './Componenten/BetrokkeneToevoegen';
import DataOverzicht from './Componenten/DataOverzicht';
import PrintbareKaartjesHoudersOverzicht from './Componenten/PrintbareKaartjesHoudersOverzicht';
import ShowToevoegen from './Componenten/ShowToevoegen';
import VoorstellingToevoegen from './Componenten/VoorstellingToevoegen';

export default function Beheer() {
    return (
        <Routes>
            <Route path='/' element={<BeheerOverzicht />} />
            <Route path='/show-toevoegen' element={<ShowToevoegen />} />
            <Route path='/betrokkene-toevoegen' element={<BetrokkeneToevoegen />} />
            <Route path='/voorstelling-toevoegen' element={<VoorstellingToevoegen />} />
            <Route path='/shows' element={<BeheerShows/>} />
            <Route path='/shows/:showId' element={<PrintbareKaartjesHoudersOverzicht />} />
            <Route path='/dataOverzicht' element={<DataOverzicht />} />
        </Routes>
    )
}