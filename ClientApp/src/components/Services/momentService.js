import { authHeader, config, handleError, handleResponse } from '../Helpers';

const momentService = {
    AddMoment,
    GetMomenten,
    GetMomentById,
    DeleteMoment
};
export default momentService;

function AddMoment(startDateTime, endDateTime, voorstellingId, zaalType) {
    const body = { startDateTime, endDateTime, voorstellingId, zaalType };
    return fetch('https://localhost:7242/api/reservering', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(handleResponse, handleError);
}

async function GetMomenten() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await fetch(config.apiUrl + 'api/moment/', requestOptions).then(handleResponse, handleError);
}

async function DeleteMoment(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(config.apiUrl + 'api/moment/' + id, requestOptions).then(handleResponse, handleError);
}

async function GetMomentById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await fetch(config.apiUrl + 'api/moment/' + id, requestOptions).then(handleResponse, handleError);
}