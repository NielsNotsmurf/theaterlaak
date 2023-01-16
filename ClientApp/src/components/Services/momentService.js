import { authHeader, config, handleError, handleResponse } from '../Helpers';

const momentService = {
    add,
    getAll,
    getById,
    update,
    delete: _delete
};
export default momentService;

async function add(UserId, MomentId, GereserveerdeStoelenId) {
    const body = { UserId: UserId, MomentId: MomentId, GereserveerdeStoelenId:GereserveerdeStoelenId};
    return await fetch('https://localhost:7242/api/moment', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(handleResponse, handleError);
}

async function getAll() {
    const response = await fetch('https://localhost:7242/api/moment/', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        }
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

    return await fetch(config.apiUrl + 'api/moment/' + id, requestOptions).then(handleResponse, handleError);
}

async function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return await fetch(config.apiUrl + 'api/moment/' + user.id, requestOptions).then(handleResponse, handleError);
}

async function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
};

    return await fetch(config.apiUrl + 'api/moment/' + id, requestOptions).then(handleResponse, handleError);
}