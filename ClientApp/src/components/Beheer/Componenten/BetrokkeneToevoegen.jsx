import { Button, FormLabel, IconButton, MenuItem, Select, styled, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import betrokkeneService from '../../Services/betrokkeneService';

const persoonTypes = [
    'Groep',
    'Persoon'
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

export default function BetrokkeneToevoegen() {
    const [isLoading, setIsLoading] = useState(false);

    const initialState = { typePersoon: '', naam: '', omschrijving: '', afbeelding: '', geboortedatum: new Date().toISOString().slice(0, 10) }

    const [inputs, setInputs] = useState(initialState);

    const navigate = useNavigate();

    function handleChange(event) {
        setInputs(values => ({...values, [event.target.name]: event.target.value}))
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            await betrokkeneService.add(inputs.typePersoon, inputs.naam, inputs.omschrijving, inputs.afbeelding, inputs.geboortedatum)
            navigate('/beheer')
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
                <Typography variant='h3'>Betrokkene toevoegen</Typography>
            </InlineDiv>
            <StyledForm onSubmit={handleSubmit}>
                <FormLabel sx={{ mb: 2, display: 'flex', alignItems: 'center',  justifyContent: 'space-between'}}>
                    Type:
                    <Select
                        name='typePersoon'
                        onChange={handleChange}
                        required
                        sx={{ width: 250, ml: 1 }}
                        value={inputs.typePersoon}
                    >
                        <MenuItem value={''}><em>Geen</em></MenuItem>
                        {persoonTypes.map((type, index) => 
                            <MenuItem key={index} value={type}>{type}</MenuItem>
                        )}
                    </Select>
                </FormLabel>
                <FormLabel sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    Naam: 
                    <TextField
                        name='naam'
                        onChange={handleChange}
                        required
                        sx={{ width: 250, ml: 1 }}
                        type='text'
                        value={inputs.naam}
                        variant='outlined'
                    />
                </FormLabel>
                <FormLabel sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    Omschrijving: 
                    <TextField
                        multiline
                        name='omschrijving'
                        onChange={handleChange}
                        required
                        rows={3}
                        sx={{ width: 250, ml: 1 }}
                        type='text'
                        value={inputs.omschrijving}
                        variant='outlined'
                    />
                </FormLabel>
                <FormLabel sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    Afbeelding url: 
                    <TextField
                        name='afbeelding'
                        onChange={handleChange}
                        sx={{ width: 250, ml: 1 }}
                        type='text'
                        value={inputs.afbeelding}
                        variant='outlined'
                    />
                </FormLabel>
                <FormLabel sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    Geboortedatum: 
                    <TextField
                        defaultValue={inputs.geboortedatum}
                        name='geboorteDatum'
                        onChange={handleChange}
                        required
                        sx={{ width: 250, ml: 1 }}
                        type='date'
                        variant='outlined'
                    />
                </FormLabel>
                <Button variant='contained' type='submit' disabled={isLoading} sx={{ p: 2 }}>Voeg toe</Button> 
            </StyledForm>
        </StyledFormDiv>
    )
}