import { styled, Typography } from '@mui/material';

const StyledDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '0.5px solid grey',
    padding: theme.spacing(2),
    width: '100%',
    boxShadow: '2px 2px 2px grey',
    borderRadius: theme.shape.borderRadius,
    transition: 'all .3s ease-in-out',
    
    '&:hover': {
        transform: 'scale(1.1)',
        cursor: 'pointer'
    }
}));

export default function GoedDoelComponent(props) {
    const { doel } = props;
    const { naam, url, beschrijving} = doel;

    return (
        <StyledDiv>
            <div>
                <Typography variant='h3' sx={{ mb: 2}}>{naam}</Typography>
                <Typography variant='body1'>{beschrijving}</Typography>
            </div>

            <a href={url} target='_blank' rel="noreferrer"><Typography variant='subtitle2' sx={{ mt: 2}}>{url}</Typography></a>
        </StyledDiv>
    )
}