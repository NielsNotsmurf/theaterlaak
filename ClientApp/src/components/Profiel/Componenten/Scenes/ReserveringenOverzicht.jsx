import { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../../MainContext';
import reserveringService from '../../../Services/reserveringService';
import { formatDateTime } from '../../../Helpers/format';


export default function ReserveringenOverzicht() {
    const { user } = useContext(MainContext);
    const [reserveringen, setReserveringen] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchReserveringen();
    }, [])

    async function fetchReserveringen() {
        setIsLoading(true);

        try {
            const fetchedReserveringen = await reserveringService.getReserveringenByUserId(user.id)
            console.log(fetchedReserveringen);
            setReserveringen(fetchedReserveringen);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (<>Aan het laden...</>)
    }

    return (
        <>
            {reserveringen && reserveringen.length > 0 ? reserveringen.map((reservering) => 
                <>
                    StartTijd: {formatDateTime(new Date(reservering.startTijd))}<br/>
                    EindTijd: {formatDateTime(new Date(reservering.eindTijd))}<br/>
                    Voorstelling: {reservering.voorstellingTitle}<br/>
                </>
            ): <>niks gevonden</>}
        </>
    )
}