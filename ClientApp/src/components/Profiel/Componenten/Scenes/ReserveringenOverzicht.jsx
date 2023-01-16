import { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../../MainContext';
import ProfielService from '../../ProfielService';


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
            const fetchedReserveringen = await ProfielService.getReserveringenByUserId(user.id)
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
                <>{reservering.startTijd + reservering.eindTijd + reservering.voorstellingTitle}</>
            ): <>niks gevonden</>}
        </>
    )
}