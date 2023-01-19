import { Button, FormLabel, IconButton, MenuItem, Select, styled, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import voorstellingService from '../../Services/voorstellingService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import betrokkeneService from '../../Services/betrokkeneService';

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

const InlineDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

export default function ShowToevoegen() {
    const [isLoading, setIsLoading] = useState(false);
    const [betrokkenen, setBetrokkenen] = useState([]);

    const initialState = { titel: '', omschrijving: '', afbeeldingUrl: '', betrokkene: '' }

    const [inputs, setInputs] = useState(initialState);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        setIsLoading(true);

        try {
            const fetchedBetrokkenen = await betrokkeneService.getAll();
            setBetrokkenen(fetchedBetrokkenen);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    function handleChange(event) {
        setInputs(values => ({...values, [event.target.name]: event.target.value}))
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            await voorstellingService.add(inputs.titel, inputs.omschrijving, inputs.afbeeldingUrl, inputs.betrokkene)
            console.log('succes');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <StyledFormDiv>
            <InlineDiv>
                <IconButton onClick={() => navigate('/beheer')}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant='h3'>Voorstelling toevoegen</Typography>
            </InlineDiv>
            <StyledForm onSubmit={handleSubmit}>
                <FormLabel sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    Titel: 
                    <TextField
                        name='titel'
                        onChange={handleChange}
                        required
                        sx={{ width: 250, ml: 1 }}
                        type='text'
                        variant='outlined'
                    />
                </FormLabel>
                <FormLabel sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    Omschrijving: 
                    <TextField
                        name='omschrijving'
                        onChange={handleChange}
                        required
                        sx={{ width: 250, ml: 1 }}
                        type='text'
                        variant='outlined'
                        multiline
                        rows={3}
                    />
                </FormLabel>
                <FormLabel sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    Afbeelding url: 
                    <TextField
                        name='afbeeldingUrl'
                        onChange={handleChange}
                        required
                        sx={{ width: 250, ml: 1 }}
                        type='text'
                        variant='outlined'
                    />
                </FormLabel>
                <FormLabel sx={{ mb: 2, display: 'flex', alignItems: 'center',  justifyContent: 'space-between'}}>
                    Betrokkene:
                    <Select
                        name='betrokkene'
                        value={inputs.betrokkene}
                        onChange={handleChange}
                        sx={{ width: 250, ml: 1 }}
                    >
                        <MenuItem value={''}><em>Geen</em></MenuItem>
                        {betrokkenen.map((betrokkene, index) => 
                            <MenuItem key={index} value={betrokkene.id}>{betrokkene.typePersoon + ': ' + betrokkene.naam}</MenuItem>
                        )}
                    </Select>
                </FormLabel>
                <Button variant='contained' type='submit' disabled={isLoading} sx={{ p: 2 }}>Voeg toe</Button> 
            </StyledForm>
        </StyledFormDiv>
    )
}