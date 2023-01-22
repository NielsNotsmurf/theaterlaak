import { authHeader, config, handleError, handleResponse } from '../Helpers';

const voorstellingService = {
    add,
    getAll,
    getById,
    update,
    delete: _delete
};
export default voorstellingService;

async function add(Titel, omschrijving, afbeelding, BetrokkeneId) {
    const body = { Titel: Titel, Omschrijving: omschrijving, Afbeelding: afbeelding, BetrokkeneId: BetrokkeneId};
    console.log(body);
    let response = await fetch(config.apiUrl + 'api/voorstelling/', {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body),
    }).then(handleResponse, handleError);
    if (!response.ok) {
        throw new Error(`http error! status: ${response.status}`)
    } 
    return await response.json();
}

async function getAll() {
    const response = await fetch(config.apiUrl + 'api/voorstelling/', {
        method: 'GET',
        headers:authHeader()
    });
    if (!response.ok) {
            throw new Error(`http error! status: ${response.status}`)
    }    

    return await response.json();
}

async function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await fetch(config.apiUrl + 'api/voorstelling/' + id, requestOptions).then(handleResponse, handleError);
}

async function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return await fetch(config.apiUrl + 'api/voorstelling/' + user.id, requestOptions).then(handleResponse, handleError);
}

async function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
};

    return await fetch(config.apiUrl + 'api/voorstelling/' + id, requestOptions).then(handleResponse, handleError);
}