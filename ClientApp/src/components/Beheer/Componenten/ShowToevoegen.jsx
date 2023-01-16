import { Autocomplete, Button, FormLabel, styled, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import voorstellingService from '../../Services/voorstellingService';

const StyledFormDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    boxShadow: '2px 2px 2px grey',
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
}));

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function ShowToevoegen() {
    const [isLoading, setIsLoading] = useState(false);
    const [voorstellingen, setVoorstellingen] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        setIsLoading(true);

        try {
            const fetchedVoorstellingen = await voorstellingService.getAll();
            setVoorstellingen(fetchedVoorstellingen);
            console.log(fetchedVoorstellingen);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSubmit(event) {
        console.log(event);
        // setIsLoading(true);

        // try {
        //     const bedrag = event.target[0].value;
        //     const tekst = event.target[2].value;
        //     // await donatieService.postDonatie(userAccesToken, goedDoelId, bedrag, tekst);
        //     // navigate('/doneren')
        // } catch (error) {
        //     console.log(error);
        // } finally {
        //     setIsLoading(false);
        // }
    }

    return (
        <StyledFormDiv>
            <Typography variant='h3' sx={{ mb: 2 }}>Show toevoegen</Typography>
            <StyledForm onSubmit={handleSubmit}>
                <FormLabel sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    Start tijd: 
                    <TextField
                        name='startDateTime'
                        type='datetime-local'
                        sx={{ ml: 1 }}
                        variant='outlined'
                        required
                    />
                </FormLabel>
                <FormLabel sx={{ mb: 2, display: 'flex', alignItems: 'center',  justifyContent: 'space-between'}}>
                    Eind tijd:
                    <TextField
                        name='endDateTime'
                        type='datetime-local'
                        sx={{ ml: 1 }}
                        variant='outlined'
                        required
                    />
                </FormLabel>
                {/* <FormLabel sx={{ mb: 2, display: 'flex', alignItems: 'center',  justifyContent: 'space-between'}}>
                    Eind tijd:
                    <Autocomplete
                    />
                </FormLabel> */}
                <Button variant='contained' type='submit' disabled={isLoading} sx={{ p: 2 }}>Voeg toe</Button> 
            </StyledForm>
        </StyledFormDiv>
    )
}