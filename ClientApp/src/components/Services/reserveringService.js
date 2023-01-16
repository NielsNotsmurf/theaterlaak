import { authHeader, config, handleError, handleResponse } from '../Helpers';

const reserveringService = {
    add,
    getAll,
    getById,
    update,
    delete: _delete
};
export default reserveringService;

function add(UserId, MomentId, GereserveerdeStoelenId) {
    const body = { UserId: UserId, MomentId: MomentId, GereserveerdeStoelenId:GereserveerdeStoelenId};
    return fetch('https://localhost:7242/api/reservering', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(handleResponse, handleError);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + 'api/Reservering/', requestOptions).then(handleResponse, handleError);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + 'api/Reservering/' + id, requestOptions).then(handleResponse, handleError);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(config.apiUrl + 'api/Reservering/' + user.id, requestOptions).then(handleResponse, handleError);
}

// functienaam met lage streep omdat delete een gereserveerd woord is in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + 'api/Reservering/' + id, requestOptions).then(handleResponse, handleError);
}