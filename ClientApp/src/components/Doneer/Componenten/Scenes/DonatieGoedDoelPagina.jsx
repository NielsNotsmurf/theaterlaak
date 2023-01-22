import { Button, FormLabel, IconButton, styled, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import donatieService from '../../../Services/donatieService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MainContext } from '../../../MainContext';
import SnackbarManager from '../../../Componenten/Snackbar/SnackbarManager';

const StyledDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

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

export default function DonatieGoedDoelPagina(props) {
    const { goedDoelId } = props;

    const { user } = useContext(MainContext);

    const [doel, setDoel] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
        fetchGoedDoel();
    }, [])

    async function fetchGoedDoel() {
        setIsSaving(true);

        try {
            const gevondenDoel = await donatieService.getGoedDoelById(user.jwtDonatieToken, goedDoelId);
            console.log(gevondenDoel);
            setDoel(gevondenDoel);
        } catch (error) {
            console.log(error);
        } finally {
            setIsSaving(false);
        }
    }

    async function handleSubmit(event) {
        setIsSaving(true);

        try {
            const bedrag = event.target[0].value;
            const tekst = event.target[2].value;
            await donatieService.postDonatie(user.jwtDonatieToken, goedDoelId, bedrag, tekst);
            navigate('/doneren')
        } catch (error) {
            console.log(error);
            SnackbarManager.showError(error);
        } finally {
            setIsSaving(false);
        }
    }

    if (isSaving) {
        return (<>Aan het laden...</>);
    }

    if (!doel) {
        return (<> gefaald</>);
    }

    return (
        <StyledDiv>
            <div>
                <IconButton onClick={() => navigate('/doneren')}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant='h2' sx={{ mb: 2}}>{doel.naam}</Typography>
            </div>
            <Typography variant='body1'>{doel.beschrijving}</Typography>

            <StyledFormDiv>
                <Typography variant='h3' sx={{ mb: 2}}>Doneren aan {doel.naam}</Typography>
                <StyledForm onSubmit={handleSubmit}>
                    <FormLabel sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        Hoeveelheid:
                        <TextField sx={{ ml: 1}} variant='outlined' type='number' name='hoeveelheid' required />
                    </FormLabel>
                    <FormLabel sx={{ mb: 2, display: 'flex', alignItems: 'center',  justifyContent: 'space-between'}}>
                        Tekst:
                        <TextField sx={{ ml: 1}} variant='outlined' type='text' name='tekst' required />
                    </FormLabel>
                    <Button variant='contained' type='submit' disabled={isSaving} sx={{ p: 2}}>Doneren</Button>
                </StyledForm>
            </StyledFormDiv>
        </StyledDiv>
    )
}