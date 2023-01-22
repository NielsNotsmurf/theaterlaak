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

async function AddReservering(UserId, MomentId, GereserveerdeStoelenId) {
    const body = { UserId: UserId, MomentId: MomentId, GereserveerdeStoelenId:GereserveerdeStoelenId};
    
    var response = await fetch('https://localhost:7242/api/reservering', {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body),
    });
    if(await response != null){
        return response;
    }

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

async function getReserveringenByUserId(userId) {
    const response = await fetch(config.apiUrl + `api/reservering/getreserveringenbyuserid/${userId}`, {
        method: 'GET',
        headers: authHeader()
    });
    return await response.json();
}



function DeleteReservering(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(config.apiUrl + 'api/Reservering/' + id, requestOptions).then(handleResponse, handleError);
}

async function getKaartHoudersShow(momentId, userId) {
    const response = await fetch(config.apiUrl + `api/reservering/GetKaartjesHoudersOverzicht/${momentId}/${userId}`, {
        method: 'GET',
        headers: authHeader()
    });
    return await response.json();
}