

export default class SnackbarManager {
    static snackbarInstance;
    static snackbars = [];

    static setSnackbarInstance(defaultSnackbar) {
        SnackbarManager.snackbarInstance = defaultSnackbar;
    }

    static show(message) {
        this.placeNewSnackbar({ message, severity: 'success' });
    }

    static showError(error) {
        if (typeof error === 'string') {
            this.placeNewSnackbar({ message: error, severity: 'error' });
            return;
        }

        if ('message' in error) {
            this.placeNewSnackbar({ error: error, severity: 'error' });
        }
    }

    static showWarning(message) {
        this.placeNewSnackbar({ message, severity: 'warning'});
    }

    static showInfo(message) {
        this.placeNewSnackbar({ message, severity: 'info'});
    }

    static getNextSnackbarData() {
        return SnackbarManager.snackbars.shift();
    }

    static placeNewSnackbar(snackbarData) {
        if (!this.snackbarInstance) {
            throw new Error('Error: No "SnackbarSingleton" could be found. Place the "SnackbarSingleton" component in the "render()" of the root component');
        }

        SnackbarManager.snackbarInstance.closeSnackbar();
        const placed = SnackbarManager.snackbarInstance.placeNewSnackbar(snackbarData);

        if (!placed) {
            this.snackbars.push(snackbarData);
        }
    }

    static hideAllSnackbars() {
        SnackbarManager.snackbarInstance.closeSnackbar();
        this.snackbars = [];
    }
}