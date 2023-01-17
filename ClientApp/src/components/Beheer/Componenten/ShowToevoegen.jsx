import { Button, FormLabel, IconButton, MenuItem, Select, styled, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import momentService from '../../Services/momentService';
import voorstellingService from '../../Services/voorstellingService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const zaaltypes = [
    "Zaal_1",
    "Zaal_2",
    "Zaal_3",
    "Zaal_4",
    "Zaal_5",
]

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
    const [voorstellingen, setVoorstellingen] = useState([]);

    const initialState = { startDateTime: new Date().toISOString().slice(0, -5), endDateTime: new Date().toISOString().slice(0, -5), voorstelling: '', zaalType: '' }

    const [inputs, setInputs] = useState(initialState);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        setIsLoading(true);

        try {
            const fetchedVoorstellingen = await voorstellingService.getAll();
            setVoorstellingen(fetchedVoorstellingen);
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
            await momentService.AddMoment(inputs.startDateTime, inputs.endDateTime, inputs.voorstelling, zaaltypes.findIndex(type => type === inputs.zaalType))
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
                <Typography variant='h3'>Show toevoegen</Typography>
            </InlineDiv>
            <StyledForm onSubmit={handleSubmit}>
                <FormLabel sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    Start tijd: 
                    <TextField
                        name='startDateTime'
                        onChange={handleChange}
                        required
                        sx={{ width: 250, ml: 1 }}
                        type='datetime-local'
                        value={inputs.startDateTime}
                        variant='outlined'
                    />
                </FormLabel>
                <FormLabel sx={{ mb: 2, display: 'flex', alignItems: 'center',  justifyContent: 'space-between'}}>
                    Eind tijd:
                    <TextField
                        name='endDateTime'
                        onChange={handleChange}
                        required
                        sx={{ width: 250, ml: 1 }}
                        type='datetime-local'
                        value={inputs.endDateTime}
                        variant='outlined'
                    />
                </FormLabel>
                <FormLabel sx={{ mb: 2, display: 'flex', alignItems: 'center',  justifyContent: 'space-between'}}>
                    Voorstelling:
                    <Select
                        name='voorstelling'
                        onChange={handleChange}
                        sx={{ width: 250, ml: 1 }}
                        value={inputs.voorstelling}
                    >
                        <MenuItem value={''}><em>Geen</em></MenuItem>
                        {voorstellingen.map((voorstelling, index) => 
                            <MenuItem key={index} value={voorstelling.id}>{voorstelling.titel}</MenuItem>
                        )}
                    </Select>
                </FormLabel>
                <FormLabel sx={{ mb: 2, display: 'flex', alignItems: 'center',  justifyContent: 'space-between'}}>
                    Zaal:
                    <Select
                        name='zaalType'
                        onChange={handleChange}
                        sx={{ width: 250, ml: 1 }}
                        value={inputs.zaalType}
                    >
                        <MenuItem value={''}><em>Geen</em></MenuItem>
                        {zaaltypes.map((zaalType, index) => 
                            <MenuItem key={index} value={zaalType}>{zaalType}</MenuItem>
                        )}
                    </Select>
                </FormLabel>
                <Button variant='contained' type='submit' disabled={isLoading} sx={{ p: 2 }}>Voeg toe</Button> 
            </StyledForm>
        </StyledFormDiv>
    )
}