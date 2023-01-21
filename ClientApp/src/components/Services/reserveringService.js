import { authHeader, config, handleError, handleResponse } from '../Helpers';

const reserveringService = {
    AddReservering,
    GetReserveringen,
    GetReservering,
    UpdateReservering,
    getReserveringenByUserId,
    getKaartHoudersShow,
    DeleteReservering
};
export default reserveringService;

function AddReservering(UserId, MomentId, GereserveerdeStoelenId) {
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

function GetReserveringen() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + 'api/Reservering/', requestOptions).then(handleResponse, handleError);
}

function GetReservering(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + 'api/Reservering/' + id, requestOptions).then(handleResponse, handleError);
}

function UpdateReservering(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(config.apiUrl + 'api/Reservering/' + user.id, requestOptions).then(handleResponse, handleError);
}

function getReserveringenByUserId(userId) {
    return fetch(config.apiUrl + `api/Account/reservering/getreserveringenbyuserid/${userId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).json();
}



function DeleteReservering(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(config.apiUrl + 'api/Reservering/' + id, requestOptions).then(handleResponse, handleError);
}

function getKaartHoudersShow(momentId, userId) {
    return fetch(config.apiUrl + `api/Account/reservering/GetKaartjesHoudersOverzicht/${momentId}/${userId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).json();
}