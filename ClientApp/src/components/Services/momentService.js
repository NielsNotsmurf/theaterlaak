import { authHeader, config, handleError, handleResponse } from '../Helpers';

const momentService = {
    AddMoment,
    GetMomenten,
    GetPeriodeMomenten,
    GetMomentById,
    DeleteMoment,
    
};

export default momentService;

function AddMoment(startDateTime, endDateTime, voorstellingId, zaalType) {
    const body = { startDateTime, endDateTime, voorstellingId, zaalType };
    return fetch('https://localhost:7242/api/moment', {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body),
    }).then(handleResponse, handleError);
}

async function GetMomenten() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return await fetch(config.apiUrl + 'api/moment/', requestOptions).then(handleResponse, handleError);
}

async function GetPeriodeMomenten() {
    const response = await fetch(config.apiUrl + 'api/moment/', {
        method: 'GET',
        headers: authHeader(),
    });
    if (!response.ok) {
            throw new Error(`http error! status: ${response.status}`)
    }    

    return await response.json();
}

async function DeleteMoment(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(config.apiUrl + 'api/moment/' + id, requestOptions).then(handleResponse, handleError);
}

async function GetMomentById(id) {
    const response = await fetch(config.apiUrl + `api/moment/${id}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
            throw new Error(`http error! status: ${response.status}`)
    }    

    return response.json();
}