import { authHeader, config, handleError, handleResponse } from '../Helpers';

const AccountService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    getData
};
export default AccountService;

async function login(username, password) {
    const body = { UserName: username, PasswordHash: password};
    const response = await fetch(config.apiUrl + 'api/Account/authenticate', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    if (response.ok) {  
        var user = await response.json()
        if ("accessToken" in user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }
};


function register(voornaam,achternaam,username,password,confirmPassword,telefoonnummer) {
    const body = { Voornaam:voornaam, Achternaam: achternaam, UserName: username, PasswordHash: password, ConfirmPassword: confirmPassword, Telefoonnummer: telefoonnummer};
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

function getData(voornaam, achternaam, username, telefoonnummer) {
    const body = { Voornaam:voornaam, Achternaam: achternaam, UserName: username, Telefoonnummer: telefoonnummer};
    return fetch('Api/account/getmyjnfo', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(handleResponse, handleError);
}