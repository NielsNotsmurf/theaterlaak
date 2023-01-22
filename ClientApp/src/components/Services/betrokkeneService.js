import { authHeader, config, handleError, handleResponse } from '../Helpers';

const betrokkeneService = {
    add,
    getAll,
    getById,
    update,
    delete: _delete
};
export default betrokkeneService;

async function add(TypePersoon, Naam, Omschrijving, Afbeelding, GeboorteDatum) {
    const body = { TypePersoon: TypePersoon, Naam: Naam, Omschrijving: Omschrijving, Afbeelding:Afbeelding, GeboorteDatum:GeboorteDatum};
    const response = await fetch(config.apiUrl + 'api/betrokkene/', {
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
    const response = await fetch(config.apiUrl + 'api/betrokkene/', {
        method: 'GET',
        headers: authHeader(),
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

    return await fetch(config.apiUrl + 'api/betrokkene/' + id, requestOptions).then(handleResponse, handleError);
}

async function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return await fetch(config.apiUrl + 'api/betrokkene/' + user.id, requestOptions).then(handleResponse, handleError);
}

async function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
};

    return await fetch(config.apiUrl + 'api/betrokkene/' + id, requestOptions).then(handleResponse, handleError);
}