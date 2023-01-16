import { authHeader, config, handleError, handleResponse } from '../Helpers';

const AccountService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};
export default AccountService;

function login(username, password) {
    const body = { UserName: username, PasswordHash: password};
    return fetch('https://localhost:7242/api/account/authenticate', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(response => {
        // login successful if there's a jwt token in the response
        if ("accesToken" in response) {
            // store response details and jwt token in local storage to keep response logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(response));
        }
        return response;
    });
}

function register(username, password) {
    const body = { UserName: username, PasswordHash: password};
    return fetch('https://localhost:7242/api/account/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(handleResponse, handleError);
}

function logout() {
    // remove user van local storage om user uit te loggen
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + 'api/Account/', requestOptions).then(handleResponse, handleError);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + 'api/Account/' + id, requestOptions).then(handleResponse, handleError);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(config.apiUrl + 'api/Account/' + user.id, requestOptions).then(handleResponse, handleError);
}

// functienaam met lage streep omdat delete een gereserveerd woord is in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + 'api/Account/' + id, requestOptions).then(handleResponse, handleError);
}