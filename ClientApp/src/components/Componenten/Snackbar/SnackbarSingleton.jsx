import { PureComponent } from 'react';
import SnackbarManager from './SnackbarManager';
import {
    ThumbUp as ThumbUpIcon,
    Info as InfoIcon,
    Warning as WarningIcon,
    Error as ErrorIcon
} from '@mui/icons-material';
import { Alert, Snackbar } from '@mui/material';


export default class SnackbarSingleton extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            activeSnackbar: undefined,
        };

        SnackbarManager.setSnackbarInstance(this);
    }

    closeSnackbar = (_event, reason) => {
        if (reason !== 'clickaway') {
            this.setState({ open: false });
            setTimeout(this.requestNewSnackbar.bind(this), 300);
        }
    };

    requestNewSnackbar() {
        const newSnackbarData = SnackbarManager.getNextSnackbarData();
        if (newSnackbarData) {
            this.placeNewSnackbar(newSnackbarData);
        }
    }

    placeNewSnackbar(snackbarData) {
        if (this.state.open) {
            return false;
        }

        this.setState({ open: true, activeSnackbar: snackbarData });
        return true;
    }

    renderIcon() {
        const { activeSnackbar } = this.state;

        switch (activeSnackbar?.severity) {
            case 'success':
                return <ThumbUpIcon />;
            case 'warning':
                return <WarningIcon />;
            case 'error':
                return <ErrorIcon />;
            case 'info':
                return <InfoIcon />;
            default:
                return null;
        }
    }

    render() {
        const { activeSnackbar } = this.state;

        if (!activeSnackbar) {
            return null;
        }

        return (
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                autoHideDuration={5000}
                open={this.state.open}
                onClose={this.closeSnackbar}
            >
                <Alert
                    sx={{
                        color: '#111',
                        fontWeight: 'unset',
                        fontSize: 14,
                        alignItems: 'center',
                        minWidth: 288,
                    }}
                    icon={this.renderIcon()}
                    severity={activeSnackbar.severity}
                    onClose={this.closeSnackbar}
                >
                    {activeSnackbar.error?.status && activeSnackbar.error?.status >= 400 ?
                        'Error ' + activeSnackbar.error.status + ': ' + activeSnackbar.error.message
                        : (activeSnackbar.message ?? 'Er is iets fout gegaan!')
                    }
                </Alert>
            </Snackbar>
        );
    }
}